// src/redux/bookshelfSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const base="http://localhost:3000"
export const fetchBookshelves = createAsyncThunk(
  'bookshelves/fetchBookshelves',
  async (userId) => {
    const response = await axios.get(`${base}/api/bookshelves/${userId}`);
    console.log("response",response.data)
    return response.data;
  }
);

export const createBookshelf = createAsyncThunk(
  'bookshelves/createBookshelf',
  async ({ userId, name, description }) => {
    const response = await axios.post(`${base}/api/bookshelves`, { userId, name, description });
    console.log(response.data);
    return response.data;

  }
);

export const deleteBookshelf = createAsyncThunk(
  'bookshelves/deleteBookshelf',
  async (id) => {
    await axios.delete(`${base}/api/bookshelves/${id}`);
    return id;
  }
);

const bookshelfSlice = createSlice({
  name: 'bookshelves',
  initialState: {
    bookshelves: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookshelves.fulfilled, (state, action) => {
        state.bookshelves = action.payload;
        console.log("action.payload",action.payload);
        state.status = 'succeeded';
      })
      .addCase(createBookshelf.fulfilled, (state, action) => {
        state.bookshelves.push(action.payload);
      })
      .addCase(deleteBookshelf.fulfilled, (state, action) => {
        state.bookshelves = state.bookshelves.filter((shelf) => shelf.id !== action.payload);
      });
  },
});

export default bookshelfSlice.reducer;
