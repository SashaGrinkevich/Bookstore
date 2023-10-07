import { configureStore } from "@reduxjs/toolkit";
import bookcardReducer from "./books/bookscards.reducer";
import { type } from "os";

export const store = configureStore({
    reducer:{
        books: bookcardReducer
    },
});

export type RootState = ReturnType<typeof store.getState>