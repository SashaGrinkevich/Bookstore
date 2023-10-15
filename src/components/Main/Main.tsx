import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Subscribe from "../Subscribe/Subscribe";
import Typography from "../Typography/Typography";
import styles from "./Main.module.css";
import { getBooks } from "../../api/Books/getBooks";
import { NavLink } from "react-router-dom";
import BookCardPosts from "../BookCards/MediumCard/BookCard";
import { getSlice } from "../../store/books/bookscards.selectors";
import {
  setIsBooksCardsLoading,
  setBooks,
  incOffset,
} from "../../store/books/bookscards.reducer";
import Pagination from "../Pagination/Pagination";
import { AppDispatch } from "../../store";
import { searchBooksThunk } from "../../store/books/books.actions";

const Main: React.FC = () => {
  const {
    books,
    isBooksLoading: loading,
    count,
    limit,
    offset,
    search,
  } = useSelector(getSlice);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (search.length > 0) {
      dispatch(searchBooksThunk)
    } else {
      dispatch(searchBooksThunk());
    }
  }, [dispatch, search, limit, offset]);



  useEffect(() => {
    dispatch(setIsBooksCardsLoading(true));

    getBooks({ limit, offset, search })
      .then((data) => {
        dispatch(setBooks(data));
      })
      .finally(() => {
        dispatch(setIsBooksCardsLoading(false));
      });
  }, [dispatch]);

  // const handleIncOffset = () => {
  //   dispatch(incOffset());
  // };
  return (
    <>
      {loading && "Loading"}

      {!loading && books.length > 0 && (
        <>
          <div className={styles.wrapperMain}>
            <Typography variant="h1" font="Bebas Neue" className={styles.title}>
              New Releases Books
            </Typography>
          </div>
          <div>
            <ul className={styles.listBookCards}>
              {books.map((book) => (
                <li className={styles.listBookCard} key={book.isbn13}>
                  <NavLink
                    style={{ textDecoration: "none" }}
                    to={`/books/${book.isbn13}`}
                  >
                    <BookCardPosts book={book} />
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Pagination total={Math.ceil(count / limit)} />
          </div>
          <div>
            <Subscribe />
          </div>
        </>
      )}
    </>
  );
};

export default Main;

