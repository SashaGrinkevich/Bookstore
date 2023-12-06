import React, { useEffect } from "react";
import { getSlice } from "../../store/books/bookscards.selectors";
import { Book } from "../../api/Books/getBook";
import BreadCrumbs, { BreadCrumb } from "../BreadCrumbs/BreadCrumbs";
import { useDispatch, useSelector } from "react-redux";
import Typography from "../Typography/Typography";
import CartBook from "../CartDetail/CartDetail";
import { setCart } from "../../store/books/bookscards.reducer";

import styles from "./Cart.module.css";
import TotalPrice from "../TotalPrice/TotalPrice";

interface CartBook {}

const Cart: React.FC<CartBook> = () => {
  const { isBookLoading: loading } = useSelector(getSlice);
  const cartBook = useSelector(getSlice);

  const dispatch = useDispatch();
  useEffect(() => {
    const cartInLocalStorage = localStorage.getItem("cart");
    if (cartInLocalStorage) {
      dispatch(setCart(JSON.parse(cartInLocalStorage)));
    }
  }, [dispatch]);

  const totalPrice = cartBook.cartBook.reduce((acc, book) => {
    const bookOnePrice = +book.price.slice(1);
    return acc + bookOnePrice * book.count;
  }, 0);
  const cartEmpty: BreadCrumb[] = [
    {
      link: "/",
      label: "Home",
    },
  ];
  if (cartBook.cartBook.length === 0) {
    return (
      <div>
         <BreadCrumbs breadcrumbs={cartEmpty} />
        <>
          <Typography variant="h2" color="primary">
            "EMPTY"
          </Typography>
        </>
      </div>
    );
  }
  const breadcrumbs: BreadCrumb[] = [
    {
      link: "/",
      label: "Home",
    },
  ];
  return (
    <div>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      {loading && (
        <>
          <Typography variant="h1" color="primary">
            YOUR CART
          </Typography>
          <div>
            <ul className={styles.mediumPosts}>
              {cartBook.cartBook.map((book: Book) => (
                <li className={styles.cardlist} key={book.isbn13}>
                  <CartBook book={book} />
                </li>
              ))}
            </ul>
            <div className={styles.total}>
              <TotalPrice sumTotalPrice={+totalPrice} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
