# AUTH

## `src/controllers/auth.controller.js`

```javascript
import { User } from '../models/user.model.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';
import { AsyncHandler } from '../utils/asyncHandler.js';
import { sendEmail, generateEmailVerificationMailgenContent } from '../utils/email.js';

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save(validateBeforeSave: false);  // beacause we know we aren't touching any other stuff, we just want to save the refresh token, so we can skip validation
    
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Error generating tokens");
    }
};

const registerUser = AsyncHandler(async (req, res) => {
    const { email, username, password, role } = req.body;

    const existingUser = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (existingUser) {
        throw new ApiError(409, "User with this email or username already exists");
    }

    const user = await User.create({
        email,
        username,
        password,
        role,
    });

    const { unhashedToken, hashedToken, tokenExpiry } = user.generateEmailVerificationToken();

    user.emailVerificationToken = hashedToken;
    user.emailVerificationTokenExpiry = tokenExpiry;

    const tokens = await generateAccessAndRefreshToken(user._id);

    await user.save({ validateBeforeSave: false });

    await sendEmail({
        email: user?.email,
        subject: "Please verify your email",
        MailgenContent: generateEmailVerificationMailgenContent(
            user.username,
            `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unhashedToken}`
        ),
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationTokenExpiry"
    );

    if (!createdUser) {
        throw new ApiError(500, "Error creating user");
    }

    res.status(201).json(
        new ApiResponse(201, "User registered successfully", { user: createdUser })
    );
});

export { registerUser };
```

## `src/routes/auth.routes.js`

```javascript
import express from 'express';
import { registerUser } from '../controllers/auth.controller.js';
import { validate } from '../middleware/validator.middleware.js';
import { userRegisterValidator } from '../validators/index.js';

const router = express.Router();

router.route("/register").post(userRegisterValidator(), validate, registerUser);

export default router;
```

## `src/app.js`

```javascript
import authRouter from './routes/auth.routes.js';

app.use("/api/v1/auth", authRouter);
```

## Install `express-validator`

```bash
npm install express-validator
```

## `src/middleware/validator.middleware.js`

```javascript
import { validationResult } from 'express-validator';
import { ApiError } from '../utils/apiError.js';

export const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = [];
    errors.array().map((err) => {
        extractedErrors.push({ [err.path]: err.msg });
    });

    throw new ApiError(422, "Validation error", extractedErrors);
};
```

## `src/validators/index.js`

```javascript
import { body } from 'express-validator';

const userRegisterValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Invalid email format"),
        body("username")
            .trim()
            .notEmpty()
            .withMessage("Username is required")
            .isLowercase()
            .withMessage("Username must be in lowercase")
            .isLength({ min: 3, max: 20 })
            .withMessage("Username must be between 3 and 20 characters long"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required"),
        body("fullName")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("Full name is required"),
    ];
};

export { userRegisterValidator };
```

## Install `cookie-parser`

```bash
npm install cookie-parser
```

## `src/app.js`

```javascript
import cookieParser from 'cookie-parser';

app.use(cookieParser());
```

## `src/controllers/auth.controller.js` — login

```javascript
const login = AsyncHandler(async (req, res) => {
    const { email, password, username } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(400, "Email not found");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Incorrect password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationTokenExpiry"
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
            .status(200)
            .cookie("refreshToken", refreshToken, options)
            .cookie("accessToken", accessToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        user: loggedInUser,
                        accessToken,
                        refreshToken
                    },
                    "User logged in successfully.",
                )
            )
        );
});
```

## `src/routes/auth.routes.js`

```javascript
router.route("/login").post(loginValidator(), validate, login);
```

## `src/validators/index.js`

```javascript
const loginValidator = () => {
    return [
        body("email")
            .optional()
            .isEmail()
            .withMessage("Invalid email format"),
        body("password")
            .notEmpty()
            .withMessage("Password is required"),
    ];
};

export { userRegisterValidator, loginValidator };
```

## `src/middleware/auth.middleware.js`

```javascript
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/apiError.js';
import { AsyncHandler } from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';

export const verifyJWT = AsyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        throw new ApiError(401, "Unauthorized");
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken -emailVerificationToken -emailVerificationTokenExpiry"
        );

        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, "Invalid Access Token");
    }
});
```

## `src/controllers/auth.controller.js` — logout

```javascript
const logoutUser = AsyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: "",
            }
        },
        {
            new: true,
        }
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
            .status(200)
            .clearCookie("refreshToken", options)
            .clearCookie("accessToken", options)
            .json(new ApiResponse(200, "User logged out successfully"));
});

export { registerUser, login, logoutUser };
```

## `src/routes/auth.routes.js`

```javascript
import { verifyJWT } from '../middleware/auth.middleware.js';

router.route("/logout").post(verifyJWT, logoutUser);
```

## Other auth features

### `src/controllers/auth.controller.js`

```javascript
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const getCurrentUser = AsyncHandler(async (req, res) => {
    return res.status(200)
            .json(
                new ApiResponse(
                    200,
                    {
                        user: req.user,
                    },
                    "Current user fetched successfully"
                )
            );
});

const verifyEmail = AsyncHandler(async (req, res) => {
    const { verificationToken } = req.params;

    if (!verificationToken) {
        throw new ApiError(400, "Verification token is required");
    }

    const hashedToken = crypto
        .createHash("sha256")
        .update(verificationToken)
        .digest("hex");

    const user = await User.findOne({
        emailVerificationToken: hashedToken,
        emailVerificationTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
        throw new ApiError(400, "Invalid or expired verification token");
    }

    user.emailVerificationToken = undefined;
    user.emailVerificationTokenExpiry = undefined;
    user.isEmailVerified = true;

    await user.save({ validateBeforeSave: false });

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                isEmailVerified: true,
            },
            "Email verified successfully"
        )
    );
});

const resendEmailVerification = AsyncHandler(async (req, res) => {
    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (user.isEmailVerified) {
        throw new ApiError(409, "Email is already verified");
    }

    const { unhashedToken, hashedToken, tokenExpiry } = user.generateEmailVerificationToken();

    user.emailVerificationToken = hashedToken;
    user.emailVerificationTokenExpiry = tokenExpiry;

    await user.save({ validateBeforeSave: false });

    await sendEmail({
        email: user?.email,
        subject: "Please verify your email",
        MailgenContent: generateEmailVerificationMailgenContent(
            user.username,
            `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unhashedToken}`
        ),
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                message: "Verification email resent successfully",
            },
            "Verification email resent successfully"
        )
    );
});

const refreshAccessToken = AsyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized");
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        if (incomingRefreshToken !== user.refreshToken) {
            throw new ApiError(401, "Refresh token is expired");
        }

        const options = {
            httpOnly: true,
            secure: true,
        };

        const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshToken(user._id);

        user.refreshToken = newRefreshToken;
        await user.save({ validateBeforeSave: false });

        return res
            .status(200)
            .cookie("refreshToken", newRefreshToken, options)
            .cookie("accessToken", accessToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        accessToken,
                        refreshToken: newRefreshToken,
                    },
                    "Access token refreshed successfully"
                )
            );
    } catch (error) {
        throw new ApiError(401, "Unauthorized");
    }
});

const forgotPasswordRequest = AsyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User with this email does not exist");
    }

    const { unhashedToken, hashedToken, tokenExpiry } = user.generatePasswordResetToken();

    user.passwordResetToken = hashedToken;
    user.passwordResetTokenExpiry = tokenExpiry;

    await user.save({ validateBeforeSave: false });

    await sendEmail({
        email: user.email,
        subject: "Password reset request",
        MailgenContent: forgotPasswordResetMailgenContent(
            user.username,
            `${process.env.FORGOT_PASSWORD_URL}/${unhashedToken}`
        ),
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                message: "Password reset email sent successfully",
            },
            "Password reset email sent successfully"
        )
    );
});

const resetForgotPassword = AsyncHandler(async (req, res) => {
    const { password } = req.body;
    const { resetToken } = req.params;

    if (!password) {
        throw new ApiError(400, "Password is required");
    }

    if (!resetToken) {
        throw new ApiError(400, "Reset token is required");
    }

    const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
        throw new ApiError(400, "Invalid or expired reset token");
    }

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiry = undefined;
    await user.save({ validateBeforeSave: false });

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                message: "Password reset successfully",
            },
            "Password reset successfully"
        )
    );
});

const changeCurrentPassword = AsyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        throw new ApiError(400, "Current password and new password are required");
    }

    const user = await User.findById(req.user._id);
    const isCurrentPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isCurrentPasswordCorrect) {
        throw new ApiError(400, "Incorrect current password");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                message: "Password changed successfully",
            },
            "Password changed successfully"
        )
    );
});

export {
    registerUser,
    login,
    logoutUser,
    getCurrentUser,
    verifyEmail,
    resendEmailVerification,
    refreshAccessToken,
    forgotPasswordRequest,
    resetForgotPassword,
    changeCurrentPassword,
};
```

## `.env`

```env
FORGOT_PASSWORD_URL=http://localhost:3000/reset-password
```

## `src/validators/index.js`

```javascript
const changePasswordValidator = () => {
    return [
        body("oldPassword")
            .notEmpty()
            .withMessage("Current password is required"),
        body("newPassword")
            .notEmpty()
            .withMessage("New password is required"),
    ];
};

const userForgotPasswordValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Invalid email format"),
    ];
};

const userResetForgotPasswordValidator = () => {
    return [
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required"),
    ];
};

export {
    userRegisterValidator,
    loginValidator,
    changePasswordValidator,
    userForgotPasswordValidator,
    userResetForgotPasswordValidator,
};
```

## `src/routes/auth.routes.js`

```javascript
// unsecured routes
router.route("/verify-email/:verificationToken").get(verifyEmail);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/forgot-password").post(userForgotPasswordValidator(), validate, forgotPasswordRequest);
router.route("/reset-password/:resetToken").post(userResetForgotPasswordValidator(), validate, resetForgotPassword);

// secure routes
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/change-password").post(verifyJWT, changePasswordValidator(), validate, changeCurrentPassword);
router.route("/resend-verification-email").post(verifyJWT, resendEmailVerification);
```
