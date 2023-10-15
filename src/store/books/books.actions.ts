import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import { getBooks } from "../../api/Books/getBooks";
import { getSlice } from "./bookscards.selectors";
import { Book, getBook } from "../../api/Books/getBook";


export const getBooksThunk = createAsyncThunk(
  "books/getBooksThunk",
  async (param, thunkApi) => {
    const { getState } = thunkApi;
    const { limit,offset} = getSlice(getState() as RootState);

    return getBooks({ limit, offset });
  }
);

export const searchBooksThunk = createAsyncThunk(
  "books/getBooksThunk",
  async (param, thunkApi) => {
    const { getState } = thunkApi;
    const { limit,offset,search} = getSlice(getState() as RootState);

    return getBooks({ limit, offset, search });
  }
);

export const getBookThunk = createAsyncThunk(
  "books/getBostThunk",
  (id: Book["isbn13"]) => getBook({ id })
);
