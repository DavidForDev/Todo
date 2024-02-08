import { ActionReducerMapBuilder, current } from "@reduxjs/toolkit";
import { initialStateType } from "../index.slice";

// ========== Helper ========== \\
import { useError } from "../../../../hooks/useError";

export const createTaskThunk_Builder = (
  builder: ActionReducerMapBuilder<any>,
  type: any
) => {
  builder.addCase(type.pending, (state: initialStateType, actions) => {
    try {
      state.actionStatus = "processing...";
    } catch (error) {
      throw error;
    }
  });
  builder.addCase(type.rejected, (state: initialStateType, actions) => {
    try {
      state.actionStatus = "error";
    } catch (error) {
      throw error;
    }
  });
  builder.addCase(type.fulfilled, (state: initialStateType, actions) => {
    try {
      const error = actions.payload.errors;

      if (error) return useError(error, state);

      const newTask = actions.payload.response.createTask;

      return (state = {
        ...state,
        tasks: [...state.tasks, newTask],
        actionStatus: "succesed",
      });
    } catch (error) {
      throw error;
    }
  });
};

export const editTaskThunk_Builder = (
  builder: ActionReducerMapBuilder<any>,
  type: any
) => {
  builder.addCase(type.pending, (state: initialStateType, actions) => {
    try {
      state.actionStatus = "processing...";
    } catch (error) {
      throw error;
    }
  });
  builder.addCase(type.rejected, (state: initialStateType, actions) => {
    try {
      state.actionStatus = "error";
    } catch (error) {
      throw error;
    }
  });
  builder.addCase(type.fulfilled, (state: initialStateType, actions) => {
    try {
      const taskDetail = actions.payload.response.editTask;
      const specialTask = state.specialTask;

      state.specialTask = {
        ...taskDetail,
        taskItems: specialTask.taskItems,
      };

      state.actionStatus = "succesed";
    } catch (error) {
      throw error;
    }
  });
};

export const specialTaskThunk_Builder = (
  builder: ActionReducerMapBuilder<any>,
  type: any
) => {
  builder.addCase(type.pending, (state: initialStateType, actions) => {
    try {
      state.status.specialTaskThunk = "loading";
    } catch (error) {
      throw error;
    }
  });
  builder.addCase(type.rejected, (state: initialStateType, actions) => {
    try {
      (state.status.specialTaskThunk = "error"),
        (state.fetchError = actions.payload);
    } catch (error) {
      throw error;
    }
  });
  builder.addCase(type.fulfilled, (state: initialStateType, actions) => {
    try {
      const taskDetail = actions.payload.response.specialTask;

      state.specialTask = taskDetail;
      state.status.specialTaskThunk = "success";
    } catch (error) {
      throw error;
    }
  });
};

export const createTaskItemThunk_Builder = (
  builder: ActionReducerMapBuilder<any>,
  type: any
) => {
  builder.addCase(type.pending, (state: initialStateType, actions) => {
    try {
      state.actionStatus = "processing...";
    } catch (error) {
      throw error;
    }
  });
  builder.addCase(type.rejected, (state: initialStateType, actions) => {
    try {
      state.actionStatus = "error";
    } catch (error) {
      throw error;
    }
  });
  builder.addCase(type.fulfilled, (state: initialStateType, actions) => {
    try {
      const taskItem = actions.payload.response.createTaskItem;
      const error = actions.payload.errors;

      const oldTaskItems = state.specialTask.taskItems;
      const todoItmes = oldTaskItems.todo;

      if (error) return useError(error, state);

      state.specialTask = {
        ...state.specialTask,
        taskItems: { ...oldTaskItems, todo: [...todoItmes, taskItem] },
      };

      state.actionStatus = "succesed";
    } catch (error) {
      throw error;
    }
  });
};

export const editTaskItemThunk_Builder = (
  builder: ActionReducerMapBuilder<any>,
  type: any
) => {
  builder.addCase(type.pending, (state: initialStateType, actions) => {
    try {
      state.actionStatus = "processing...";
    } catch (error) {
      throw error;
    }
  });
  builder.addCase(type.rejected, (state: initialStateType, actions) => {
    try {
      state.actionStatus = "error";
    } catch (error) {
      throw error;
    }
  });
  builder.addCase(type.fulfilled, (state: initialStateType, actions) => {
    try {
      const updatedTaskItem = actions.payload.response.editTaskItem;
      const { status, _id } = updatedTaskItem;

      // ====== General
      const newTaskItems = { ...state.specialTask.taskItems };
      newTaskItems[status] = newTaskItems[status].map((taskItem: any) =>
        taskItem._id === _id ? updatedTaskItem : taskItem
      );

      state.specialTask = {
        ...state.specialTask,
        taskItems: newTaskItems,
      };

      state.actionStatus = "succesed";
    } catch (error) {
      throw error;
    }
  });
};

export const removeTaskThunk_Builder = (
  builder: ActionReducerMapBuilder<any>,
  type: any
) => {
  builder.addCase(type.pending, (state: initialStateType, actions) => {
    try {
      state.actionStatus = "processing...";
    } catch (error) {
      throw error;
    }
  });
  builder.addCase(type.rejected, (state: initialStateType, actions) => {
    try {
      state.actionStatus = "error";
    } catch (error) {
      throw error;
    }
  });
  builder.addCase(type.fulfilled, (state: initialStateType, actions) => {
    try {
      const { alert } = actions.payload.response.removeTask;

      if (alert) {
        location.href = "/tasks";
      }
    } catch (error) {
      throw error;
    }
  });
};

export const removeTaskItemThunk_Builder = (
  builder: ActionReducerMapBuilder<any>,
  type: any
) => {
  builder.addCase(type.pending, (state: initialStateType, actions) => {
    try {
      state.actionStatus = "processing...";
    } catch (error) {
      throw error;
    }
  });
  builder.addCase(type.rejected, (state: initialStateType, actions) => {
    try {
      state.actionStatus = "error";
    } catch (error) {
      throw error;
    }
  });
  builder.addCase(type.fulfilled, (state: initialStateType, actions) => {
    try {
      const removedTaskItem = actions.payload.response.removeTaskItem;
      const { status, _id } = removedTaskItem;

      // ====== General
      const removedTaskItems = { ...state.specialTask.taskItems };
      removedTaskItems[status] = removedTaskItems[status].filter(
        (taskItem: any) => taskItem._id !== _id
      );

      state.specialTask = {
        ...state.specialTask,
        taskItems: removedTaskItems,
      };

      state.actionStatus = "succesed";
    } catch (error) {
      throw error;
    }
  });
};

export const changeItemStatus_builder = (
  builder: ActionReducerMapBuilder<any>,
  type: any
) => {
  builder.addCase(type.pending, (state: initialStateType, actions) => {
    try {
      state.actionStatus = "processing...";
    } catch (error) {
      throw error;
    }
  });
  builder.addCase(type.rejected, (state: initialStateType, actions) => {
    try {
      state.actionStatus = "error";
    } catch (error) {
      throw error;
    }
  });
  builder.addCase(type.fulfilled, (state, actions) => {
    try {
      const updatedTaskItem = actions.payload.response.changeStatus;

      const specialTask = state.specialTask;

      return (state = {
        ...state,
        actionStatus: "succesed",
        specialTask: {
          ...specialTask,
          taskItems: updatedTaskItem,
        },
      });
    } catch (error) {
      throw error;
    }
  });
};
