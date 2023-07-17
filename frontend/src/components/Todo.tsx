import { createSignal, batch, For } from "solid-js";
import { render } from "solid-js/web";
import { createLocalStore, removeIndex } from "../providers/localStore";
import "../styles/todo.css";

type TodoItem = { title: string; done: boolean };

export default function Todo() {
  const [newTitle, setTitle] = createSignal("");
  const [todos, setTodos] = createLocalStore<TodoItem[]>("todos", []);

  const addTodo = (e: SubmitEvent) => {
    e.preventDefault();
    batch(() => {
      setTodos(todos.length, {
        title: newTitle(),
        done: false,
      });
      setTitle("");
    });
  };

  return (
    <>
      <h3>Simple Todos Example</h3>
      <form onSubmit={addTodo}>
        <input
          class="input-todo"
          placeholder="enter todo and click +"
          required
          value={newTitle()}
          onInput={(e) => setTitle(e.currentTarget.value)}
        />
        <button>+</button>
      </form>
      <For each={todos}>
        {(todo, i) => (
          <div>
            <input
              class="input-checkbox"
              type="checkbox"
              checked={todo.done}
              onChange={(e) => setTodos(i(), "done", e.currentTarget.checked)}
            />
            <input
              class="input-todo"
              type="text"
              value={todo.title}
              onChange={(e) => setTodos(i(), "title", e.currentTarget.value)}
            />
            <button onClick={() => setTodos((t) => removeIndex(t, i()))}>
              x
            </button>
          </div>
        )}
      </For>
    </>
  );
}
