import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "@/services/userApi.ts";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer, // ✅ très important
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware), // ✅ très important aussi
});

// Types (facultatifs mais recommandés)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;