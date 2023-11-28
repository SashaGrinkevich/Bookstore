import React from "react";
import { Book } from "../../api/Books/getBook";
import { NavLink } from "react-router-dom";
import styles from './AllBooks.module.css'
import BookCard from "../BookCards/MediumCard/BookCard";

interface NewReleasesBookProps {
  books: Book[];
}

const AllBooks: React.FC<NewReleasesBookProps> = ({ books }) => {
  return (
    <>
      <ul className={styles.listBookCards}>
        {books.map((book) => (
          <li className={styles.listBookCard} key={book.isbn13}>
            <NavLink
            className={styles.bookWrapper}
              to={`/books/${book.isbn13}`}
              style={{ textDecoration: "none" }}
            >
              <BookCard book={book} />
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AllBooks
