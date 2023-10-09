import React from "react";
import { NavLink } from "react-router-dom";
import { Book } from "../../api/Books/getBook";

import styles from "./Favorites.module.css";
import BookCardPosts from "../BookCards/MediumCard/BookCard";
import BreadCrumbs, { BreadCrumb } from "../BreadCrumbs/BreadCrumbs";
import { useSelector } from "react-redux";
import { getSlice } from "../../store/books/bookscards.selectors";

interface FavoritesProps {
  book: Book[];
}

const Favorites: React.FC<FavoritesProps> = ({ book }) => {

  // const { book,books, isBookLoading: loading } = useSelector(getSlice);
  const breadcrumbs: BreadCrumb[] = [
    {
      link: "/",
      label: "Home",
    },
  ]
  return (
    <div>
      {/* <BreadCrumbs breadcrumbs={breadcrumbs} />
      {loading && "Loading"} */}
      
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
