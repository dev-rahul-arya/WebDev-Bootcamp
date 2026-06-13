### setting up models

```bash
cd src/models
touch project.models.js projectmember.models.js task.models.js subtask.models.js note.models.js
```

### in `project.models.js`, `projectmember.models.js`, `task.models.js`, `subtask.models.js` and `note.models.js`

```javascript
import mongoose, { Schema } from "mongoose";
```

### in `project.models.js`

```javascript
const projectSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        description: {
            type: String,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
    
        }
    },
    {
        timestamps: true,
    }
);

export const Project = mongoose.model("Project", projectSchema);
```

### in `projectmember.models.js`

```javascript
import { AvailableUserRoles, UserRolesEnum } from "../../utils/constants.js":

const projectMemberSchema = new Schema(
    {
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        role: {
            type: String,
            enum: AvailableUserRoles,
            default: UserRolesEnum.MEMBER,
        }
    },
    {
        timestamps: true,
    }
);

export const ProjectMember = mongoose.model("ProjectMember", projectMemberSchema);
```

### in `task.models.js`

```javascript
import { TaskStatusEnum, AvailableTaskStatus } from "../../utils/constants.js";

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: String,
        status: {
            type: String,
            enum: AvailableTaskStatus,
            default: TaskStatusEnum.TODO,
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        assignedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        assignedTo: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        attachments: 
            type: [
                {
                    filename: String,
                    url: String,
                    mimetype: String,
                    size: Number,
                }
            ],
            default: [],
    },
    {
        timestamps: true,
    }
);

export const Task = mongoose.model("Task", taskSchema):
```

### in `subtask.models.js`

```javascript
const subtaskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: String,
        task: {
            type: Schema.Types.ObjectId,
            ref: "Task",
            requires: true,
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

export const Subtask = mongoose.model("Subtask", subtaskSchema);
```


### in `note.models.js`

```javascript
const projectNoteSchema = new Schema(
    {
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export const Note = mongoose.model("ProjectNote", projectNoteSchema);
```