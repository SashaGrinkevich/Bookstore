import React from "react";
import { NavLink } from "react-router-dom";
import { Book } from "../../api/Books/getBook";

import styles from "./Cart.module.css";
import BookCardPosts from "../BookCards/MediumCard/BookCard";
import { BreadCrumb } from "../BreadCrumbs/BreadCrumbs";

interface CartProps {
  book: Book[];
}

const Favorites: React.FC<CartProps> = ({ book }) => {
  const breadcrumbs: BreadCrumb[] = [
    {
      link: "/",
      label: "Home",
    },
  ]
  return (
    <div>
    <ul className={styles.listBookCards}>
      {book.map((book) => (
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