import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Typography from "../Typography/Typography";
import styles from "./Main.module.css";
import { getSlice } from "../../store/books/bookscards.selectors";
import { AppDispatch } from "../../store";
import {
  getBooksThunk,
  getSearchBooksThunk,
} from "../../store/books/books.actions";
import Subscribe from "../Subscribe/Subscribe";
import Pagination from "../Pagination/Pagination";
import { setActivePage } from "../../store/books/bookscards.reducer";
import AllBooks from "../AllBooks/AllBooks";

const Main: React.FC = () => {
  const { books,
    isBooksLoading: loading,
    isSearchBooksLoading: searchLoading,
    search ,
    total,
    activePage,
    searchBooks,
  } = useSelector(getSlice);
  const dispatch = useDispatch<AppDispatch>();

   useEffect(() => {
    dispatch(getBooksThunk());
  }, [dispatch]);

  const handlePaginationClick = (page: number) => {
    dispatch(setActivePage(page));
  };
  useEffect(() => {
    dispatch(
      getSearchBooksThunk({ search: search, page: String(activePage) })
    );
  }, [dispatch,activePage]);

  return (
    <>
      {search === "" && (
        <div>
          <div className={styles.title}>
            <Typography variant="h1">
              NEW RELEASES BOOKS
            </Typography>
          </div>

          <div className={styles.books}>
            {loading && "Loading"}
            {!loading && books.length > 0 && <AllBooks books={books} />}
          </div>
          <div className={styles.subscribeWrapper}>
            <Subscribe />
          </div>
        </div>
      )}
      :
      {search !== "" && (
        <div>
          {searchLoading && "Loading"}
          {!searchLoading && searchBooks.length > 0 && (
            <>
              <div className={styles.title}>
                <Typography
                  className={styles.searchResultText}
                  variant="h1"
                >{`'${search}' SEARCH RESULTS`}</Typography>
                <Typography
                  variant="span"
                  color="secondary"
                >
                  {`found ${total} books`}
                </Typography>
              </div>
              <AllBooks books={searchBooks} />
              <div className={styles.pagination}>
                <Pagination
                  onClick={handlePaginationClick}
                  total={Math.ceil(+total / 10)}
                />
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};


export default Main;
