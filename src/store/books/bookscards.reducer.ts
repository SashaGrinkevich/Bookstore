import {
  ActionReducerMapBuilder,
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";
import { Book } from "../../api/Books/getBook";
import {
  getBookThunk,
  getBooksThunk,
  getSearchBooksThunk,
} from "./books.actions";

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
  page: number;
  isSearchBooksLoading: boolean;
  searchedTotal: string;
}

const initialState: BooksCardsState = {
  isBooksLoading: false,
  books: [],

  favoriteBooks: [],
  cartBook: [],

  isBookLoading: false,
  book: null,

  limit: 10,
  offset: 0,

  search: "",
  page: 1,
  isSearchBooksLoading: false,
  searchedTotal: "",
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
      state.limit = initialState.limit; // 10
      state.offset = initialState.offset; // 0
      // state.books = initialState.books; // []
    },
    setIsBooksCardsLoading: (state, action: PayloadAction<boolean>) => {
      state.isBooksLoading = action.payload;
    },
    setIsBookCardLoading: (state, action: PayloadAction<boolean>) => {
      state.isBooksLoading = action.payload;
    },
    setBook: (state, action: PayloadAction<Book>) => {
      state.book = action.payload;
    },
    setBooks: (state, action: PayloadAction<Book[]>) => {
      state.books = action.payload.map((book) => ({
        ...book,
        isFavorite: false,
      }));
    },
    toggleBookIsFavorite: (state, action: PayloadAction<Book["isbn13"]>) => {
      const book = state.books.find((book) => book.isbn13 === action.payload);
      if (book) {
        state.favoriteBooks.push(book);
      }
    },
    setFavorite: (state, action: PayloadAction<Book[]>) => {
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

  extraReducers(builder) {
    builder.addCase(getBooksThunk.pending, (state) => {
      state.isBookLoading = true;
    });
    builder.addCase(getBooksThunk.fulfilled, (state, action) => {
      state.isBooksLoading = false;
      state.books = action.payload;
    });
    builder.addCase(getBookThunk.pending, (state) => {
      state.isBookLoading = true;
    });
    builder.addCase(getBookThunk.fulfilled, (state, action) => {
      state.isBookLoading = false;
      state.book = action.payload;
    });

    builder.addCase(getSearchBooksThunk.pending, (state) => {
      state.isSearchBooksLoading = true;
    });
    builder.addCase(getSearchBooksThunk.fulfilled, (state, action) => {
      state.isSearchBooksLoading = false;
      state.books = action.payload.books;
    });
  },
});

export const {
  setIsBooksCardsLoading,
  setBooks,
  setIsBookCardLoading,
  setBook,
  toggleBookIsFavorite,
  setFavorite,
  toggleBookIsCart,
  setCart,
  setSearch,
} = booksCardsSlice.actions;

export default booksCardsSlice.reducer;
