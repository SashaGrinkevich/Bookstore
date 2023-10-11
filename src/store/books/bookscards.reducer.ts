import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Book } from "../../api/Books/getBook";

interface BooksCardsState {
  [x: string]: any;
  isBooksLoading: boolean;
  books: Book[];

  favoriteBooks: Book[];

  isBookLoading: boolean;
  book: Book | null;

  // limit: number;
  // offset: number;
}

const initialState: BooksCardsState = {
  isBooksLoading: false,
  books: [],

  favoriteBooks:[],

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
      state.books = action.payload.map((book)=>({
        ...book,
        isFavorite:false
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
    toggleBookIsCart: (state, action: PayloadAction<Book["isbn13"]>) => {
      const book = state.books.find((book) => book.isbn13 === action.payload);

      if (book) {
        book.isCart = !book.isCart;
      }
    },
    setFavorites : (state,action: PayloadAction<Book[]>) =>{
      state.favoriteBooks= action.payload;
    }
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
} = booksCardsSlice.actions;

export default booksCardsSlice.reducer;
