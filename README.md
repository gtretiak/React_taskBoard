# Task Board SPA

React + TypeScript task board developed during the DSR JS Bootcamp.
## Project

Task board SPA is a single-page task-management app built with React, TypeScript, and Vite, using the provided Task Board Backend API that includes a swagger and Postman data files. It lets users log in, register, as well as create, view, update, and delete tasks.

Backend API: https://github.com/koshkinoko-hana/task-board-api.git

## Installation
### 1. Clone the repositories

Clone the frontend repository:

```bash
git clone https://github.com/gtretiak/React_taskBoard.git
cd React_taskBoard
```
Clone the backend repository in a separate folder:

```bash
git clone https://github.com/koshkinoko-hana/task-board-api.git
```
2. Install dependencies
For the frontend:

```bash
npm install
```
For the backend, follow the setup instructions in its repository.

3. Run the backend
Start the Task Board Backend API according to its README instructions.
By default, the backend runs on http://localhost:3000

4. Run the frontend
Start the development server:

```bash
npm run dev
```
By default, the frontend runs on http://localhost:5173

## Features
- User authentication: registration, login, password change, logout
- CRUD: View task list, create new tasks, edit existing tasks, delete tasks
- Single-page application routing
- API integration with backend service

## Tech Stack
- React
- TypeScript
- Vite
- React Router
- Fetch API / HTTP requests
- CSS

## Possible Future Improvements
- Drag-and-drop task management
- Design improvements
