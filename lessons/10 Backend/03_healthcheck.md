### HealthCheck

In the context of a web application, a health check is a simple endpoint that allows you to verify that your application is running and responsive. It is often used by monitoring tools or load balancers to ensure that the application is healthy and can handle incoming requests.

in controllers/healthCheck.controller.js

```javascript
import {apiResponse} from "../utils/apiResponse.js";

const healthCheck = (req, res, next) => {
    try {
        res.status(200).json(new ApiResponse(200, {message: "OK"}));
    } catch (error) {
        next(error);
    }
}

export { healthCheck };
```

in routes/healthCheck.route.js

```javascript
import express from "express";
import { healthCheck } from "../controllers/healthCheck.controller.js";

const router = express.Router();

router.get("/health", healthCheck);

export default router;
```

in index.js

```javascript
import healthCheckRoute from "./routes/healthCheck.route.js";

app.use("/api/v1", healthCheckRoute);
```

Now, when you start your server and navigate to `http://localhost:PORT/api/v1/health`, you should see a JSON response indicating that the application is healthy:

```json
{
    "status": 200,
    "data": {
        "message": "OK"
    }
}
```

This health check endpoint can be used by monitoring tools to regularly check the status of your application and ensure that it is running smoothly. If the endpoint returns a status code other than 200, it indicates that there may be an issue with the application that needs to be addressed.

#### Better Approach

in utils/asyncHandler.js

```javascript
const asyncHandler = (fn) => (req, res, next) => {
    Promise
        .resolve(fn(req, res, next))
        .catch(next);
};

export default asyncHandler;
```

in controllers/healthCheck.controller.js

```javascript
import {apiResponse} from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const healthCheck = asyncHandler(async (req, res, next) => {
    res.status(200).json(new ApiResponse(200, {message: "OK"}));
});

export { healthCheck };
```

By using the `asyncHandler` utility, we can simplify our controller functions and avoid the need for try-catch blocks to handle errors. The `asyncHandler` function takes care of catching any errors that occur within the asynchronous function and passing them to the next middleware, which can be an error handling middleware. This leads to cleaner and more maintainable code.

