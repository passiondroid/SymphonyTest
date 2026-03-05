# Todo Web App

A React + Vite Todo application scaffold with local persistence using browser `localStorage`.

## Stack

- React
- Vite
- ESLint

## Project Structure

```text
.
├── index.html
├── package.json
├── eslint.config.js
├── vite.config.js
├── public/
├── src/
│   ├── components/
│   │   ├── TodoInput.jsx
│   │   ├── TodoItem.jsx
│   │   └── TodoList.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
└── README.md
```

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Start the Vite dev server:

```bash
npm run dev
```

3. Open the printed local URL (default `http://localhost:5173`).

## Available Scripts

- `npm run dev` - start local development server
- `npm run build` - produce production build in `dist/`
- `npm run preview` - preview the production build locally
- `npm run lint` - run ESLint checks

## App Behavior

- Add a task with the input form
- Toggle completion with the checkbox
- Remove a task with the delete button
- Todos persist in browser storage
