function TodoItem({ item, onToggle, onDelete }) {
  return (
    <li className="todo-item">
      <label>
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => onToggle(item.id)}
        />
        <span className={item.completed ? "completed" : ""}>{item.text}</span>
      </label>
      <button
        type="button"
        className="todo-item__delete"
        onClick={() => onDelete(item.id)}
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
