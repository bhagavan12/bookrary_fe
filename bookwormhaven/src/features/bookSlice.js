import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedBook: null,
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    selectBook: (state, action) => {
      state.selectedBook = action.payload;
    },
    clearBook: (state) => {
      state.selectedBook = null;
    },
  },
});

export const { selectBook, clearBook } = bookSlice.actions;
export default bookSlice.reducer;
