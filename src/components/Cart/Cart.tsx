import React from "react";
import { Book } from "../../api/Books/getBook";
import styles from "./Cart.module.css";
import BreadCrumbs, { BreadCrumb } from "../BreadCrumbs/BreadCrumbs";
import { useSelector } from "react-redux";
import { getSlice } from "../../store/books/bookscards.selectors";
import Typography from "../Typography/Typography";
import CartBook from "../CartDetail/CartDetail";

interface CartBook { }

const Cart: React.FC<CartBook> = () => {
  const { isBookLoading: loading } = useSelector(getSlice);
  const cartBook = useSelector(getSlice);
  

  if (cartBook.cartBook.length === 0) {
    return (
      
      <>
      <Typography variant="h2" color="primary">
        "EMPTY"
      </Typography></>
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
      {loading && "Loading"}
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
        </div>
      </>
    </div>
  );
};

export default Cart;

