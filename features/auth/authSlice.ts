import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  identifier: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  identifier: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    login(state, action: PayloadAction<string>) {
      state.isAuthenticated = true;
      state.identifier = action.payload;
    },

    logout(state) {
      state.isAuthenticated = false;
      state.identifier = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;