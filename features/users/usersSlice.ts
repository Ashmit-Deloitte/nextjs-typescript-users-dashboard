import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UsersState {
  currentPage: number;
  visibleCount: number;
}

const initialState: UsersState = {
  currentPage: 1,
  visibleCount: 4,
};

const usersSlice = createSlice({
  name: "users",
  initialState,

  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
      state.visibleCount = 4;
    },

    showMore(state) {
      state.visibleCount += 4;
    },

    resetPagination(state) {
      state.currentPage = 1;
      state.visibleCount = 4;
    },
  },
});

export const {
  setCurrentPage,
  showMore,
  resetPagination,
} = usersSlice.actions;

export default usersSlice.reducer;