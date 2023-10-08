import React from "react";
import { NavLink } from "react-router-dom";
import { Book } from "../../api/Books/getBook";

import styles from "./Favorites.module.css";
import BookCardPosts from "../BookCards/MediumCard/BookCard";

interface FavoritesProps {
  books: Book[];
}

const Favorites: React.FC<FavoritesProps> = ({ books }) => {
  return (
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
  );
};

export default Favorites;
