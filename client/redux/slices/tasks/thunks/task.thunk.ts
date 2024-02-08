import { createAsyncThunk } from "@reduxjs/toolkit";
import { decode } from "jsonwebtoken";
import Cookies from "universal-cookie";

const cookie = new Cookies();
const token = cookie.get("token");

// =========== Helper =========== \\
import { thunkResponser } from "../../../../hooks/thunkResponser";

export const createTask = createAsyncThunk(
  "create/task",
  async (actions: any) => {
    const { id }: any = decode(token);

    try {
      const { taskName, taskTags } = actions;

      const graphqlSchema = `
              mutation addTask($taskInput: TaskInput!) {
                  createTask(taskInput: $taskInput) {
                      _id
                      taskName
                      tags {
                          color
                          name
                      }
                      createdAt
                      alert
                  }
              }
          `;

      const variables = {
        taskInput: {
          taskName: taskName,
          tags: taskTags,
          userId: id,
        },
      };

      return thunkResponser(graphqlSchema, variables);
    } catch (error) {
      throw error;
    }
  }
);

export const editTask = createAsyncThunk("task/edit", async (payload: any) => {
  try {
    const { _id, newData } = payload;
    const { newTaskName, newTaskTags } = newData;

    const graphqlSchema = `
          mutation editTask($taskInput: TaskInput!) {
              editTask(taskInput: $taskInput) {
                _id
                taskName
                tags {
                    color
                    name
                }
                createdAt
              }
          }
      `;

    const variables = {
      taskInput: {
        taskName: newTaskName,
        tags: newTaskTags,
        taskId: _id,
      },
    };

    return thunkResponser(graphqlSchema, variables);
  } catch (error) {
    throw error;
  }
});

export const specialTask = createAsyncThunk(
  "special/task",
  async (taskId: String) => {
    try {
      const graphqlSchema = `
      query {
        specialTask(taskId: "${taskId}") {
          _id
          taskName
          author {
            _id
            userName
          }
          tags {
            name
            color
          }
          taskItems {
            todo {
              _id
              status
              attach {
                name
              }
              createdAt
              description
              taskItemName
              author {
                userName
              }
            }
            doing {
              _id
              status
              attach {
                name
              }
              createdAt
              description
              taskItemName
              author {
                userName
              }
            }
            done { 
              _id
              status
              attach {
                name
              }
              createdAt
              description
              taskItemName
              author {
                userName
              }
            }
          }
        }
      }
    `;

      return thunkResponser(graphqlSchema);
    } catch (error) {
      throw error;
    }
  }
);

export const createTaskItem = createAsyncThunk(
  "create/taskItem",
  async (payload: any) => {
    try {
      const { taskId, taskItemName, description, attach }: any = payload;

      const graphqlSchema = ` 
        mutation addTaskItem($taskItemInput: TaskItemInput!){
          createTaskItem(taskItemInput: $taskItemInput) {
            _id
            taskItemName
            description
            attach {
              name
            }
            createdAt
            status
            author {
              userName
            }
          }
        }
    `;

      const variables = {
        taskItemInput: {
          taskId: taskId,
          taskItemName: taskItemName,
          description: description,
          attach: attach,
        },
      };

      return thunkResponser(graphqlSchema, variables);
    } catch (error) {
      throw error;
    }
  }
);

export const editTaskItem = createAsyncThunk(
  "edit/taskItem",
  async (payload: any) => {
    try {
      const { taskItemId, taskItemName, description, attach } = payload;

      const graphqlSchema = `
      mutation editTaskItem($taskItemInput: TaskItemInput!){
        editTaskItem(taskItemInput: $taskItemInput) {
          _id
          taskItemName
          status
          description
          attach {
            name
          }
          author {
            userName
          }
          createdAt
        }
      }
    `;

      const variables = {
        taskItemInput: {
          taskItemId: taskItemId,
          description: description,
          taskItemName: taskItemName,
          attach: attach,
        },
      };

      return thunkResponser(graphqlSchema, variables);
    } catch (error) {
      throw error;
    }
  }
);

export const removeTask = createAsyncThunk(
  "task/remove",
  async (payload: any) => {
    const { taskId, userId } = payload;

    try {
      const graphqlSchema = `
              mutation {
                  removeTask(removeTaskInput: {taskId: "${taskId}", userId: "${userId}"}) {
                    alert
                  }
              }
          `;

      return thunkResponser(graphqlSchema);
    } catch (error) {
      throw error;
    }
  }
);

export const removeTaskItem = createAsyncThunk(
  "remove/taskItem",
  async (taskItemId: string) => {
    try {
      const graphqlSchema = ` 
      mutation {
        removeTaskItem(taskItemId: "${taskItemId}") {
          _id
          status
        }
      }
    `;

      return thunkResponser(graphqlSchema);
    } catch (error) {
      throw error;
    }
  }
);

export const changeItemStatus = createAsyncThunk(
  "change/status",
  async (payload: any) => {
    const { taskItemId, newStatus } = payload;

    try {
      const graphqlSchema = `
        mutation {
          changeStatus(changeStatusInput:{taskItemId: "${taskItemId}", newStatus:"${newStatus}"}) {
            todo {
              _id
              status
              attach {
                name
              }
              createdAt
              description
              taskItemName
              author {
                userName
              }
            }
            doing {
              _id
              status
              attach {
                name
              }
              createdAt
              description
              taskItemName
              author {
                userName
              }
            }
            done { 
              _id
              status
              attach {
                name
              }
              createdAt
              description
              taskItemName
              author {
                userName
              }
            }
          }
        }`;

      return thunkResponser(graphqlSchema);
    } catch (error) {
      throw error;
    }
  }
);
