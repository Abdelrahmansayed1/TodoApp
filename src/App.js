import { useEffect } from "react";
import TodoCreate from "./components/Todo_create";
import { Box } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import TodoItems from "./components/TodoItems";
import useTodoContext from "./Hooks/use-todo-context";
import { Route, Routes } from "react-router-dom";
import TodoPage from "./Pages/Todo_page";

const theme = createTheme({
  palette: {
    custom1: "#FFFFFF",
    custom2: "#babbc0",
  },
});

function App() {
  const { fetchTodo } = useTodoContext();

  useEffect(() => {
    fetchTodo();
  }, [fetchTodo]);

  return (
    <ThemeProvider theme={theme}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box justifyContent="left" alignItems="center" sx={{ width: "585px" }}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <TodoCreate />
                  <TodoItems />
                </>
              }
            />
            <Route path="/:id" element={<TodoPage />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
