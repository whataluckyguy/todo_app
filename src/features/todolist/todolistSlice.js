import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const todolistSlice = createSlice({
  name: "todoList",
  initialState: {
    todos: [],
    // status,
  },
  reducers: {},
});

export const { addTodo } = todolistSlice.actions;

export default todolistSlice.reducer;
