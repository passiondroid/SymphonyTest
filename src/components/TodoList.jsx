import TodoItem from "./TodoItem.jsx";

function TodoList({ items, onToggle, onDelete }) {
  if (items.length === 0) {
    return (
      <p className="todo-empty">No tasks yet. Add one above to get started.</p>
    );
  }

  return (
    <ul className="todo-list">
      {items.map((item) => (
        <TodoItem
          key={item.id}
          item={item}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TodoList;
