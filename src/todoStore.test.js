import test from "node:test";
import assert from "node:assert/strict";

import { loadTodos, saveTodos, sanitizeTodos } from "./todoStore.js";

function createMemoryStorage(initial = {}) {
  const data = { ...initial };

  return {
    getItem(key) {
      return Object.prototype.hasOwnProperty.call(data, key) ? data[key] : null;
    },
    setItem(key, value) {
      data[key] = String(value);
    },
    snapshot() {
      return { ...data };
    },
  };
}

test("sanitizeTodos removes invalid todos and normalizes values", () => {
  const todos = sanitizeTodos([
    null,
    { title: "   " },
    { id: "todo-1", title: " Write tests ", completed: 1 },
    { title: "Ship feature", completed: 0 },
  ]);

  assert.deepEqual(todos, [
    { id: "todo-1", title: "Write tests", completed: true },
    { id: "todo-3", title: "Ship feature", completed: false },
  ]);
});

test("loadTodos returns empty array on malformed JSON", () => {
  const storage = createMemoryStorage({ "sym-10-todos": "{not-json" });
  assert.deepEqual(loadTodos(storage), []);
});

test("loadTodos hydrates and sanitizes todos from storage", () => {
  const storage = createMemoryStorage({
    "sym-10-todos": JSON.stringify([
      { id: "a", title: " First ", completed: false },
      { id: "b", title: "", completed: true },
      { title: "Second", completed: true },
    ]),
  });

  assert.deepEqual(loadTodos(storage), [
    { id: "a", title: "First", completed: false },
    { id: "todo-2", title: "Second", completed: true },
  ]);
});

test("saveTodos persists normalized todos to storage and returns saved value", () => {
  const storage = createMemoryStorage();

  const saved = saveTodos(storage, [
    { id: "x", title: " Draft PR ", completed: false },
    { title: "", completed: true },
  ]);

  assert.deepEqual(saved, [{ id: "x", title: "Draft PR", completed: false }]);

  const snapshot = storage.snapshot();
  assert.deepEqual(JSON.parse(snapshot["sym-10-todos"]), saved);
});
