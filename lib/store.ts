import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "@/features/users/usersApi";
import usersReducer from "@/features/users/usersSlice";
import authReducer from "@/features/auth/authSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [usersApi.reducerPath]: usersApi.reducer,
      users: usersReducer,
      auth: authReducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(usersApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];