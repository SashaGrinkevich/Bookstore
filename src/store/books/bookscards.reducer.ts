import {
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
  
  isBooksLoading: boolean;
  books: Book[];

  favoriteBooks: Book[];
  cartBook: Book[];

  isBookLoading: boolean;
  book: Book | null;

  total:string;
  search: string;
  searchBooks: Book[];
  page: number;
  isSearchBooksLoading: boolean;
 
  activePage: number;
}

const initialState: BooksCardsState = {
  isBooksLoading: false,
  books: [],

  favoriteBooks: [],
  cartBook: [],

  isBookLoading: false,
  book: null,

  total: "",
  search: "",
  searchBooks: [],
  page: 1,
  isSearchBooksLoading: false,

  activePage: 1,
};

const booksCardsSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setActivePage: (state, action: PayloadAction<number>) => {
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
      state.searchBooks = action.payload.books;
      state.total = action.payload.total;
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
  setActivePage
} = booksCardsSlice.actions;

export default booksCardsSlice.reducer;
