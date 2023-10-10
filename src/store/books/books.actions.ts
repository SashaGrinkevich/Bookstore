import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import { getBooks } from "../../api/Books/getBooks";
import { getSlice } from "./bookscards.selectors";


export const getBooksThunk = createAsyncThunk(
  "books/getBooksThunk",
  async (param, thunkApi) => {
    const { getState } = thunkApi;
    const { } = getSlice(getState() as RootState);

    return getBooks();
  }
);