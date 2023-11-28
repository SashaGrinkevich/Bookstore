import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Book } from "../../api/Books/getBook";
import {
  getBookThunk,
  getBooksThunk,
  getSearchBooksThunk,
} from "./books.actions";

interface BooksCardsState {
  isBooksLoading: boolean;
  books: Book[];

  isBookLoading: boolean;
  book: Book | null;

  favoriteBooks: Book[];
  cartBook: Book[];

  
  total: string;
  search: string;
  searchBooks: Book[];
  page: string;
  isSearchBooksLoading: boolean;

  searchedTotal: string;

  activePage: number;

  limit: number;
  offset: number;

  showSearchResult: boolean;
}

const initialState: BooksCardsState = {
  isBooksLoading: false,
  books: [],

  isBookLoading: false,
  book: null,

  favoriteBooks: [],
  cartBook: [],

 
  total: "",
  search: "",
  searchBooks: [],
  page: "",
  isSearchBooksLoading: false,
  searchedTotal: "",
  activePage: 1,

  limit: 20,
  offset: 0,

  showSearchResult:true,
};

const booksCardsSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.searchBooks = initialState.searchBooks;
      state.limit = initialState.limit;
      state.offset = initialState.offset;
    },
    setActivePage: (state, action) => {
      state.page = action.payload;
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
    setBooks: (state, action) => {
      state.books = action.payload;
    },

    setSearchState: (state, action) => {
      state.showSearchResult = action.payload;
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
      state.cartBook = action.payload;
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
      state.books= action.payload.books

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
      state.searchBooks = action.payload.books;
      state.total = action.payload.total;
    });
  },
});

export const {
  setIsBooksCardsLoading,
  setIsBookCardLoading,
  setBooks,
  setBook,
  toggleBookIsFavorite,
  setFavorite,
  toggleBookIsCart,
  setCart,
  setSearch,
  setActivePage,
  setSearchState,
} = booksCardsSlice.actions;

export default booksCardsSlice.reducer;
