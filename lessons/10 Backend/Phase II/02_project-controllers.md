## setting up project controllers

### in `src/controllers/project.controllers.js`

```javascript
import { User } from "../models/user.models.js";
import { Project } from "../models/project.models.js":
import { ProjectMember } from "../models/projectmember.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { AsyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

//This is an aggregation pipleine (further discussed in `Phase III` of the backend course)
const getProjects = AsyncHandler(async (req, res) => {
    const project = await ProjectMember.aggregate([
        {
            $match: {
                user: new mongoose.Types.ObjectId(req.user._id);
            }
        },
        {
            $lookup: {
                from: "projectss",
                localField: "projects",
                foreignField: "_id",
                as: "projects",
                pipeline: [
                    {
                        $lookup: {
                            from: projectMembers,
                            localField: "_id",
                            foreignField: "project",
                            as: "projectmembers",
                        },
                    },
                    {
                        $addFields: {
                            members: {
                                $size: "$projectmembers",
                            },
                        },
                    },
                ],
            },
        },
        {
            $unwind: "$projects",  //because it's an array
        },
        {
            $project: {
                project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    members: 1,
                    createdAt: 1,
                    createdBy: 1,
                },
                role: 1,
                _id: 0,
            }
        }
    ]);

    return res.status(200).json(new ApiResponse(200, project, "Project fetched successfully"));
});

const getProjectById = AsyncHandler(async (req, res) => {
    const {id} = req.params;
    const project = await Project.findById(id);

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    return res.status(200).json(new ApiResponse(200, project, "Project fetched successfully"));
});

const addMembersToProject = AsyncHandler(async (req, res) => {
    const {email, role} = req.body;
    const {projectId} = req.params;

    const user = await User.findOne({email});
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    await ProjectMember.findByIdAndUpdate(
        {
            project: new mongoose.Types.ObjectId(projectId),
            user: new mongoose.Types.ObjectId(user._id),
        },
        {
            project: new mongoose.Types.ObjectId(projectId),
            user: new mongoose.Types.ObjectId(user._id),
            role,
        },
        {
            new: true,
            upsert: true,  //create a new document if it doesn't exist 
        }
    );

    return res.status(200).json(new ApiResponse(200, {}, "Member added to project successfully"));
});

const getProjectMembers = AsyncHandler(async (req, res) => {
    const {projectId} = req.params;
    const project = await Project.findById(req.params);

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    const projectMembers = await ProjectMember.aggregate([
        {
            $match: {
                project: new mongoose.Types.ObjectId(projectId),
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            username: 1,
                            fullName: 1,
                            avatar: 1,
                        },
                    },
                    {
                        $addFields: {
                            user: {
                                $arrayElemAt: ["$user", 0]
                            },
                        },
                    },
                    {
                        $project: {
                            project: 1,
                            user: 1,
                            role: 1,
                            createdAt: 1,
                            updatedAt: 1,
                            _id: 0,
                        },
                    },
                ],
            },
        },
    ]);

    return res.status(200).json(new ApiResponse(200, projectMembers, "Project members fetched successfully"));
};

const updateMemberRole = AsyncHandler(async (req, res) => {
    const {projectId, userId} = req.params;
    const {newRole} = req.body;

    if(!AvailableUserRole.includes(newRole)) {
        throw new ApiError(400, "Invalid role");
    }

    let projectMember = await ProjectMember.findOne({
        project: new mongoose.Types.ObjectId(projectId),
        user: new mongoose.Types.ObjectId(userId),
    });

    if (!projectMember) {
        throw new ApiError(404, "Project member not found");
    }

    projectMember = await ProjectMember.findByIdAndUpdate(
        projectMember._id,
        {
            role: newRole,
        },
        {
            new: true,
        }
    );

    if (!projectMember) {
        throw new ApiError(404, "Project member not found");
    }

    return res.status(200).json(new ApiResponse(200, projectMember, "Project member role updated successfully"));
});

const deleteMemberRole = AsyncHandler(async (req, res) => {
    const {projectId, userId} = req.params;

    let projectMember = await ProjectMember.findOne({
        project: new mongoose.Types.ObjectId(projectId),
        user: new mongoose.Types.ObjectId(userId),
    });

    if (!projectMember) {
        throw new ApiError(404, "Project member not found");
    }

    projectMember = await ProjectMember.findByIdAndDelete(projectMember._id);

    if (!projectMember) {
        throw new ApiError(404, "Project member not found");
    }

    return res.status(200).json(new ApiResponse(200, projectMember, "Project member deleted successfully"));
});

const createProject = AsyncHandler(async (req, res) => {
    const {name, description} = req.body;
    const user = new mongoose.Types.ObjectID(req.user._id);

    const project = await Project.create({
        name,
        description,
        createdBy: user
    });

    await ProjectMember.create({
        project: new mongoose.Types.ObjectID(project._id),
        user: user,
        role: UserRolesEnum.ADMIN
    });

    res.status(201).json(new ApiResponse(true, project, "Project created successfully"));
});

const updateProject = AsyncHandler(async (req, res) => {
    const {id} = req.params;
    const {name, description} = req.body;

    const project = await Project.findByIdAndUpdate(
        id,
        {
            name,
            description
        },
        {
            new: true,
        }
    );

    if (!project) {
        throw new ApiError(404, "Project not found");
    }
    return res.status(200).json(new ApiResponse(true, project, "Project updated successfully"));
});

const deleteProject = AsyncHandler(async (req, res) => {
    const {id} = req.params;

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    return res.status(200).json(new ApiResponse(true, null, "Project deleted successfully"));
});

export {
    getProjects,
    getProjectById,
    addMembersToProject,
    getProjectMembers,
    updateMemberRole,
    deleteMemberRole,
    createProject,
    updateProject,
    deleteProject,
};
```

### in `src/controllers/task.controller.js`

```javascript
import { User } from "../models/user.models.js";
import { Project } from "../models/project.models.js":
import { Task } from "../models/task.models.js";
import { subtask } from "../models/subtask.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { AsyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

const getTasks = AsyncHandler(async (req, res) => {
    const {projectId} = req.params;

    const project = await Project.findById(projectId);
    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    const task = await Task.find({
        project: new mongoose.Types.ObjectId(projectId),
    }).populate("assignedTo", "avatar username fullName");

    return res.status(201).json(new ApiResponse(201, tasks, "Tasks fetched successfully"));
});

const createTask = AsyncHandler(async (req, res) => {
    const {title, description, projectId} = req.body;
    const {projectId} = req.params;

    const project = await Project.findById(projectId);
    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    const files = req.file || [];
    const attachments = files.map(file) => {
        return {
            url: `${process.env.SERVER_URL}/images/${file.originalName}`,
            mimetype: file.mimetype,
            size: file.size,
        }
    };

    const task = await Task.create({
        title,
        description,
        project: new mongoose.Types.ObjectId(projectId),
        assignedTo: req.body.assignedTo ? new mongoose.Types.ObjectId(req.body.assignedTo) : undefined,
        status,
        assignedBy: new mongoose.Types.ObjectId(req.user._id),
        attachments,
    });

    res.status(201).json(new ApiResponse(201, task, "Task created successfully"));
});

const getTaskById = AsyncHandler(async (req, res) => {
    const {taskId} = req.params;

    const task = await Task.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(taskId),
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "assignedTp",
                foreignField: "_id_",
                as: "assignedTo",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            username: 1,
                            fullName: 1,
                            avatar: 1,
                        },
                    },
                ],
            }
        },
        {
            $lookup: {
                from: "subtasks",
                localField: "_id_",
                foreignField: "task",
                as: "subtasks",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "createdBy",
                            foreignField: "_id_",
                            as: "createdBy",
                            pipeline: [
                                {
                                    $project: {
                                        _id: 1,
                                        username: 1,
                                        fullName: 1,
                                        avatar: 1,
                                    },
                                },
                            ],
                        }
                    },
                    {
                        $addFields: {
                            createdBy: {
                                $arrayElemAt: ["$createdBy", 0]
                            },
                        },
                    }
                ]
            }
        },
        {
            $addFields: {
                assignedTo: {
                    $arrayElemAt: ["$assignedTo", 0]
                },
            }
        },
    ]);

    if (task.length === 0) {
        throw new ApiError(404, "Task not found");
    }

    return res.status(200).json(new ApiResponse(200, task[0], "Task fetched successfully"));
});

const updateTask = AsyncHandler(async (req, res) => {

});

const deleteTask = AsyncHandler(async (req, res) => {

});

const createSubtask = AsyncHandler(async (req, res) => {

});

const updateSubtask = AsyncHandler(async (req, res) => {

});

const deleteSubtask = AsyncHandler(async (req, res) => {

});

export {
    getTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
    createSubtask,
    updateSubtask,
    deleteSubtask,
};
```

### in `.env`

```
SERVER_URL=http://localhost:3000
```