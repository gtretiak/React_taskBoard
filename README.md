# Task Board SPA

React + TypeScript task board developed during the DSR JS Bootcamp.

## Project

Task board SPA built with React and TypeScript using the provided Task Board Backend API that includes a swagger and Postman data files.

# Project requirements

## Required features

### Authentication

- [ ] Login
- [ ] Register

### Tasks

- [ ] List
- [ ] Open detail
- [ ] Create task
- [ ] Update task
- [ ] Delete task

### React

- [ ] Hooks
- [ ] State
- [ ] State manager

### Forms

- [ ] Forms
- [ ] Client-side validation (lib up to me)

### Requests

- [ ] Loading
- [ ] Error handling

## Optional features

- [ ] Change password
- [ ] Assignment logic (for required do self-assigned)
- [ ] Pagination and/or Filters on the task list, Sorting
- [ ] Kanban-like status board
- [ ] Tag list for filters
- [ ] Blocking

## Rules

- One repository from L1: every homework assignment is delivered as a merge to main or a PR with a clear title
  — no separate “mini projects”
- L1–L3: students may use mock data shaped like the Swagger contract (hand-written types or openapi-typescript)
- From L5 onward: the real backend API is mandatory.
- Tie each week’s acceptance criteria explicitly to the final project
- Required scope: auth, task CRUD, requests, errors, validation.

## Week tasks

### L1 — React Basics & TypeScript

#### The goal: application skeleton + domain type safety.

- [ ] Initialize Vite + React + TypeScript (you can use the “final” bundler immediately — then L4 becomes “go deeper”, not “start from scratch”)
- [ ] Create SPA skeleton: header, main container, login, register and tasksPage placeholder pages, TaskCard component etc
- [ ] Move User, Task, AuthTokens (or names as in the backend API) into types.ts.
- [ ] Add a minimal API client (fetch + baseUrl from import.meta.env) without full logic yet — stub functions returning mocked Promises.
- [ ] Add a small local scenario, but inside the product: e.g. a “quick task note” form using only useState (title + deadline) and a list of such drafts on screen — later this merges into the real “create task” flow (or gets removed when the API is wired).

The outcome: the app runs; you have routing or at least conditional screen rendering (routing can wait until L6, but it’s better to add React Router DOM/TanStack Router (or another lib) early with empty pages).

### L2 — Virtual DOM & Fiber

#### The goal: intentional work with the render tree and re-renders in the context of a task list.

- [ ] Replace the mock list with a long list (50–200 items)
- [ ] Add client-side search/filter by string (with debounce).
- [ ] Identify and fix 2–3 rendering anti-patterns (e.g. unnecessary callback/object recreation in props, expensive computations without useMemo, unstable keys, inline objects in list items).

The outcome: same repository, noticeably more stable list behavior; students stay in the same domain (no context switch).

### L3 — Hooks, Context

#### The goal: move cross-cutting concerns into Context before Redux

##### Implement authentication using React Context:

1. Create an AuthContext that provides:

- login method
- logout method
- access token

2. Create a useAuth hook that provides access to the AuthContext.
3. The login form must contain:

- login
- password

4. The application should conditionally render the following pages directly in JSX:

- Login page - when the user is not authenticated;
- Dashboard page - when the user is authenticated.

5. Access token should be stored in localStorage.

For this phase, do not use a backend. Authentication should be simulated using a mock token.

React Router is not required for this phase.

##### Implement application theming using React Context.

1. Create a ThemeContext that provides the current theme.
2. The application must support two themes:

- light
- dark

3. All theme-dependent colors must be defined using CSS custom properties (CSS variables).  
   For example:

:root {  
--color-background: ...;  
--color-text: ...;  
} 4) The theme can be selected at build time using .env variables. Runtime theme switching is not required.

##### Add task management functionality to the Dashboard page.

1. Use the following task structure:

type Task = {
id: string;
title: string;
completed: boolean;
}; 2) The id must be generated on the client side. 3) Implement the following operations:

- Read. Display the list of tasks when the Dashboard is opened. Tasks must be loaded from localStorage.
- Create. Allow the user to add a new task. Generate the task ID on the client side.
- Update. Allow the user to change the task status (completed / not completed).
- Delete. Allow the user to delete a task.

4. Use React's useState hook to keep the task list in application state.
5. Redux or another global state management library is not required at this phase and should not be used.
6. Persist the task list in localStorage.
7. The expected flow is:

- Dashboard opens.
- Tasks are read from localStorage.
- Tasks are stored in React state using useState.
- User performs an operation.
- React state is updated.
- The updated task list is persisted to localStorage.

8. Create a reusable useLocalTasks hook. The Dashboard should use this hook instead of implementing the task operations directly. The hook should provide the task-related operations, such as:

- reading tasks;
- adding a task;
- deleting a task;
- updating task status.

##### Implement search by task title.

1. Search must:

- be case-insensitive;
- match a substring of the task title.

2. Create a reusable useDebouncedValue hook. The search input should use this hook so that the search is not performed immediately on every keystroke.
   The search should be performed after a short delay following the user's last input.

The outcome: “board-like” behavior without a server; no Redux yet

### L4 — Building and Bundling

1. Deploy the backend according to the provided instructions: GitHub - koshkinoko-hana/task-board-api

The deployed backend should provide the functionality required for authentication.

2. Configure the frontend to use the backend API.

Create separate environment configuration for:

- development;
- production.

Use the following variable: VITE_API_BASE_URL

Actual .env files must not be committed to Git. Add the appropriate .env files to .gitignore.

Instead, commit example configuration files, such as .env.example.

The example files should contain the required variable names but should not contain private credentials or environment specific secrets.

3. Replace the mock authentication from Phase 1 with authentication through the deployed backend.

The application should:

- send the login credentials to the backend;
- receive the authentication token from the backend;
- store/use the real token through AuthContext;
- use the token for authenticated API requests;
- remove/clear the token when the user logs out.

The mock token must no longer be used for backend authentication.

4. Webpack
   Create a separate branch: experiments/webpack-playground

On this branch, rewrite the project Vite configuration to use Webpack.

The Webpack version should preserve the functionality implemented in the previous phases.

### L5 — State, selectors, middlewares

#### The goal: what the final project needs — State management + async

1. Add State management (Redux Toolkit/Zustand/Mobx) and move tasks (and optionally auth) from Context/local state into State management structure (reducers, selectors, middlewares).

2. Implement the minimum Required set: login, register, task list, open details, create, update, delete — with loading / error in the store.

The outcome: the core final-project functionality already lives in one codebase

### L6 — Forms, Routing

#### The goal: product-like routes + forms with validation

1. Router: public /login, /register; protected /tasks, /tasks/:id (a ProtectedRoute component based on token from State management/Context).

2. Forms: forms lib (react-hook-form + zod , Ant Design Form etc) — validate registration/login fields and the task form (required fields, lengths, formats aligned with the API).

Handle API errors in forms (field-level messages from the backend or global notification).

The outcome: the SPA matches the final assignment structure

### L7 — How the browser works & Animations

#### The goal: connect networking, caching, and UX polish without a new “separate project”

1. Networking layer: visualize request states (skeleton / spinner), retry on network errors, README notes explaining preflight and why CORS is configured on the backend.

2. Animations: smooth appearance for list cards; transitions between list and details (transition / View Transitions API — depending on group level).

3. Final “Optional” features (assign as bonus): Kanban by status, pagination, tags, blocking — as polish in the same repo.

The outcome: finishing the same app for submission
