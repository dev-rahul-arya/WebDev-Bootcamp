# Backend Basics Guide

## 1. Package Management & Setup

### Initialize a Project

```bash
npm init
npm init -y
```

> The `-y` flag skips prompts and creates `package.json` with default values.

### Custom NPM Scripts

Add scripts to `package.json`:

```json
"scripts": {
    "dev": "node index.js",
    "start": "node index.js"
}
```

> Now you know how `npm run dev` works. It runs the command specified in the `scripts` section of `package.json`.

### Module Systems

- **CommonJS**: Uses `require()` and `module.exports`
- **ES Modules**: Uses `import` and `export`

Specify in `package.json`:

```json
"type": "module"
```

---

## 2. Development Tools

### Code Formatting with Prettier

```bash
npm install --save-dev prettier
```

Add to `package.json`:

```json
"scripts": {
    "format": "prettier --write ."
}
```

> Now you can run `npm run format` to format your code using Prettier.

Configure `.prettierrc`:

```json
{
    "tabWidth": 2,
    "useTabs": false,
    "semi": false,
    "singleQuote": false,
    "trailingComma": "all",
    "bracketSpacing": true,
    "arrowParens": "always"
}
```

Create `.prettierignore` to exclude `node_modules`, `.env`, etc.

### Auto-Restart with Nodemon

```bash
npm install --save-dev nodemon
```

Update scripts:

```json
"scripts": {
    "dev": "nodemon index.js",
    "start": "node index.js"
}
```

Now you can run `npm run dev` to start the server with Nodemon. It will automatically restart the server whenever you make changes to the code.

- dev: for development with auto-restart
- start: for production without auto-restart

---

## 3. Environment Configuration

### Environment Variables with dotenv

```bash
npm install dotenv
```

Create `.env`:

```
PORT=3000
DB_URL=mongodb://localhost:27017/mydatabase
```

Load in `src/index.js`:

```javascript
import dotenv from 'dotenv'

dotenv.config({ path: './.env' });

const port = process.env.PORT;
const dbUrl = process.env.DB_URL;
```

---

## 4. Express Server Setup

### Install Express

```bash
npm install express
```

### Create `src/app.js`

```javascript
import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});

export { app };
```

### Create `src/index.js`

```javascript
import dotenv from 'dotenv';
import { app } from './app.js';

dotenv.config({ path: './.env' });

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
```

> These api's can also be tested using Postman or any API testing tool.

### CORS Configuration

__CORS__ - Cross-Origin Resource Sharing is a security feature implemented by browsers to restrict web applications from making requests to a different domain than the one that served the web page. It allows servers to specify who can access their resources and how they can be accessed.

Add to `.env`:

```
CORS_ORIGIN=("http://localhost:3000", "http://example.com")
```

Add to `src/app.js`:

```javascript
import cors from 'cors';

app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(express.static('public')); // Serve static files from the 'public' directory

app.use(cors({
    origin: process.env.CORS_ORIGIN.split(",") || 'http://localhost:3000', // Allowed origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    }));
    ```
}));
``` 

---

## 5. Utility Classes & Constants

### API Response (`src/utils/apiResponse.js`)

```javascript
export class APIResponse {
    constructor(statusCode, message = "Success", data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = statusCode < 400;
    }
}

export { APIResponse };
```

### API Error (`src/utils/apiError.js`)

```javascript
export class APIError extends Error {
    constructor(statusCode, message = "Something Went Wrong", errors = [], stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;
        if (stack) this.stack = stack;
        else Error.captureStackTrace(this, this.constructor);
    }
}

export { APIError };
```

### Constants (`src/utils/constants.js`)

```javascript
export const USER_ROLES = {
    ADMIN: 'admin',
    PROJECT_ADMIN: 'project_admin',
    MEMBER: 'member'
};

export const availableUserRoles = Object.values(USER_ROLES);

export const TASK_STATUS = {
    TODO: 'todo',
    IN_PROGRESS: 'in_progress',
    DONE: 'done'
};

export const availableTaskStatus = Object.values(TASK_STATUS);
```

---

## 6. Project Structure

```
backend-app/
├── public/
│   └── images/
├── src/
│   ├── controllers/
│   ├── db/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   │   ├── apiResponse.js
│   │   ├── apiError.js
│   │   └── constants.js
│   ├── validators/
│   ├── app.js
│   └── index.js
├── .env
├── .prettierrc
├── .prettierignore
├── .gitignore
├── package.json
└── README.md
```

---

## 7. Git Setup


```bash
git init
git add .
git commit -m "Initial setup: project structure and dependencies"
```