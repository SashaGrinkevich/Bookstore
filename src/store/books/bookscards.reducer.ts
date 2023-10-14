import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Book } from "../../api/Books/getBook";

interface BooksCardsState {
  [x: string]: any;
  isBooksLoading: boolean;
  books: Book[];

  favoriteBooks: Book[];
  cartBook: Book[];

  isBookLoading: boolean;
  book: Book | null;

  limit: number;
  offset: number;
  search: string;
  count: number;
}

const initialState: BooksCardsState = {
  isBooksLoading: false,
  books: [],

  favoriteBooks: [],
  cartBook: [],

  isBookLoading: false,
  book: null,

  limit: 12,
  offset: 0,
  search: "",
  count: 0,
};

const booksCardsSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    incOffset: (state) => {
      const nextOffset = state.offset + initialState.limit;
      if (nextOffset < state.count) {
        state.offset = nextOffset;
      } else {
        state.offset = state.count;
      }
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.limit = initialState.limit; // 12
      state.offset = initialState.offset; // 0
      state.books = initialState.books; // []
    },
    setIsBooksCardsLoading: (state, action: PayloadAction<boolean>) => {
      state.isBooksLoading = action.payload;
    },
    setBooks: (state, action: PayloadAction<Book[]>) => {
      state.books = action.payload.map((book) => ({
        ...book,
        isFavorite: false,
      }));
    },
    setIsBookCardLoading: (state, action: PayloadAction<boolean>) => {
      state.isBooksLoading = action.payload;
    },
    setBook: (state, action: PayloadAction<Book>) => {
      state.book = action.payload;
    },
    toggleBookIsFavorite: (state, action: PayloadAction<Book["isbn13"]>) => {
      const book = state.books.find((book) => book.isbn13 === action.payload);

      if (book) {
        state.favoriteBooks.push(book);
      }
    },
    setFavorites: (state, action: PayloadAction<Book[]>) => {
      state.favoriteBooks = action.payload;
    },
    setCart: (state, action: PayloadAction<Book[]>) => {
      state.cartBooks = action.payload;
    },
    toggleBookIsCart: (state, action: PayloadAction<Book["isbn13"]>) => {
      const book = state.books.find((book) => book.isbn13 === action.payload);
    
      if (book) {
        state.cartBook.push(book);
      }
    },
  },
});

export const {
  setIsBooksCardsLoading,
  setBooks,
  setIsBookCardLoading,
  setBook,
  toggleBookIsFavorite,
  setFavorites,
  toggleBookIsCart,
  setCart,
  setSearch,
  incOffset,
} = booksCardsSlice.actions;

export default booksCardsSlice.reducer;
