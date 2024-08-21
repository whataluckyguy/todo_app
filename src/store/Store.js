import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todolist/todoSlice";

export default configureStore({
  reducer: {
    todo: todoReducer,
  },
});
