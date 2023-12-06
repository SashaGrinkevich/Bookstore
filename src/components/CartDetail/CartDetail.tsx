import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSlice } from "../../store/books/bookscards.selectors";
import Typography from "../Typography/Typography";
import styles from "./CartDetail.module.css";
import { Book } from "../../api/Books/getBook";
import {
  increaseInCart,
  removeFromCart,
  setCart,
  toggleBookIsCart,
} from "../../store/books/bookscards.reducer";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";

interface CartBooksProps {
  book: Book;
};

export const CartBook: React.FC<CartBooksProps> = ({ book }) => {
  const dispatch = useDispatch();
  const cartBook = useSelector(getSlice);
  const [active, setActive] = useState(false);

  const handlePlusClick = () => {
    dispatch(increaseInCart(book));
  };

  const handleMinusClick = () => {
    dispatch(removeFromCart(book));
  };

  const handleRemoveClick = () => {
    if (book) {
      dispatch(toggleBookIsCart(book));
      setActive(!active);
    }
  };

  useEffect(() => {
    if (cartBook.cartBook.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartBook.cartBook));
    }
  }, [cartBook.cartBook]);

  useEffect(() => {
    const cartInLocalStorage = localStorage.getItem("cart");
    if (cartInLocalStorage) {
      dispatch(setCart(JSON.parse(cartInLocalStorage)));
    }
  }, [dispatch]);

  return (
    <>
      <div className={styles.wrapperCart}>
        <div className={styles.cart}>
          <div className={styles.imgWrapper}>
            <img className={styles.img} src={book.image} alt={book.title} />
          </div>
          <div className={styles.info}>
            <div className={styles.book_info}>
              <div className={styles.title}>
                <Typography variant="h3" color="primary">
                  {book.title}
                </Typography>
              </div>
              <div className={styles.other}>
                <Typography variant="span" color="secondary">
                  by
                </Typography>
                <Typography variant="span" color="secondary">
                  {book.subtitle},
                </Typography>
                <Typography variant="span" color="secondary">
                  {book.publisher}
                </Typography>
                <Typography variant="span" color="secondary">
                  {book.year}
                </Typography>
              </div>
            </div>
            <div className={styles.pagination}>
              <Button className={styles.minus} onClick={handleMinusClick}>
                <Icon type={"minus"} />
              </Button>
              <span className={styles.quantity}>
                <Typography variant="h3" color="primary">
                  {book.count}
                </Typography>
              </span>
              <Button className={styles.plus} onClick={handlePlusClick}>
                <Icon type={"plus"} />
              </Button>
            </div>
          </div>
          <div className={styles.price}>
            <Typography variant="h2" color="primary">
              {`${(Number(book.price.slice(1)) * book.count).toFixed(2)}`}
            </Typography>
          </div>
          <div className={styles.remove}>
            <Button
              type="button"
              className={styles.btn_renove}
              onClick={handleRemoveClick}
            >
              {!active ? (
                <Icon type={"cansel"} />
              ) : (
                <Icon type={"cancelActive"} />
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartBook;
