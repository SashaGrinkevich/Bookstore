import { useParams } from "react-router-dom";
import { getBook } from "../../api/Books/getBook";
import BreadCrumbs, { BreadCrumb } from "../BreadCrumbs/BreadCrumbs";
import { useEffect } from "react";
import { getSlice } from "../../store/books/bookscards.selectors";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsBookCardLoading,
  setBook,
} from "../../store/books/bookscards.reducer";
import Typography from "../Typography/Typography";
import Button from "../Button/Button";
import Subscribe from "../Subscribe/Subscribe";
import Rating from "../Icon/icons/Rating.svg";
import styles from "./BookCardDetail.module.css";
import FavoriteActions from "../BookCards/addFavoriteAction/addFavoriteAction";
import CartActions from "../BookCards/addCartAction/addCartAction";
import TabsCardDetail from "../TabsCardDetail/TabsCardDetail";

const BookPostDetail: React.FC = () => {
  const { id: bookId } = useParams();
  const { book } = useSelector(getSlice);
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

  return (
    <div>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      {book && (
        <>
          <div >
            <Typography  variant="h2">
              {book.title}
            </Typography>
            <div className={styles.card}>
              <div className={styles.imgWrapper}>
                <img className={styles.img} src={book.image} alt={book.title} />
                <Button variant="icon" className={styles.favButton}>
                  <FavoriteActions book={book} />
                </Button>
              </div>
              <div className={styles.content}>
                <div className={styles.description}>
                  <Typography variant="h3" color="primary"
                    className={styles.price}
                  >
                    {book.price}
                  </Typography>
                  <div className={styles.rating}>
                    <img src={Rating} alt="" />
                  </div>
                </div>
                <div className={styles.allInfo}>
                  <div className={styles.textWrap}>
                    <Typography variant="p" color="secondary">
                      Authors
                    </Typography>
                    <Typography variant="p" color="primary">
                      {book.authors}
                    </Typography>
                  </div>
                  <div className={styles.textWrap}>
                    <Typography variant="p" color="secondary">
                      Publisher
                    </Typography>
                    <Typography variant="p" color="primary">
                      {book.publisher}
                    </Typography>
                  </div>
                  <div className={styles.textWrap}>
                    <Typography variant="p" color="secondary">
                      Language
                    </Typography>
                    <Typography variant="p" color="primary">
                      English
                    </Typography>
                  </div>
                  <div className={styles.textWrap}>
                    <Typography variant="p" color="secondary">
                      Format
                    </Typography>
                    <Typography variant="p" color="primary">
                      Paper book / ebook (PDF)
                    </Typography>
                  </div>
                </div>
                <Typography variant="p" color="primary" className={styles.more}>
                  More details
                </Typography>
                <Button color="secondary" className={styles.buttonAddCart}>
                  <CartActions book={book} />
                </Button>
                {!book.pdf && (
                  <div className={styles.previwBook}>
                    <a
                      style={{ textDecoration: "none" }}
                      href={"https://itbook.store/files/9781617294136/chapter5.pdf"}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Typography variant="p" color="primary" className={styles.preview}
                      > Preview book
                      </Typography>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.tabItem}>
            <TabsCardDetail book={book} />
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
