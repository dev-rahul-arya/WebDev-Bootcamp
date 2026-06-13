## setting up project middleware

### in `src/middleware/auth.middleware.js`

```javascript
import { ProjectMember } from "../models/projectmember.models.js";

export const validateProjectPermission = (roles = []) => {
    AsyncHandler(async (req, res, next) => {
        const { projectId } = req.params;

        if (!projectId) {
            throw new ApiError(400, "Project ID is required");
        }

        const project = await ProjectMember.findOne({
            project: new mongoose.Types.ObjectId(projectId),
            user: new mongoose.Types.ObjectId(req.user._id),
        });

        if (!project) {
            throw new ApiError(400, "Project not found");
        }

        const givenRole = project?.role;
        req.user.role = givenRole;

        if (!roles.includes(givenRole)) {
            throw new ApiError(403, "You do not have permission to perform this action");
        }

        next();
    });
}
```

## in `src/validators/index.js`

```javascript
import { AvailableUserRole } from "../constants/index.js";

const create ProjectValidator = () => {
    return [
        body("name").notEmpty().withMessage("Project name is required"),
        body("description").optional(),
    ]
}

const addMemberToProjectValidator = () => {
    return [
        body("email").isEmail().withMessage("Valid email is required").notEmpty().withMessage("Email is required"),
        body("role").notEmpty().withMessage("Role is required").isIn(AvailableUserRole).withMessage(`Role must be one of ${AvailableUserRole.join(", ")}`),
    ]
}

export { createProjectValidator, addMemberToProjectValidator };
```
## in `src/routes/project.routes.js`

```javascript
import { Router } from "express";
import {
    getProjects,
    getProjectById,
    addMembersToProject,
    getProjectMembers,
    updateMemberRole,
    deleteMemberRole,
    createProject,
    updateProject,
    deleteProject,
} from "../controllers/auth.controller.js";
import { validate } from "../middleware/validateRequest.middleware.js";
import { addMemberToProjectValidator, createProjectValidator } from "../validators/auth.validators.js";
import { verifyJWT, validateProjectPermission } from "../middleware/auth.middleware.js";

const router = Router();
router.use(verifyJWT); // All routes below this middleware will require authentication

router
    .route("/")
    .get(getProjects)
    .post(createProjectValidator(), validate, createProject);

router
    .route("/:projectId")
    .get(validateProjectPermission(AvailableUserRole), getProjectById)
    .put(
        validateProjectPermission([UserRolesEnum.ADMIN]),
        createProjectValidator(),
        validate,
        updateProject
    )
    .delete(
        validateProjectPermission([UserRolesEnum.ADMIN]),
        deleteProject
    );

router
    .route("/:projectId/members/")
    .get(validateProjectPermission(AvailableUserRole), getProjectMembers)
    .post(
        validateProjectPermission([UserRolesEnum.ADMIN]),
        addMemberToProjectValidator(),
        validate,
        addMembersToProject
    );

router
    .route("/:projectId/members/:userId")
    .put(
        validateProjectPermission([UserRolesEnum.ADMIN]),
        addMemberToProjectValidator(),
        validate,
        updateMemberRole
    )
    .delete(
        validateProjectPermission([UserRolesEnum.ADMIN]),
        deleteMemberRole
    );

export default router;
```

## in `app.js`

```javascript
import projectRoutes from "./routes/project.routes.js";

app.use("/api/v1/projects", projectRoutes);
```

## in `src/middleware/multer.middleware.js`

```bash
npm install multer
```

Multer is a middleware for handling `multipart/form-data`, which is primarily used for uploading files. It makes it easy to handle file uploads in Node.js applications, particularly when using Express.js. Here are some reasons why you might want to use Multer:

1. **File Upload Handling**: Multer simplifies the process of handling file uploads, allowing you to easily access uploaded files in your request handlers.
2. **Storage Options**: Multer provides various storage options, including memory storage and disk storage, allowing you to choose how and where to store uploaded files.
3. **File Filtering**: Multer allows you to filter uploaded files based on their MIME type or other criteria, helping you ensure that only valid files are accepted.
4. **Multiple File Uploads**: Multer supports handling multiple file uploads in a single request, making it convenient for applications that require users to upload multiple files at once.
5. **Integration with Express**: Multer integrates seamlessly with Express.js, making it easy to add file upload functionality to your existing routes and middleware.

> upload file with Multer in backend

```javascript
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images"); // Specify the destination folder for uploaded files
    }
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname); // Specify the filename for uploaded files
    }
});

export const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // Limit file size to 5MB
    }
});
```