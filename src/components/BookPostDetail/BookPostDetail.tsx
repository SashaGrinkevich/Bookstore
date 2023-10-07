import { useParams } from "react-router-dom";
import BreadCrumbs, { BreadCrumb } from "../BreadCrumbs/BreadCrumbs";
import Typography from "../Typography/Typography";
import {  getBook } from "../../api/Books/getBook";
import styles from "./BookPostDetail.module.css";
import Button from "../Button/Button";
import { useEffect } from "react";
import { getSlice } from "../../store/books/bookscards.selectors";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsBookCardLoading,
  setBook,
} from "../../store/books/bookscards.reducer";

const BookPostDetail: React.FC = () => {
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
  }, [dispatch,bookId]);

  const breadcrumbs: BreadCrumb[] = [
    {
      link: "/",
      label: "Home",
    },
    {
      link: `/books/${bookId}`,
      label: `Book ${bookId}`,
    },
  ];

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
            <div className={styles.content}>
              <div>
                <img className={styles.img} src={book.image} alt={book.title} />
              </div>
              <div className={styles.description}>
                <Typography
                  variant="h3"
                  color="primary"
                  className={styles.price}
                >
                  {book.price}
                </Typography>
                <div className={styles.rating}></div>
              </div>
              <div className={styles.info}>
                <Typography
                  variant="h3"
                  color="primary"
                  className={styles.authors}
                >
                  {book.authors}
                </Typography>

                <Typography
                  variant="h3"
                  color="primary"
                  className={styles.publisher}
                >
                  {book.publisher}
                </Typography>
              </div>
              <div className={styles.button}>
                <Button>Add to cart</Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default BookPostDetail;
