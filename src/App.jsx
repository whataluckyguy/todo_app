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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useLayoutEffect(() => {
    // axios
    //   .get("https://dummyjson.com/todos")
    //   .then((response) => setList(response.data.todos));
    // console.log(list);
  }, []);

  return (
    <Box className="app">
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: "white",
          height: "100%",
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
        >
          To-Do List
        </Typography>
        <Box className="category">
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="All" />
            <Tab label="Pending" />
            <Tab label="Completed" />
          </Tabs>
        </Box>
        <Paper
          elevation={3}
          sx={{ height: "75%", padding: 2, overflowY: "scroll" }}
        >
          {/* {list.map((item) => (
            <Todo key={item.id} todo={item.todo} />
          ))} */}
        </Paper>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
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
