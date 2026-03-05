import { useMemo, useState } from "react";
import TodoInput from "./components/TodoInput.jsx";
import TodoList from "./components/TodoList.jsx";

const STORAGE_KEY = "todo-web-app-items";

function loadInitialTodos() {
  try {
    const fromStorage = localStorage.getItem(STORAGE_KEY);
    if (!fromStorage) {
      return [];
    }

    const parsed = JSON.parse(fromStorage);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item) =>
        item &&
        typeof item.id === "string" &&
        typeof item.text === "string" &&
        typeof item.completed === "boolean"
    );
  } catch {
    return [];
  }
}

function App() {
  const [todos, setTodos] = useState(loadInitialTodos);

  const remainingCount = useMemo(
    () => todos.filter((item) => !item.completed).length,
    [todos]
  );

  function persist(nextTodos) {
    setTodos(nextTodos);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextTodos));
  }

  function handleAddTodo(text) {
    const todoText = text.trim();
    if (!todoText) {
      return;
    }

    const nextTodo = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      text: todoText,
      completed: false
    };

    persist([nextTodo, ...todos]);
  }

  function handleToggleTodo(id) {
    const nextTodos = todos.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    persist(nextTodos);
  }

  function handleDeleteTodo(id) {
    const nextTodos = todos.filter((item) => item.id !== id);
    persist(nextTodos);
  }

  return (
    <main className="app-shell">
      <section className="todo-card">
        <header className="todo-card__header">
          <p className="todo-card__kicker">Todo Web App</p>
          <h1>Stay on top of your day</h1>
          <p>
            Add tasks, mark them complete, and keep everything saved in your
            browser.
          </p>
        </header>

        <TodoInput onAdd={handleAddTodo} />

        <div className="todo-card__meta">
          <strong>{remainingCount}</strong>
          <span>tasks remaining</span>
        </div>

        <TodoList
          items={todos}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
        />
      </section>
    </main>
  );
}

export default App;
