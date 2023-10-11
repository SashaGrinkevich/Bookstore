import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Book, getBook } from "../../api/Books/getBook";

import styles from "./Cart.module.css";
import BookCardPosts from "../BookCards/MediumCard/BookCard";
import BreadCrumbs, { BreadCrumb } from "../BreadCrumbs/BreadCrumbs";
import { useSelector, useDispatch } from "react-redux";
import { setIsBookCardLoading, setBook } from "../../store/books/bookscards.reducer";
import { getSlice } from "../../store/books/bookscards.selectors";
import Typography from "../Typography/Typography";

const Cart: React.FC = () => {
  const { id: bookId } = useParams();

  const { book, isBookLoading: loading } = useSelector(getSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!bookId) return;
    dispatch(setIsBookCardLoading(true));

    getBook({ id: bookId })
      .then((data) => {
        dispatch(setBook(data));
      })
      .finally(() => {
        dispatch(setIsBookCardLoading(false));
      });
  }, [dispatch, bookId]);

  const breadcrumbs: BreadCrumb[] = [
    {
      link: "/",
      label: "Home",
    },
  ];
  // const { book,books, isBookLoading: loading } = useSelector(getSlice);
  return (
    <div>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      {loading && "Loading"}

      {book && (
        <>
          <div className={styles.cardWrapper}>
            <Typography className={styles.title} variant="h2">
              {book.title}
            </Typography>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
