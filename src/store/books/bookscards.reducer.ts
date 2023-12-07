import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Book } from "../../api/Books/getBook";
import {getBookThunk,getBooksThunk,getSearchBooksThunk,
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

  activePage: number;

  limit: number;
  offset: number;
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
  activePage: 1,

  limit: 20,
  offset: 0,

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
      state.activePage = action.payload;
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
    toggleBookIsFavorite: (state, action: PayloadAction<Book>) => {
      const favoriteBookIndex = state.favoriteBooks.findIndex(
        (b) => b.isbn13 === action.payload.isbn13
      );
      if (favoriteBookIndex === -1) {
        state.favoriteBooks.push(action.payload);
      } else {
        state.favoriteBooks.splice(favoriteBookIndex, 1);
      }
    },
    setFavorite: (state, action: PayloadAction<Book[]>) => {
      state.favoriteBooks = action.payload;
    },
    toggleBookIsCart: (state, action: PayloadAction<Book>) => {
      const cartBookIndex = state.cartBook.findIndex(
        (book) => book.isbn13 === action.payload.isbn13
      );

      if (cartBookIndex === -1) {
        state.cartBook.push({ ...action.payload, count: 1 });
      } else {
        state.cartBook.splice(cartBookIndex, 1);
      }
    },
    setCart: (state, action: PayloadAction<Book[]>) => {
      state.cartBook = action.payload;
    },
    increaseInCart: (state, action: PayloadAction<Book>) => {
      const book = state.cartBook.find(
        (book) => book.isbn13 === action.payload.isbn13
      );

      if (book) {
        book.count += 1;
      }
    },
    removeFromCart: (state, action: PayloadAction<Book>) => {
      const book = state.cartBook.find(
        (book) => book.isbn13 === action.payload.isbn13
      );
      if (book) {
        if (book.count > 1) {
          book.count -= 1;
        }
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
  increaseInCart,
  removeFromCart,
  setSearch,
  setActivePage,
} = booksCardsSlice.actions;

export default booksCardsSlice.reducer;
