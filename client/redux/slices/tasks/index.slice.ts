import { createSlice } from "@reduxjs/toolkit";

import { sameState } from "../initialState";

export type initialStateType = {
  tasks?: Array<Object> | any;
  specialTask?: Object | any;
  status?: any;
  fetchError?: Array<String>;
  success?: boolean;
  actionStatus?: string;
};

export const initialState: initialStateType = {
  specialTask: {},
  status: {
    taskThunk: "idle",
    specialTaskThunk: "idle",
  },
  ...sameState,
};

// =========== Builders =========== \\
import {
  createTaskThunk_Builder,
  editTaskThunk_Builder,
  specialTaskThunk_Builder,
  createTaskItemThunk_Builder,
  editTaskItemThunk_Builder,
  removeTaskItemThunk_Builder,
  removeTaskThunk_Builder,
  changeItemStatus_builder,
} from "./thunks/task.builder";

// =========== Thunks =========== \\
import {
  createTaskItem,
  createTask,
  editTaskItem,
  editTask,
  removeTaskItem,
  removeTask,
  specialTask,
  changeItemStatus,
} from "./thunks/task.thunk";

const TaskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.actionStatus = "idle";
      state.fetchError = [];
    },
  },
  extraReducers: (builder) => {
    createTaskThunk_Builder(builder, createTask);
    specialTaskThunk_Builder(builder, specialTask);
    createTaskItemThunk_Builder(builder, createTaskItem);
    editTaskItemThunk_Builder(builder, editTaskItem);
    removeTaskThunk_Builder(builder, removeTask);
    removeTaskItemThunk_Builder(builder, removeTaskItem);
    editTaskThunk_Builder(builder, editTask);
    changeItemStatus_builder(builder, changeItemStatus);
  },
});

export const { resetSuccess } = TaskSlice.actions;

export default TaskSlice.reducer;
