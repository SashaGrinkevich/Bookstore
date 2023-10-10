import React, { useEffect } from "react";
import {  useParams } from "react-router-dom";
import {  getBook } from "../../api/Books/getBook";

import styles from "./Favorite.module.css";
import BreadCrumbs, { BreadCrumb } from "../BreadCrumbs/BreadCrumbs";
import { useDispatch, useSelector } from "react-redux";
import { getSlice } from "../../store/books/bookscards.selectors";
import {
  setIsBookCardLoading,
  setBook,
} from "../../store/books/bookscards.reducer";
import Typography from "../Typography/Typography";


const Favorite: React.FC = () => {
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

export default Favorite;
