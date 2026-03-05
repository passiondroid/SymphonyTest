import test from "node:test";
import assert from "node:assert/strict";

import { TodoItem } from "../src/TodoItem.js";
import { renderTodoListMarkup } from "../src/main.js";

test("TodoItem renders title text and completion state", () => {
  const markup = TodoItem({ title: "Write docs", completed: true });

  assert.match(markup, /Write docs/);
  assert.match(markup, /is-complete/);
  assert.match(markup, /checked/);
});

test("renderTodoListMarkup returns list markup when todos exist", () => {
  const markup = renderTodoListMarkup([
    { title: "Task A", completed: false },
    { title: "Task B", completed: true },
  ]);

  assert.match(markup, /^<ul class="todo-list">/);
  assert.match(markup, /Task A/);
  assert.match(markup, /Task B/);
});

test("renderTodoListMarkup returns empty-state markup when list is empty", () => {
  const markup = renderTodoListMarkup([]);

  assert.equal(
    markup,
    '<p class="empty-state">No todos yet. Add one to get started.</p>',
  );
});
