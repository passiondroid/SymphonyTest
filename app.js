const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

function createTodoItem(text) {
  const listItem = document.createElement("li");
  listItem.className = "todo-item";
  listItem.textContent = text;
  return listItem;
}

function addTodo(text) {
  todoList.appendChild(createTodoItem(text));
}

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const value = todoInput.value.trim();
  if (!value) {
    return;
  }

  addTodo(value);
  todoInput.value = "";
  todoInput.focus();
});
