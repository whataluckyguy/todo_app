import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Box,
  IconButton,
  Checkbox,
  Tabs,
  Tab,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedValue, setEditedValue] = useState("");
  const [value, setValue] = useState(0); // for Tabs

  const handleAddTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { text: input, completed: false }]);
      setInput("");
    }
  };

  const handleEditTodo = () => {
    if (editedValue.trim() && editingIndex !== null) {
      const updatedTodos = todos.map((todo, index) =>
        index === editingIndex ? { ...todo, text: editedValue } : todo
      );
      setTodos(updatedTodos);
      setEditingIndex(null);
      setEditedValue("");
    }
  };

  const handleDeleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const filteredTodos = () => {
    switch (value) {
      case 1:
        return todos.filter((todo) => todo.completed);
      case 2:
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
        <Typography variant="h4" gutterBottom>
          To-Do List
        </Typography>
        <Box mb={2}>
          <Tabs
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
            textColor="primary"
            indicatorColor="primary"
            variant="fullWidth"
          >
            <Tab label="All" />
            <Tab label="Completed" />
            <Tab label="Pending" />
          </Tabs>
        </Box>
        <Box mb={2}>
          <TextField
            label={editingIndex === null ? "Add a new to-do" : "Edit to-do"}
            variant="outlined"
            fullWidth
            value={editingIndex === null ? input : editedValue}
            onChange={(e) => {
              if (editingIndex === null) {
                setInput(e.target.value);
              } else {
                setEditedValue(e.target.value);
              }
            }}
          />
        </Box>
        <Box mb={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={editingIndex === null ? handleAddTodo : handleEditTodo}
            fullWidth
          >
            {editingIndex === null ? "Add To-Do" : "Save Changes"}
          </Button>
        </Box>
        <List>
          {filteredTodos().map((todo, index) => (
            <ListItem
              key={index}
              sx={{ textDecoration: todo.completed ? "line-through" : "none" }}
              secondaryAction={
                <>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => {
                      setEditingIndex(index);
                      setEditedValue(todo.text);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteTodo(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Checkbox
                    checked={todo.completed}
                    onChange={() => handleToggleComplete(index)}
                    color="primary"
                  />
                </>
              }
            >
              <ListItemText primary={todo.text} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default Todo;
