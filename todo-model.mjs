function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function createTodo(text, id = createId()) {
  return {
    id,
    text,
    completed: false,
  };
}

export function addTodo(todos, rawText, id) {
  const text = rawText.trim();
  if (!text) {
    return todos;
  }

  return [...todos, createTodo(text, id)];
}

export function toggleTodo(todos, id) {
  return todos.map((todo) => {
    if (todo.id !== id) {
      return todo;
    }

    return {
      ...todo,
      completed: !todo.completed,
    };
  });
}

export function deleteTodo(todos, id) {
  return todos.filter((todo) => todo.id !== id);
}
