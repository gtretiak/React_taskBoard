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