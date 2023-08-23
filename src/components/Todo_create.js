import { Typography, IconButton, Stack, TextField, Box } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DoneIcon from "@mui/icons-material/Done";
import useTodoContext from "../Hooks/use-todo-context";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  todoItem: yup.string().required("Todo name is required"),
});

function TodoCreate() {
  const form = useForm({ resolver: yupResolver(schema) });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;
  const { createTodo } = useTodoContext();

  const handleButton = (data) => {
    createTodo(data.todoItem);
    reset();
  };

  return (
    <Box
      marginTop={4}
      marginBottom={2}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <form onSubmit={handleSubmit(handleButton)}>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" gap={1}>
            <DoneIcon
              variant="contained"
              sx={{ marginRight: "10px", bgcolor: "#02c465" }}
            />
            <Typography color="custom1" variant="h5">
              ToDo List
            </Typography>
          </Stack>
          <Stack spacing={2} direction="row">
            <TextField
              error={Boolean(errors.todoItem)}
              helperText={errors.todoItem ? errors.todoItem.message : ""}
              {...register("todoItem")}
              id="todoItem"
              InputProps={{
                style: {
                  borderRadius: "10px",
                  backgroundColor: "#232934",
                  color: "white",
                },
              }}
              InputLabelProps={{ style: { color: "#585c64" } }}
              label="What's up? ..."
              sx={{
                height: 40,
                width: 500,
              }}
              size="small"
            />

            <IconButton
              style={{ backgroundColor: "#232934" }}
              onClick={handleSubmit(handleButton)}
            >
              <AddRoundedIcon style={{ color: "white" }} />
            </IconButton>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
}
export default TodoCreate;
