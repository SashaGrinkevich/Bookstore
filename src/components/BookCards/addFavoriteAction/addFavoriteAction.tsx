import React from "react";
import { useDispatch } from "react-redux";

import styles from "./addFavoriteAction.module.css";
import Button from "../../Button/Button";
import Icon from "../../Icon/Icon";
import { Book } from "../../../api/Books/getBook";
import {
  toggleBookIsFavorite,
} from "../../../store/books/bookscards.reducer";

interface FavoriteActionsProps {
  book: Book;
}

const FavoriteActions: React.FC<FavoriteActionsProps> = ({ book }) => {
  const dispatch = useDispatch();

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (book?.isbn13 !== undefined) {
      dispatch(toggleBookIsFavorite(book.isbn13));
    }
  };
  return (
    <div className={styles.actions}>
      <div className={styles.buttonsWrap}></div>
      <div className={styles.buttonsWrap}>
        <Button variant="icon" onClick={handleBookmarkClick}>
          <Icon type="bookmark" />
        </Button>
      </div>
    </div>
  );
};

export default FavoriteActions;
