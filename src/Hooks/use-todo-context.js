import { useContext } from "react";
import TodoContext from "../context/Todo";

function useTodoContext() {
  return useContext(TodoContext);
}

export default useTodoContext;
