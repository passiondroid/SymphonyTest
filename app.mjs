import { addTodo, toggleTodo, deleteTodo } from "./todo-model.mjs";

const STORAGE_KEY = "todo-web-app.todos";

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const emptyState = document.getElementById("empty-state");

let todos = loadTodos();

function loadTodos() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((item) => item && typeof item.id === "string" && typeof item.text === "string")
      .map((item) => ({
        id: item.id,
        text: item.text,
        completed: Boolean(item.completed),
      }));
  } catch {
    return [];
  }
}

function saveTodos(nextTodos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextTodos));
}

function updateTodos(nextTodos) {
  todos = nextTodos;
  saveTodos(todos);
  render();
}

function render() {
  list.replaceChildren();
  emptyState.hidden = todos.length > 0;

  for (const todo of todos) {
    const item = document.createElement("li");
    item.className = `todo-item${todo.completed ? " completed" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", `Mark ${todo.text} as completed`);
    checkbox.addEventListener("change", () => {
      updateTodos(toggleTodo(todos, todo.id));
    });

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "todo-delete";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      updateTodos(deleteTodo(todos, todo.id));
    });

    item.append(checkbox, text, deleteButton);
    list.append(item);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) {
    input.focus();
    return;
  }

  updateTodos(addTodo(todos, text));
  form.reset();
  input.focus();
});

render();
