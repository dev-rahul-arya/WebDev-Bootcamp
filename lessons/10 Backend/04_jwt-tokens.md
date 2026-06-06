#### JWT TOKENS

```bash
npm install jsonwebtoken
```

**in `.env`**

```env
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=7d

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=15m
```

**in `models/user.model.js`**

```javascript
import jwt from "jsonwebtoken";
import crypto from "crypto";

// Method to generate access token
userSchema.methods.generateAccessToken = function() {
    return jwt.sign{
        _id = this._id,
        email = this.email,
        username = this.username
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
};

// Method to generate refresh token
userSchema.methods.generateRefreshToken = function() {
    return jwt.sign{
        _id = this._id;
        email = this.email,
        username = this.username
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn = process.env.REFRESH_TOKEN_EXPIRY
    }
};

// Method to generate temporary token
userSchema.methods.generateTemporaryToken = function() {
    const unhashedToken = crypto.randomBytes(20).toString("hex");

    const hashedToken = crypto.createHash("sha256").update(unhashedToken).digest("hex");

    const expiry = Date.now() + (10 * 60 * 1000); // 10 minutes

    return { unhashedToken, hashedToken, expiry };
};
```
