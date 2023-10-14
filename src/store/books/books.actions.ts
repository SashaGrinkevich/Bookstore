import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import { getBooks } from "../../api/Books/getBooks";
import { getSlice } from "./bookscards.selectors";
import { Book, getBook } from "../../api/Books/getBook";


export const getBooksThunk = createAsyncThunk(
  "books/getBooksThunk",
  async (param, thunkApi) => {
    const { getState } = thunkApi;
    const { limit,offset,search} = getSlice(getState() as RootState);

    return getBooks();
  }
);

export const getBookThunk = createAsyncThunk(
  "posts/getPostThunk",
  (id: Book["isbn13"]) => getBook({ id })
);
