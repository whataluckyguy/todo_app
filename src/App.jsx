import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Paper,
  TextField,
  Fab,
  CssBaseline,
} from "@mui/material";
import "./App.css";
import { useLayoutEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import Todo from "./Todo";
import axios from "axios";
import { useSelector } from "react-redux";

function App() {
  const [value, setValue] = useState(0);
  // const list = useSelector((state) => state.);
  const [list, setList] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useLayoutEffect(() => {
    axios
      .get("https://dummyjson.com/todos")
      .then((response) => setList(response.data.todos));
    // console.log(list);
  }, []);

  return (
    <Box className="app">
      <Container
        maxWidth="sm"
        className="appContainer"
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          textAlign="center"
          fontWeight="bold"
          className="appName"
        >
          To-Do List
        </Typography>
        <Box className="category">
          <Tabs value={value} onChange={handleChange} centered>
            <Tab
              label="All"
              sx={{
                backgroundColor: "blanchedalmond",
                borderRadius: 10,
                width: "20%",
              }}
            />
            <Tab label="Pending" sx={{ borderRadius: 10, width: "20%" }} />
            <Tab label="Completed" sx={{ borderRadius: 10, width: "20%" }} />
          </Tabs>
        </Box>
        <Paper className="todos" elevation={3}>
          {list.map((item) => (
            <Todo key={item.id} todo={item.todo} />
          ))}
        </Paper>
        <CssBaseline />
        <Box className="input">
          <TextField
            id="outlined-basic"
            label="What's on your mind?"
            variant="outlined"
            sx={{ width: "85%" }}
          />
          <Fab>
            <Add />
          </Fab>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
