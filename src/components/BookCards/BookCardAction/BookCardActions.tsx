import React from "react";
import { useDispatch } from "react-redux";

import styles from './BookCardActions.module.css';
import Button from "../../Button/Button";
import Icon from "../../Icon/Icon";
import { Book } from "../../../api/Books/getBook"; 
import {
  toggleBookIsCart,
  toggleBookIsFavorite,
} from "../../../store/books/bookscards.reducer";

interface BookActionsProps {
  book: Book;
}

const BookCardActions: React.FC<BookActionsProps> = ({ book }) => {
  const dispatch = useDispatch();


  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(toggleBookIsFavorite(book.isbn13));
  };
  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(toggleBookIsCart(book.isbn13));
  };

  return (
    <div className={styles.actions}>
      <div className={styles.buttonsWrap}>
      </div>
      <div className={styles.buttonsWrap}>
        <Button variant="icon" onClick={handleBookmarkClick}>
          <Icon
            type="bookmark"
          />
        </Button>
        <Button variant="standard" onClick={handleCartClick}/>
      </div>
    </div>
  );
};

export default BookCardActions;


