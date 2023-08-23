import { createContext, useCallback, useState } from "react";
import axios from "axios";

const TodoContext = createContext();

function Provider({ children }) {
  const [todoItems, setTodo] = useState([]);

  const createTodo = async (name) => {
    const response = await axios.post("http://localhost:3001/todoItems", {
      name,
    });
    const updatedTodo = [...todoItems, response.data];

    setTodo(updatedTodo);
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:3001/todoItems/${id}`);
    const updatedTodo = todoItems.filter((todoItem) => {
      return todoItem.id !== id;
    });

    setTodo(updatedTodo);
  };

  const editTodo = async (id, newName) => {
    const response = await axios.put(`http://localhost:3001/todoItems/${id}`, {
      name: newName,
    });

    const updatedTodo = todoItems.map((todoItem) => {
      if (todoItem.id === id) {
        return { ...todoItem, ...response.data };
      }
      return todoItem;
    });
    setTodo(updatedTodo);
  };

  const fetchTodo = useCallback(async () => {
    const response = await axios.get("http://localhost:3001/todoItems");

    setTodo(response.data);
  }, []);

  const valueToShare = {
    todoItems,
    createTodo,
    deleteTodo,
    editTodo,
    fetchTodo,
  };

  return (
    <TodoContext.Provider value={valueToShare}>{children}</TodoContext.Provider>
  );
}

export { Provider };

export default TodoContext;
