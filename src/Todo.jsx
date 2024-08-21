import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { deleteTodo, updateTodo } from "./features/todolist/todoSlice";
import { useDispatch } from "react-redux";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Todo = ({ todo, todoID, check }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        justifyItems: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <Checkbox
          {...label}
          style={{
            color: "#444cf7",
          }}
          checked={check}
          onChange={() =>
            dispatch(updateTodo({ id: todoID, todo: todo, completed: !check }))
          }
        />
        <Typography>{todo}</Typography>
        <Dialog
          open={open}
          onClose={handleOpen}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const data = formJson.task;
              console.log(data);
              dispatch(updateTodo({ id: todoID, todo: data }));
              handleOpen();
            },
          }}
        >
          <DialogTitle>Update Task</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To update the ToDo task, please enter what's on your mind.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="task"
              label="task"
              type="text"
              fullWidth
              variant="standard"
              value={todo}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleOpen}>Cancel</Button>
            <Button type="submit">Update</Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <IconButton onClick={handleOpen}>
          <Edit />
        </IconButton>
        <IconButton onClick={() => dispatch(deleteTodo(todoID))}>
          <Delete />
        </IconButton>
      </Box>
    </Container>
  );
};

export default Todo;
