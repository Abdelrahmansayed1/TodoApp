import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useState } from "react";
import useTodoContext from "../Hooks/use-todo-context";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  todoItem: yup.string().required("Todo name is required"),
});

function TodoShow({ todo }) {
  const form = useForm({ resolver: yupResolver(schema) });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const { editTodo, deleteTodo } = useTodoContext();
  const [editClicked, setEdit] = useState(true);

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const handleEdit = () => {
    setEdit(!editClicked);
  };

  const handleSubmit2 = (data) => {
    editTodo(todo.id, data.todoItem);
    handleEdit();
  };

  return (
    <List>
      {/* LIST ITEM IF EDIT BUTTON CLICKED IT SHOW TEXTFIELD */}
      <ListItem sx={{ width: 590, height: 40 }}>
        {editClicked ? (
          <ListItemText
            disableTypography
            primary={
              <Link to={`/${todo.id}`} style={{ textDecoration: "none" }}>
                <Typography variant="body1" color="custom2">
                  {todo.name}
                </Typography>
              </Link>
            }
          />
        ) : (
          <form onSubmit={handleSubmit(handleSubmit2)}>
            <TextField
              defaultValue={todo.name}
              id="todItem"
              error={Boolean(errors.todoItem)}
              helperText={errors.todoItem ? errors.todoItem.message : ""}
              {...register("todoItem")}
              sx={{ width: 500 }}
              size="small"
              inputProps={{
                style: {
                  borderRadius: "10px",
                  backgroundColor: "#232934",
                  color: "white",
                },
              }}
            />
          </form>
        )}

        {/* CHANGING BETWEEN EDIT BUTTON AND ADD BUTTON */}
        {editClicked ? (
          <IconButton onClick={handleEdit}>
            <EditIcon style={{ color: "#a3a5aa" }} />
          </IconButton>
        ) : (
          <IconButton onClick={handleSubmit(handleSubmit2)}>
            <AddRoundedIcon sx={{ marginLeft: "15px", color: "white" }} />
          </IconButton>
        )}
        {editClicked ? (
          <IconButton onClick={handleDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        ) : null}
      </ListItem>
    </List>
  );
}

export default TodoShow;
