import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodoList = createAsyncThunk(
  "todo/fetchTodoList",
  async () => {
    const response = await axios.get("https://dummyjson.com/todos?limit=4");
    return response.data.todos;
  }
);

export const deleteTodo = createAsyncThunk("todo/deleteTodo", async (id) => {
  const response = await axios.delete(`https://dummyjson.com/todos/${id}`);
  return id;
});

export const updateTodo = createAsyncThunk(
  "todo/updateTodo",
  async ({ id, todo, completed }) => {
    const response = await axios.put(
      `https://dummyjson.com/todos/${id}`,
      {
        completed,
        todo,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(id);
    return response.data;
  }
);

export const addTodo = createAsyncThunk("todo/addTodo", async (newTodo) => {
  const response = await axios.post(
    "https://dummyjson.com/todos/add",
    { todo: newTodo, completed: false, userId: 5 },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response.data);
  return response.data;
});

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todoList: [],
    local: 255,
    status: "idle",
    error: null,
  },
  reducers: {
    updateLocalTodo: (state, action) => {
      const { index, todo, completed } = action.payload;
      console.log("payload:", action.payload);
      // const index = index;
      // const index = state.todoList.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        state.todoList[index] = { ...state.todoList[index], todo, completed };
      }
    },
    deleteLocalTodo: (state, action) => {
      // state.todoList = state.todoList.filter(
      //   (todo) => todo.id !== action.payload
      // );
      const index = action.payload;
      if (index >= 0 && index < state.todoList.length) {
        state.todoList.splice(index, 1);
      } else {
        console.error("Index out of bounds:", index);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodoList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodoList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todoList = action.payload;
      })
      .addCase(fetchTodoList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todoList = state.todoList.filter(
          (todo) => todo.id !== action.payload
        );
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.todoList.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.todoList[index] = action.payload;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todoList.push(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updateLocalTodo, deleteLocalTodo } = todoSlice.actions;

export default todoSlice.reducer;
