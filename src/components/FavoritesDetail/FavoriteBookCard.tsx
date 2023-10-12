import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./FavoriteBookCard.module.css";
import { getSlice } from "../../store/books/bookscards.selectors";
import Typography from "../Typography/Typography";
import { Book } from "../../api/Books/getBook";
import { setFavorites } from "../../store/books/bookscards.reducer";


export interface FavoritesBookCardProps {
  book: Book  ;
}

const FavoritesBookCard: React.FC<FavoritesBookCardProps> = ({ book }) => {
  const dispatch = useDispatch();
  const favoriteBooks = useSelector(getSlice);

  useEffect(() => {
    if (favoriteBooks.favoriteBook.length > 0) {
      localStorage.setItem(
        "favorites",
        JSON.stringify(favoriteBooks.favoriteBooks)
      );
    }
  }, [favoriteBooks.favoriteBooks]);

  useEffect(() => {
    const favBookInLocalStorage = localStorage.getItem("favorites");
    if (favBookInLocalStorage) {
      dispatch(setFavorites(JSON.parse(favBookInLocalStorage)));
    }
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.imgWrapper}>
          <img className={styles.img} src={book.image} alt={book.title} />
        </div>
        <div className={styles.description}>
          <Typography variant="h3" color="primary" className={styles.title}>
            {book.title}
          </Typography>
          <Typography
            variant="h5"
            color="secondary"
            className={styles.subtitle}
          >
            {book.subtitle}
          </Typography>
          <div className={styles.info}>
            <Typography variant="h3" color="primary" className={styles.price}>
              {book.price}
            </Typography>
            </div>
          </div>
        </div>
      </div>
      
  );
};

export default FavoritesBookCard;