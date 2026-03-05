function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function TodoItem(todo) {
  const title = escapeHtml(todo.title ?? "Untitled todo");
  const checked = todo.completed ? "checked" : "";
  const completedClass = todo.completed ? " is-complete" : "";

  return [
    `<li class="todo-item${completedClass}">`,
    `<input type="checkbox" disabled ${checked} aria-label="${title}" />`,
    `<span class="todo-item-text">${title}</span>`,
    "</li>",
  ].join("");
}
