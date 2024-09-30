# User and Address Management Backend

This repository contains a Node.js backend application for managing users and their addresses. Users can register, log in, and manage their addresses securely. The application includes user authentication, input validation, error handling, and secure storage of sensitive information.

# Deployed Link 

URL : https://smoke-tress-user-address-management.onrender.com
## Features

- User Registration and Authentication: Users can register with a unique username and password and log in to receive a JWT token.
- Address Management: Authenticated users can add, update, and delete their addresses.
- Input Validation: Ensures that all required fields are provided and valid.
- Error Handling: Provides meaningful error messages for different scenarios.
- Security Measures:
  - Passwords are hashed using bcrypt.
  - JWT tokens are used for stateless authentication.
  - Input sanitization to prevent injection attacks.
  - Rate limiting to prevent abuse.
  - Secure HTTP headers using Helmet.
  - Pagination and Filtering: Supports pagination and filtering in data retrieval endpoints.

## Tech Stack

- Node.js and Express.js: Server-side runtime environment and web framework.
- MongoDB and Mongoose: Database and Object Data Modeling (ODM) library.
- bcrypt: Password hashing.
- jsonwebtoken: JWT token generation and verification.
- express-validator: Input validation.
- Helmet: Securing HTTP headers.
- express-mongo-sanitize: Sanitizes user-supplied data to prevent MongoDB Operator Injection.
- express-rate-limit: Rate limiting middleware.

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


# API Endpoints 

Authentication - Register 

```bash
POST /api/register
```
- Description: Registers a new user.
- Request Body:
  
```bash
{
  "name": "John Doe",
  "username": "johndoe",
  "password": "password123"
}
```

- Response
  ```bash
  {
  "message": "User registered successfully",
  "token": "JWT_TOKEN_HERE",
  "user": {
    "id": "USER_ID_HERE",
    "name": "John Doe",
    "username": "johndoe"
  }
}
```
-- Include Authorization Header in every request for valid responses.
