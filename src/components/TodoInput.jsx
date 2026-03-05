import { useState } from "react";

function TodoInput({ onAdd }) {
  const [value, setValue] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onAdd(value);
    setValue("");
  }

  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <label htmlFor="todo-text" className="sr-only">
        Add a task
      </label>
      <input
        id="todo-text"
        type="text"
        placeholder="What needs to be done?"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default TodoInput;
