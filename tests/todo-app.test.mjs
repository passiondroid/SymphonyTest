import assert from "node:assert/strict";
import test from "node:test";

import { addTodo, deleteTodo, toggleTodo } from "../todo-model.mjs";

test("addTodo appends a new todo with trimmed text", () => {
  const start = [];
  const result = addTodo(start, "  write tests  ", "todo-1");

  assert.equal(result.length, 1);
  assert.deepEqual(result[0], {
    id: "todo-1",
    text: "write tests",
    completed: false,
  });
  assert.equal(start.length, 0);
});

test("addTodo ignores blank input", () => {
  const start = [{ id: "a", text: "keep", completed: false }];
  const result = addTodo(start, "   ");

  assert.equal(result, start);
  assert.equal(result.length, 1);
});

test("toggleTodo flips completed state for matching id only", () => {
  const start = [
    { id: "a", text: "first", completed: false },
    { id: "b", text: "second", completed: true },
  ];

  const result = toggleTodo(start, "a");

  assert.equal(result[0].completed, true);
  assert.equal(result[1].completed, true);
});

test("deleteTodo removes matching todo", () => {
  const start = [
    { id: "a", text: "first", completed: false },
    { id: "b", text: "second", completed: true },
  ];

  const result = deleteTodo(start, "b");

  assert.deepEqual(result, [{ id: "a", text: "first", completed: false }]);
});
