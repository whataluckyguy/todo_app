import { configureStore } from "@reduxjs/toolkit";
import { addTodo } from "../features/todolist/todolistSlice";

export default configureStore({
  reducer: { addTodo },
});
