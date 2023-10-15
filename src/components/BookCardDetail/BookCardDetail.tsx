import { useParams } from "react-router-dom";
import { getBook } from "../../api/Books/getBook";
import BreadCrumbs, { BreadCrumb } from "../BreadCrumbs/BreadCrumbs";
import { useEffect, useState } from "react";
import { getSlice } from "../../store/books/bookscards.selectors";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsBookCardLoading,
  setBook,
  toggleBookIsCart,
} from "../../store/books/bookscards.reducer";
import Typography from "../Typography/Typography";
import Button from "../Button/Button";
import Subscribe from "../Subscribe/Subscribe";
import Rating from "../Icon/icons/Rating.svg";
import styles from "./BookCardDetail.module.css";
import FavoriteActions from "../BookCards/addFavoriteAction/addFavoriteAction";
import CartActions from "../BookCards/addCartAction/addCartAction";
import { useDidUpdate } from "../../hooks/useDidUpdate";
import TabsCardDetail from "../TabsCardDetail/TabsCardDetail";

const BookPostDetail: React.FC = () => {
 
  const { id: bookId } = useParams();
  const { book, isBookLoading: loading, favoriteBooks,cartBook } = useSelector(getSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoriteBooks));
  }, [favoriteBooks]);

  useDidUpdate(() => {
    localStorage.setItem("cart", JSON.stringify(cartBook));
  }, [cartBook]);

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
                <Button variant="icon" className={styles.favButton} >
                  <FavoriteActions book={book} />
                </Button>
              </div>
              <div className={styles.content}>
                <div className={styles.description}>
                  <Typography variant="h3" color="primary" className={styles.price}>
                    {book.price}
                  </Typography>
                  <div className={styles.rating}>
                    <img src={Rating} alt="" />
                  </div>
                </div>
                <div className={styles.allInfo}>
                  <div className={styles.info1}>
                    <Typography variant="p" color="primary"className={styles.author} children={" Authors"}
                    />
                    <Typography variant="p" color="primary" className={styles.publisher} children={" Publisher"}
                    />
                    <Typography variant="p"color="primary" className={styles.language} children={" Language"}
                    />
                    <Typography variant="p" color="primary" className={styles.format} children={" Format"} 
                    />
                  </div>
                  <div className={styles.info2}>
                    <Typography variant="p"color="primary"className={styles.author}  
                    >
                      {book.authors}
                    </Typography>
                    <Typography variant="p" color="primary"className={styles.publisher} 
                    >
                      {book.publisher}
                    </Typography>
                    <Typography variant="p" color="primary"  className={styles.language}  children={" English"}
                    />
                    <Typography variant="p" color="primary" className={styles.format} children={" Paper book / ebook (PDF)"} 
                    />
                  </div>
                </div>
                <Typography variant="p" color="primary" className={styles.more}>
                  More details
                </Typography>
                <Button color="secondary" className={styles.buttonAddCart}>
                  <CartActions book={book}  />
                </Button>
                {!book.pdf && (
                  <div className={styles.previwBook}>
                    <a
                      style={{ textDecoration: "none" }}
                      href={
                        "https://itbook.store/files/9781617294136/chapter5.pdf"
                      }
                    >
                      <Typography variant="p" color="primary" className={styles.preview} children={"Preview book"} 
                      />
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
          <div></div>
        </>
      )}
    </div>
  );
};
export default BookPostDetail;
