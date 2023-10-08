import { useParams } from "react-router-dom";
import BreadCrumbs, { BreadCrumb } from "../BreadCrumbs/BreadCrumbs";
import Typography from "../Typography/Typography";
import { getBook } from "../../api/Books/getBook";
import styles from "./BookPostDetail.module.css";
import Button from "../Button/Button";
import { useEffect } from "react";
import { getSlice } from "../../store/books/bookscards.selectors";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsBookCardLoading,
  setBook,
} from "../../store/books/bookscards.reducer";
import Subscribe from "../Subscribe/Subscribe";

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
  }, [dispatch, bookId]);

  const breadcrumbs: BreadCrumb[] = [
    {
      link: "/",
      label: "Home",
    },
    // {
    //   link: `/books/${bookId}`,
    //   label: `Book ${bookId}`,
    // },
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
            <div className={styles.card}>
              <div className={styles.imgWrapper}>
                <img className={styles.img} src={book.image} alt={book.title} />
              </div>
              <div className={styles.content}>
                <div className={styles.description}>
                  <Typography
                    variant="h3"
                    color="primary"
                    className={styles.price}
                  >
                    {book.price}
                  </Typography>
                  <div className={styles.rating}>Rating</div>
                </div>
                <div className={styles.allInfo}>
                  <div className={styles.info1}>
                    <Typography variant="p" color="primary" className={styles.author}>
                      Authors
                    </Typography> 
                    <Typography variant="p" color="primary" className={styles.publisher} 
                    >
                      Publisher
                    </Typography>
                    <Typography variant="p" color="primary" className={styles.language}  
                    >
                      Language
                    </Typography>
                    <Typography variant="p" color="primary" className={styles.format}
                    >
                      Format
                    </Typography>
                  </div>
                  <div className={styles.info2}>
                    <Typography variant="p" color="primary" className={styles.author} 
                    >
                      {book.authors}
                    </Typography>
                    <Typography variant="p" color="primary" className={styles.publisher}  
                    >
                      {book.publisher}
                    </Typography>
                    <Typography variant="p" color="primary" className={styles.language}
                    >
                      English
                    </Typography>
                    <Typography variant="p" color="primary" className={styles.format}
                    >
                      Paper book / ebook (PDF)
                    </Typography>
                  </div>
                </div>
                <Typography variant="p" color="primary" className={styles.more}>
                  More detailse
                </Typography>
                <Button color="secondary" className={styles.buttonAddCart}>
                  Add to cart
                </Button>
                <Typography variant="p" color="primary" className={styles.preview}  
                >
                  Preview book
                </Typography>
              </div>
            </div>
          </div>
          <div>
            <Subscribe />
          </div>
        </>
      )}
    </div>
  );
};
export default BookPostDetail;
