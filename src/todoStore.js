export const DEFAULT_STORAGE_KEY = "sym-10-todos";

function normalizeTodo(todo, index) {
  if (!todo || typeof todo !== "object") {
    return null;
  }

  const title = typeof todo.title === "string" ? todo.title.trim() : "";
  if (!title) {
    return null;
  }

  const id = typeof todo.id === "string" && todo.id ? todo.id : `todo-${index}`;
  return {
    id,
    title,
    completed: Boolean(todo.completed),
  };
}

export function sanitizeTodos(rawTodos) {
  if (!Array.isArray(rawTodos)) {
    return [];
  }

  return rawTodos
    .map((todo, index) => normalizeTodo(todo, index))
    .filter((todo) => todo !== null);
}

export function loadTodos(storage, key = DEFAULT_STORAGE_KEY) {
  if (!storage || typeof storage.getItem !== "function") {
    return [];
  }

  try {
    const serialized = storage.getItem(key);
    if (!serialized) {
      return [];
    }

    return sanitizeTodos(JSON.parse(serialized));
  } catch {
    return [];
  }
}

export function saveTodos(storage, todos, key = DEFAULT_STORAGE_KEY) {
  const normalized = sanitizeTodos(todos);

  if (storage && typeof storage.setItem === "function") {
    storage.setItem(key, JSON.stringify(normalized));
  }

  return normalized;
}
