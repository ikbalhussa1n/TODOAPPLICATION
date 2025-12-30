# MERN Auth Todo App

### All Todos
![All Todos](frontend/assets/all_todo.png)

### Not Found
![Not Found](frontend/assets/not_found.png)

### Register Page
![Register Page](frontend/assets/register.png)

### Sign In Page
![Sign In Page](frontend/assets/signIn.png)

### Strikeout Feature
![Strikeout Feature](frontend/assets/strikeout.png)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  
[![Node.js](https://img.shields.io/badge/Node.js-16.x-green)](https://nodejs.org/)  
[![MongoDB](https://img.shields.io/badge/MongoDB-5.0-brightgreen)](https://www.mongodb.com/)

A full-stack **MERN (MongoDB, Express, React, Node.js)** application featuring:

- JWT authentication with cookies
- User-based todo management
- Secure route protection (only the owner can access their todos)
- MongoDB relationships (User → Todos)

---

## 🚀 Features

**User Authentication**

- Signup and login with JWT
- Passwords hashed with bcrypt
- Protected routes for todos

**Todo Management**

- Create, read, update, delete todos
- Todos linked to the authenticated user
- Only the owner can modify their todos

**Tech Stack**

- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT
- Frontend: React.js
- Utilities: bcrypt, cookie-parser

---

## 📁 Project Structure

```
TODOAPPLICATION/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── app.js
│   └── server.js
├── frontend/
│   └── assets/
│       ├── all_todo.png
│       ├── not_found.png
│       ├── register.png
│       ├── signIn.png
│       └── strikeout.png
├── README.md
└── .gitignore
```

---

## ⚙️ Installation

1. Clone the repo:

```bash
git clone https://github.com/ikbalhussa1n/TODOAPPLICATION.git
cd TODOAPPLICATION
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
jwtToken=your_jwt_secret
```

> **Never push `.env` to GitHub.**

---

## ▶️ Running the App

**Backend:**

```bash
cd backend
npm run dev
```

**Frontend:**

```bash
cd frontend
npm start
```

---

## 📌 Screenshots

### All Todos

![All Todos](frontend/assets/all_todo.png)

### Not Found

![Not Found](frontend/assets/not_found.png)

### Register Page

![Register Page](frontend/assets/register.png)

### Sign In Page

![Sign In Page](frontend/assets/signIn.png)

### Strikeout Feature

![Strikeout Feature](frontend/assets/strikeout.png)

---

## 📌 API Routes

### Auth

| Method | Route              | Description       |
| ------ | ------------------ | ----------------- |
| POST   | /api/auth/register | User registration |
| POST   | /api/auth/login    | User login        |

### Todos (Protected)

| Method | Route          | Description            |
| ------ | -------------- | ---------------------- |
| POST   | /api/todos     | Create a todo          |
| GET    | /api/todos     | Fetch todos for user   |
| PATCH  | /api/todos/:id | Update todo completion |
| DELETE | /api/todos/:id | Delete a todo          |

> All todo routes require a **valid JWT** stored in cookies.

---

## 🔐 Security Features

- Only the owner can access their todos
- JWT authentication with cookie support
- Password hashing with bcrypt

---

## 🧠 Data Model

**User**

```json
{
  "_id": "ObjectId",
  "username": "string",
  "email": "string",
  "password": "hashed string"
}
```

**Todo**

```json
{
  "_id": "ObjectId",
  "title": "string",
  "isCompleted": false,
  "user": "ObjectId (reference to User)"
}
```

---

## ⭐ Optional Enhancements

- Add additional frontend UI features
- Implement refresh tokens for longer sessions
- Add pagination & filters for todos
- Deploy backend + frontend on Render, Railway, or Vercel

---

## 📄 License

This project is licensed under the **MIT License**.
