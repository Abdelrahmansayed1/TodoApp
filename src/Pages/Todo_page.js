import { useParams } from "react-router-dom";
import useTodoContext from "../Hooks/use-todo-context";
import { Typography } from "@mui/material";

function TodoPage() {
  const { id } = useParams();
  const { todoItems } = useTodoContext();

  const todoItem = todoItems.map((todo) => {
    if (`${todo.id}` === id) {
      return todo.name;
    }
    return null;
  });
  return (
    <Typography variant="h1" color="white">
      {todoItem}
    </Typography>
  );
}

export default TodoPage;
