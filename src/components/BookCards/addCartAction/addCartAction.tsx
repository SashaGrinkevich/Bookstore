import React from "react";
import { useDispatch } from "react-redux";
import styles from "./addCartAction.module.css";
import Button from "../../Button/Button";
import { Book } from "../../../api/Books/getBook";
import { toggleBookIsCart } from "../../../store/books/bookscards.reducer";

interface CartActionsProps {
  book: Book;
}

const CartActions: React.FC<CartActionsProps> = ({ book }) => {
  const dispatch = useDispatch();

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (book?.isbn13 !== undefined) {
      dispatch(toggleBookIsCart(book.isbn13));
    }
  };

  return (
    <div className={styles.actions}>
        <div className={styles.buttonsWrap}>
          <Button variant="standard" className={styles.buttonAddCart} onClick={handleCartClick}>
            ADD TO CART
          </Button>
        </div>
    </div>
  );
};

export default CartActions;
