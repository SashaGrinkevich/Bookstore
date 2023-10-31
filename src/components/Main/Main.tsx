import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Typography from "../Typography/Typography";
import styles from "./Main.module.css";
import { NavLink } from "react-router-dom";
import BookCardPosts from "../BookCards/MediumCard/BookCard";
import { getSlice } from "../../store/books/bookscards.selectors";
import { AppDispatch } from "../../store";
import {
  getBooksThunk,
  getSearchBooksThunk,
} from "../../store/books/books.actions";
import Subscribe from "../Subscribe/Subscribe";

const Main: React.FC = () => {
  const { books, isBooksLoading: loading, search } = useSelector(getSlice);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (search.length > 0) {
      dispatch(getSearchBooksThunk());
    } else {
      dispatch(getBooksThunk());
    }
  }, [dispatch, search]);

  return (
    <div>
      {!search ? (
        <>
          <Typography
            className={styles.wrapperMain}
            variant="h1"
            color="primary"
          >
            New Releases Books
          </Typography>
          <ul className={styles.listBookCards}>
            {books.map((book) => (
              <li className={styles.listBookCard} key={book.isbn13}>
                <NavLink
                  to={`/books/${book.isbn13}`}
                  style={{ textDecoration: "none" }}
                >
                  <BookCardPosts book={book} />
                </NavLink>
              </li>
            ))}
          </ul>
          <div>
           {/* <Pagination pages={Math.ceil(count / limit)} /> */}
        </div>
          <div>
            <Subscribe />
          </div>
        </>
      ) : (
        <>
          <Typography
            className={styles.title_page}
            variant="h1"
            color="primary"
          >
            Search results: "{search}"
          </Typography>
          <ul className={styles.listBookCards}>
            {books.map((book) => (
              <li className={styles.listBookCard} key={book.isbn13}>
                <NavLink
                  to={`/books/${book.isbn13}`}
                  style={{ textDecoration: "none" }}
                >
                  <BookCardPosts book={book} />
                </NavLink>
              </li>
            ))}
          </ul>
          <div>
            <Subscribe />
          </div>
        </>
      )}
    </div>
  );
};

export default Main;
