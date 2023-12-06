import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./FavoriteBookCard.module.css";
import { getSlice } from "../../store/books/bookscards.selectors";
import Typography from "../Typography/Typography";
import { Book } from "../../api/Books/getBook";
import {
  setFavorite,
  toggleBookIsFavorite,
} from "../../store/books/bookscards.reducer";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import { NavLink } from "react-router-dom";
import Rating from "../Icon/icons/Rating.svg";

export interface FavoritesBookCardProps {
  book: Book;
}

const FavoritesBookCard: React.FC<FavoritesBookCardProps> = ({ book }) => {
  const dispatch = useDispatch();
  const favoriteBooks = useSelector(getSlice);

  useEffect(() => {
    if (favoriteBooks.favoriteBooks.length > 0) {
      localStorage.setItem(
        "favorites",
        JSON.stringify(favoriteBooks.favoriteBooks)
      );
    }
  }, [favoriteBooks.favoriteBooks]);

  useEffect(() => {
    const favBookInLocalStorage = localStorage.getItem("favorites");
    if (favBookInLocalStorage) {
      dispatch(setFavorite(JSON.parse(favBookInLocalStorage)));
    }
  }, [dispatch]);

  const handleRemoveClick = () => {
    if (book) {
      dispatch(toggleBookIsFavorite(book));
    }
  };

  return (
    <div className={styles.wrapperFavorite}>
      <div className={styles.card}>
        <div className={styles.imgWrapper}>
          <NavLink
            to={`/books/${book.isbn13}`}
            style={{ textDecoration: "none" }}
          >
            <img src={book.image} alt={book.title} className={styles.image} />
          </NavLink>
        </div>

        <div className={styles.description}>
          <NavLink
            to={`/books/${book.isbn13}`}
            style={{ textDecoration: "none" }}
          >
            <div className={styles.title}>
              <Typography variant="h3" color="primary">
                {book.title}
              </Typography>
            </div>
          </NavLink>
          <div className={styles.subtitle}>
            <Typography variant="span" color="secondary">
              by
            </Typography>
            <Typography variant="span" color="secondary">
              {book.authors},
            </Typography>
            <Typography variant="span" color="secondary">
              {book.publisher}
            </Typography>
            <Typography variant="span" color="secondary">
              {book.year}
            </Typography>
          </div>
          <div className={styles.info}>
            <Typography variant="h3" color="primary" className={styles.price}>
              {book.price}
            </Typography>
              <img src={Rating} alt="rating" className={styles.rating} />
          </div>
        </div>
        <div className={styles.remove}>
          <Button
            type="button"
            className={styles.btnRemove}
            onClick={handleRemoveClick}
          >
            <Icon type={"bookmark"} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FavoritesBookCard;
