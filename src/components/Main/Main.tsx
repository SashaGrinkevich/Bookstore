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
  const {
    books,
    isBooksLoading: loading,
    isSearchBooksLoading: searchLoading,
    search,
    total,
    searchBooks,
    limit,
    offset,
    page,
  } = useSelector(getSlice);
  const dispatch = useDispatch<AppDispatch>();

  const handlePaginationClick = (page: number) => {
    dispatch(setActivePage(page));
    dispatch(getBooksThunk());
  };

  useEffect(() => {
    if (search.length > 0) {
      dispatch(getSearchBooksThunk());
    } else {
      dispatch(getBooksThunk());
    }
  }, [dispatch, search, limit, offset,page]);

  return (
    <div>
      {search === "" && (
        <>
          <div className={styles.title}>
            <Typography variant="h1">NEW RELEASES BOOKS</Typography>
            <div className={styles.books}>
              {loading && "Loading"}

              {!loading && books.length > 0 && <AllBooks books={books} />}
            </div>
            <div className={styles.subscribeWrapper}>
              <Subscribe />
            </div>
          </div>
        </>
      )}
      {
        <div>
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
                    <Typography variant="span" color="secondary">
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
                  <div className={styles.subscribeWrapper}>
                    <Subscribe />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      }
    </div>
  );
};
export default Main;
