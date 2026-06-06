## MongoDB
- MongoDB is a **NoSQL database**.
- It stores data in a flexible, JSON-like format called **BSON**.
- It is designed for:
    - large volumes of data
    - high performance
    - scalability
    - flexibility
- Common features:
    - indexing
    - replication
    - sharding

## Mongoose
- Mongoose is an **Object Data Modeling (ODM)** library for **MongoDB** and **Node.js**.
- It provides a higher-level abstraction over the MongoDB native driver.
- It helps with:
    - schemas
    - models
    - CRUD operations
    - validation
    - middleware
    - population

## Simple explanation
- **MongoDB** is where you store your data.
- **Mongoose** is the tool that helps you work with that data in a more structured way.
- It lets you define the structure of your data and interact with the database without writing complex queries every time.

---

## Install Mongoose
```bash
npm install mongoose
```

## `db/index.js`
```javascript
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}

export { connectDB };
```

## `index.js`
```javascript
import connectDB from "./db/index.js";

connectDB()
    .then( () => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } )
    .catch( (err) => {
        console.error("Failed to connect to MongoDB:", err);
        process.exit(1);
    } );
```

## Install bcrypt
```bash
npm install bcrypt
```

## `models/user.model.js`
```javascript
import mongoose {Schema} from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    avatar: {
        type: String,
        default: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Picture.png"
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    fullName: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: {true, message: "Password is required"}
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String
    },
    forgotPasswordToken: {
        type: String
    },
    forgotPasswordTokenExpiry: {
        type: Date
    },
    emailVerificationToken: {
        type: String
    },
    emailVerificationTokenExpiry: {
        type: Date
    }
}, 
{
    timestamps: true
},
);

// Hash the password before saving the user
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare the provided password with the stored hashed password
userSchema.methods.comparePassword = async function(recievedPassword) {
    return await bcrypt.compare(recievedPassword, this.password);
}

export default mongoose.model("User", userSchema);

```