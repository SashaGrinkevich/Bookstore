import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Book } from "../../api/Books/getBook";

interface BooksCardsState {
  isBooksLoading: boolean;
  books: Book[];

  isBookLoading: boolean;
  book: Book | null;

  // limit: number;
  // offset: number;
}

const initialState: BooksCardsState = {
  isBooksLoading: false,
  books: [],

  isBookLoading: false,
  book: null,

  // limit: 12,
  // offset: 0,
};

const booksCardsSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setIsBooksCardsLoading: (state, action: PayloadAction<boolean>) => {
      state.isBooksLoading = action.payload;
    },
    setBooks: (state, action: PayloadAction<Book[]>) => {
      state.books = action.payload;
    },
    setIsBookCardLoading: (state, action: PayloadAction<boolean>) => {
      state.isBooksLoading = action.payload;
    },
    setBook: (state, action: PayloadAction<Book>) => {
      state.book = action.payload;
    },
  },
});

export const {
  setIsBooksCardsLoading,
  setBooks,
  setIsBookCardLoading,
  setBook,
} = booksCardsSlice.actions;

export default booksCardsSlice.reducer;