import { configureStore } from "@reduxjs/toolkit";

// ========== Slices ========== \\
import accountSlice from "./slices/account/index.slice";
import taskSlice from "./slices/tasks/index.slice";

const store = configureStore({
  reducer: {
    account: accountSlice,
    task: taskSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
