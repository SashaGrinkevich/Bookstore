import { createAsyncThunk } from "@reduxjs/toolkit";
import { getBooks } from "../../api/Books/getBooks";
import { Book, getBook } from "../../api/Books/getBook";

import { RootState } from "..";
import { getSlice } from "./bookscards.selectors";
import { getBooksSearch } from "../../api/Books/getSearchBooks";



export const getBooksThunk = createAsyncThunk(
  "books/getBooksThunk",
  async (param, thunkApi) => {
    const { getState } = thunkApi;
    const { limit, offset, search, page } = getSlice(getState() as RootState);

    return getBooks({ limit, offset, search, page });
  }
);


export const getBookThunk = createAsyncThunk(
  "books/getBookThunk",
  (id: Book["isbn13"]) => {
    return getBook({ id });
  }
);

export const getSearchBooksThunk = createAsyncThunk(
  "books/getSearchBookThunk",
  async (param, thunkApi) => {
    const { getState } = thunkApi;
    const { page, search,limit,offset } = getSlice(getState() as RootState);

    return getBooksSearch({ page, search,limit,offset});
  }
);
