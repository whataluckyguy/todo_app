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
  outlinedInputClasses,
  createTheme,
  useTheme,
  ThemeProvider,
} from "@mui/material";
import "./App.css";
import { useLayoutEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import Todo from "./Todo";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodoList, addTodo } from "./features/todolist/todoSlice";

const customTheme = (outerTheme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "--TextField-brandBorderColor": "#444cf7",
            "--TextField-brandBorderHoverColor": "#444cf7",
            "--TextField-brandBorderFocusedColor": "#444cf7",
            "& label.Mui-focused": {
              color: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "var(--TextField-brandBorderColor)",
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderHoverColor)",
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            "&::before, &::after": {
              borderBottom: "2px solid var(--TextField-brandBorderColor)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom:
                "2px solid var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            "&::before": {
              borderBottom: "2px solid var(--TextField-brandBorderColor)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom:
                "2px solid var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
    },
  });

const AnimatedTab = styled(({ isActive, ...other }) => <Tab {...other} />)(
  ({ theme, isActive }) => ({
    "&.Mui-selected": { color: "white" },
    transition: "background-color 0.3s ease",
    backgroundColor: isActive ? "#444cf7" : "transparent",
    "&:hover": {
      backgroundColor: "#444cf7",
      color: "white",
    },
  })
);

function App() {
  const [list, setList] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const outerTheme = useTheme();
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todo.todoList);
  const todoStatus = useSelector((state) => state.todo.status);
  const error = useSelector((state) => state.todo.error);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useLayoutEffect(() => {
    if (todoStatus === "idle") {
      dispatch(fetchTodoList());
    }
  }, [todoStatus, dispatch]);

  if (todoStatus === "idle") {
    return <div>Loading...</div>;
  }
  if (todoStatus === "failed") {
    return <div>Error while fetching data from server.</div>;
  }

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
                borderRadius: 10,
                width: "20%",
              }}
            />
            <AnimatedTab
              isActive={activeTab === 1}
              label="Pending"
              sx={{
                borderRadius: 10,
                width: "20%",
              }}
            />
            <AnimatedTab
              isActive={activeTab === 2}
              label="Completed"
              sx={{
                borderRadius: 10,
                width: "20%",
              }}
            />
          </Tabs>
        </Box>
        {activeTab === 0 && (
          <Paper
            className="todos"
            elevation={3}
            sx={{ borderRadius: 4, marginTop: 1 }}
          >
            {todoList.map((item, index) => (
              <Todo
                key={index}
                todoID={item.id}
                todo={item.todo}
                check={item.completed}
                index={index}
              />
            ))}
          </Paper>
        )}
        {activeTab === 1 && (
          <Paper
            className="todos"
            elevation={3}
            sx={{ borderRadius: 4, marginTop: 1 }}
          >
            {todoList
              .filter((item) => !item.completed)
              .map((item, index) => (
                <Todo
                  key={index}
                  todoID={item.id}
                  todo={item.todo}
                  check={item.completed}
                  index={index}
                />
              ))}
          </Paper>
        )}
        {activeTab === 2 && (
          <Paper
            className="todos"
            elevation={3}
            sx={{ borderRadius: 4, marginTop: 1 }}
          >
            {todoList
              .filter((item) => item.completed)
              .map((item, index) => (
                <Todo
                  key={index}
                  todoID={item.id}
                  todo={item.todo}
                  check={item.completed}
                  index={index}
                />
              ))}
          </Paper>
        )}

        <CssBaseline />
        <Box
          className="input"
          sx={{ marginTop: 1 }}
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const newTodo = formJson.task;
            dispatch(addTodo(newTodo));
            event.target.reset();
          }}
        >
          <ThemeProvider theme={customTheme(outerTheme)}>
            <TextField
              required
              id="task"
              type="text"
              name="task"
              label="What's on your mind?"
              variant="outlined"
              sx={{
                width: "85%",
                backgroundColor: "white",
                borderRadius: "20px",
              }}
              InputProps={{
                style: {
                  borderRadius: "20px",
                },
              }}
            />
          </ThemeProvider>
          <Fab type="submit">
            <Add />
          </Fab>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
