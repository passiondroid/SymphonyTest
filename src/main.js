import { loadTodos, saveTodos } from "./todoStore.js";

const elements = {
  form: document.querySelector("#todo-form"),
  input: document.querySelector("#todo-input"),
  list: document.querySelector("#todo-list"),
  emptyState: document.querySelector("#empty-state"),
};

if (!elements.form || !elements.input || !elements.list || !elements.emptyState) {
  throw new Error("Todo app failed to initialize because required DOM elements are missing.");
}

let todos = loadTodos(window.localStorage);

function makeId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `todo-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

function persist() {
  todos = saveTodos(window.localStorage, todos);
}

function updateEmptyState() {
  elements.emptyState.hidden = todos.length > 0;
}

function createTodoItem(todo) {
  const item = document.createElement("li");
  item.className = "todo-item";
  item.dataset.completed = String(todo.completed);

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  checkbox.setAttribute("aria-label", `Mark ${todo.title} as complete`);
  checkbox.addEventListener("change", () => {
    todos = todos.map((currentTodo) =>
      currentTodo.id === todo.id ? { ...currentTodo, completed: checkbox.checked } : currentTodo,
    );
    persist();
    render();
  });

  const title = document.createElement("span");
  title.className = "todo-title";
  title.textContent = todo.title;

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "todo-delete";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    todos = todos.filter((currentTodo) => currentTodo.id !== todo.id);
    persist();
    render();
  });

  item.append(checkbox, title, deleteButton);
  return item;
}

function render() {
  elements.list.replaceChildren(...todos.map((todo) => createTodoItem(todo)));
  updateEmptyState();
}

elements.form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = elements.input.value.trim();
  if (!title) {
    elements.input.value = "";
    return;
  }

  todos = [...todos, { id: makeId(), title, completed: false }];
  persist();
  render();

  elements.input.value = "";
  elements.input.focus();
});

render();
