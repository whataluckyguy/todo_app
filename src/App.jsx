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
  styled,
  colors,
} from "@mui/material";
import "./App.css";
import { useLayoutEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import Todo from "./Todo";
import axios from "axios";
import { useSelector } from "react-redux";

const AnimatedTab = styled(Tab)(({ theme, isActive }) => ({
  "&.Mui-selected": { color: "white" },
  transition: "background-color 0.3s ease",
  backgroundColor: isActive ? "#444cf7" : "transparent",
  "&:hover": {
    backgroundColor: "#444cf7",
    color: "white",
  },
}));

function App() {
  // const [value, setValue] = useState(0);
  // const list = useSelector((state) => state.);
  const [list, setList] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
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
          <Tabs
            value={activeTab}
            onChange={handleChange}
            centered
            TabIndicatorProps={{
              style: { display: "none" },
            }}
          >
            <AnimatedTab
              isActive={activeTab === 0}
              label="All"
              sx={{
                // backgroundColor: "blanchedalmond",
                borderRadius: 10,
                width: "20%",
              }}
            />
            <AnimatedTab
              isActive={activeTab === 1}
              label="Pending"
              sx={{
                // backgroundColor: "blanchedalmond",
                borderRadius: 10,
                width: "20%",
              }}
            />
            <AnimatedTab
              isActive={activeTab === 2}
              label="Completed"
              sx={{
                // backgroundColor: "blanchedalmond",
                borderRadius: 10,
                width: "20%",
              }}
            />

            {/* <Tab
              label="All"
              sx={{
                backgroundColor: "blanchedalmond",
                borderRadius: 10,
                width: "20%",
              }}
            />
            <Tab label="Pending" sx={{ borderRadius: 10, width: "20%" }} />
            <Tab label="Completed" sx={{ borderRadius: 10, width: "20%" }} /> */}
          </Tabs>
        </Box>
        <Paper
          className="todos"
          elevation={3}
          sx={{ borderRadius: 4, marginTop: 1 }}
        >
          {list.map((item) => (
            <Todo key={item.id} todo={item.todo} />
          ))}
        </Paper>
        <CssBaseline />
        <Box className="input" sx={{ marginTop: 1 }}>
          <TextField
            id="outlined-basic"
            label="What's on your mind?"
            variant="outlined"
            sx={{ width: "85%" }}
            InputProps={{
              style: {
                borderRadius: "20px",
              },
            }}
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
