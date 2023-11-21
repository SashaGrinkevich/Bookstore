import { createAsyncThunk } from "@reduxjs/toolkit";
import { getBooks } from "../../api/Books/getBooks";
import { Book, getBook } from "../../api/Books/getBook";

import { RootState } from "..";
import { getSlice } from "./bookscards.selectors";
import { getBooksSearch } from "../../api/Books/getSearchBooks";



export const getBooksThunk = createAsyncThunk(
  "books/getBooksThunk",
  async () => {
    return getBooks();
  }
);


export const getBookThunk = createAsyncThunk(
  "books/getBookThunk",
  (id: Book["isbn13"]) => {
    return getBook({ id });
  }
);

// export const getSearchBooksThunk = createAsyncThunk(
//   "books/getSearchBookThunk",
//   async (param, thunkApi) => {
//     const { getState } = thunkApi;
//     const { page, search } = getSlice(getState() as RootState);

//     return getBooksSearch({ page, search });
//   }
// );
type GetBooksParams = {
  search: string;
  page: string;
};

export const getSearchBooksThunk = createAsyncThunk(
  "books/getSearchBooksThunk",
  async ({ search, page }: GetBooksParams) => {
    return getBooksSearch({ search, page });
  }
);