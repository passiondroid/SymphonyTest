import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

import { addTodo, deleteTodo, toggleTodo } from "../todo-model.mjs";

test("user flow can add, complete, and delete a todo", () => {
  const afterAdd = addTodo([], "Ship SYM-9", "sym-9");
  assert.equal(afterAdd.length, 1);
  assert.equal(afterAdd[0].completed, false);

  const afterToggle = toggleTodo(afterAdd, "sym-9");
  assert.equal(afterToggle[0].completed, true);

  const afterDelete = deleteTodo(afterToggle, "sym-9");
  assert.deepEqual(afterDelete, []);
});

test("completed todos have explicit visual style rules", () => {
  const styles = fs.readFileSync(new URL("../styles.css", import.meta.url), "utf8");

  assert.match(styles, /\.todo-item\.completed\s*\{/);
  assert.match(styles, /\.todo-item\.completed\s+\.todo-text\s*\{/);
  assert.match(styles, /text-decoration:\s*line-through;/);
});

test("app wiring includes checkbox toggle and delete actions", () => {
  const script = fs.readFileSync(new URL("../app.mjs", import.meta.url), "utf8");

  assert.match(script, /import\s*\{\s*addTodo,\s*toggleTodo,\s*deleteTodo\s*\}/);
  assert.match(script, /checkbox\.addEventListener\("change"/);
  assert.match(script, /updateTodos\(toggleTodo\(todos,\s*todo\.id\)\)/);
  assert.match(script, /deleteButton\.addEventListener\("click"/);
  assert.match(script, /updateTodos\(deleteTodo\(todos,\s*todo\.id\)\)/);
});
