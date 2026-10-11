# MERN To-Do List

A full-stack To-Do List built with **MongoDB, Express.js, React (Vite) and Node.js**.
Tasks are stored in MongoDB, served through an Express REST API and managed from a React UI.

**GitHub repository:** <paste your repository URL here>

## Features
- Add a task, view all tasks (loaded from the database on page load)
- Mark a task complete / incomplete (completed tasks are struck through)
- Edit a task's title, delete a task
- Updates appear instantly without a page reload
- Empty titles are rejected (400) by the API

## Project Structure
```
├── backend/                 # Node.js + Express + Mongoose
│   ├── server.js            # server, CORS, MongoDB connection
│   ├── models/Task.js       # Task schema
│   ├── routes/tasks.js      # REST API routes
│   └── .env.example
├── frontend/                # React (Vite)
│   ├── src/App.jsx          # state + API calls
│   ├── src/api.js           # fetch helpers
│   └── src/components/      # TaskForm, TaskList, TaskItem
├── screenshots/
└── README.md
```

## Prerequisites
- Node.js 18 or later
- MongoDB running locally, or a MongoDB Atlas connection string

## How to Run

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env      # Windows: copy .env.example .env
```
Open `backend/.env` and fill in the values:

| Variable        | Meaning                                             | Example                                  |
|-----------------|-----------------------------------------------------|------------------------------------------|
| `PORT`          | Port for the API                                    | `5000`                                   |
| `MONGO_URI`     | MongoDB connection string (local or Atlas)          | `mongodb://127.0.0.1:27017/todo_app`     |
| `CLIENT_ORIGIN` | Frontend address allowed by CORS                    | `http://localhost:3000`                  |

Then start the server:
```bash
npm start
```
You should see `MongoDB connected` and `Server running on http://localhost:5000`.

### 2. Frontend (in a second terminal)
```bash
cd frontend
npm install
npm start
```
Open **http://localhost:3000**. (The frontend expects the API at `http://localhost:5000/api/tasks`;
set `VITE_API_URL` in `frontend/.env` if yours is different.)

## API Endpoints
Base URL: `http://localhost:5000/api/tasks`

| Method | Endpoint | Description                         | Body                              | Success | Errors   |
|--------|----------|-------------------------------------|-----------------------------------|---------|----------|
| GET    | `/`      | Fetch all tasks                     | –                                 | 200     | 500      |
| POST   | `/`      | Add a task                          | `{ "title": "..." }`              | 201     | 400      |
| PUT    | `/:id`   | Toggle complete and/or edit title   | `{ "completed": true, "title": "..." }` | 200 | 400, 404 |
| DELETE | `/:id`   | Delete a task                       | –                                 | 200     | 400, 404 |

## Task Schema
| Field       | Type    | Notes                    |
|-------------|---------|--------------------------|
| `title`     | String  | required                 |
| `completed` | Boolean | default `false`          |
| `createdAt` | Date    | default `Date.now`       |

## Screenshots
| Screenshot | File |
|------------|------|
| Adding a task | `screenshots/01-add-task.png` |
| Completing a task | `screenshots/02-complete-task.png` |
| Deleting a task | `screenshots/03-delete-task.png` |
| Merged pull requests (Pull requests → Closed) | `screenshots/04-merged-prs.png` |

![Add task](screenshots/01-add-task.png)
![Complete task](screenshots/02-complete-task.png)
![Delete task](screenshots/03-delete-task.png)
![Merged PRs](screenshots/04-merged-prs.png)

## Git Workflow
- `feature/backend` and `feature/frontend` branches, each merged into `main` through a pull request
- `.env` and `node_modules` are git-ignored; `.env.example` lists the required variables

## Author
Name: ______  Roll No: ______
