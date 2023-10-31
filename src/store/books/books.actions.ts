import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import { getBooks } from "../../api/Books/getBooks";
import { getSlice } from "./bookscards.selectors";
import { Book, getBook } from "../../api/Books/getBook";
import { getBooksSearch } from "../../api/Books/getSearchBooks";



export const getBooksThunk = createAsyncThunk(
  "books/getBooksThunk",
  async () => {
    // const { getState } = thunkApi;
    // const { limit,offset} = getSlice(getState() as RootState);

    return getBooks();
  }
);


export const getBookThunk = createAsyncThunk(
  "books/getBostThunk",
  (id: Book["isbn13"]) => getBook({ id })
);

export const getSearchBooksThunk = createAsyncThunk(
  "books/getSearchBookThunk",
  async (param, thunkApi) => {
    const { getState } = thunkApi;
    const { page, search } = getSlice(getState() as RootState);

    return getBooksSearch({ page, search });
  }
);