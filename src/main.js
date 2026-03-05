import { TodoItem } from "./TodoItem.js";

export const sampleTodos = [
  { id: "todo-1", title: "Ship TodoItem component", completed: true },
  { id: "todo-2", title: "Render todo list on screen", completed: false },
  { id: "todo-3", title: "Handle empty-state messaging", completed: false },
];

export function renderTodoListMarkup(todos) {
  if (!Array.isArray(todos) || todos.length === 0) {
    return '<p class="empty-state">No todos yet. Add one to get started.</p>';
  }

  const items = todos.map((todo) => TodoItem(todo)).join("");
  return `<ul class="todo-list">${items}</ul>`;
}

export function renderTodoList(rootElement, todos) {
  if (!rootElement) {
    throw new Error("A root element is required to render todos.");
  }

  rootElement.innerHTML = renderTodoListMarkup(todos);
}

function startApp() {
  const root = document.getElementById("todo-root");
  const sampleButton = document.getElementById("show-sample");
  const emptyButton = document.getElementById("show-empty");

  if (!root || !sampleButton || !emptyButton) {
    return;
  }

  renderTodoList(root, sampleTodos);

  sampleButton.addEventListener("click", () => {
    renderTodoList(root, sampleTodos);
  });

  emptyButton.addEventListener("click", () => {
    renderTodoList(root, []);
  });
}

if (typeof document !== "undefined") {
  startApp();
}
