import { Middleware, configureStore } from "@reduxjs/toolkit";
import bookcardReducer from "./books/bookscards.reducer";

const logger: Middleware = (store) => (next) => (action) => {
    console.log("==============>", action);
    console.log("==============>", store.getState());
    // store.dispatch(action);
    next(action);
  };

export const store = configureStore({
    reducer:{
        books: bookcardReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;