import React from "react";
import styles from "./BookCard.module.css";
import { Book } from "../../../api/Books/getBook";
import Typography from "../../Typography/Typography";
import Rating from "../../Icon/icons/Rating.svg"

export interface BookCard {
  book: Book;
}
const BookCardPosts: React.FC<BookCard> = ({ book }) => {
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
            <div className={styles.rating}>
              <img src={Rating} alt="Rating" />
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};
export default BookCardPosts;
