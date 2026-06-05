MongoDB - MongoDB is a NoSQL database that stores data in a flexible, JSON-like format called BSON. It is designed to handle large volumes of data and provides high performance, scalability, and flexibility. MongoDB is widely used in modern web applications and is known for its ease of use and powerful querying capabilities. It supports features like indexing, replication, and sharding, making it suitable for a wide range of applications.

Mongoose - Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a higher-level abstraction over the MongoDB native driver, allowing developers to define schemas, models, and perform CRUD operations more easily. Mongoose also includes features like validation, middleware, and population, making it a popular choice for working with MongoDB in Node.js applications.

In simple words, MongoDB is the database where you store your data, while Mongoose is a tool that helps you interact with that database in a more structured and efficient way. Mongoose allows you to define the structure of your data and provides methods to perform operations on the database without having to write complex queries directly against MongoDB.

---

Install mongoose

```bash
npm install mongoose
```

in db/index.js

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
