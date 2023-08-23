import TodoShow from "./TodoShow";
import useTodoContext from "../Hooks/use-todo-context";

function TodoItems() {
  const { todoItems } = useTodoContext();
  const renderedTodo = todoItems.map((todo) => {
    return <TodoShow todo={todo} key={todo.id} />;
  });
  return <div>{renderedTodo}</div>;
}

export default TodoItems;
