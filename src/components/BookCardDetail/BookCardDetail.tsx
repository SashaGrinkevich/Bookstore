import { useParams } from "react-router-dom";
import { getBook } from "../../api/Books/getBook";
import BreadCrumbs, { BreadCrumb } from "../BreadCrumbs/BreadCrumbs";
import { useEffect, useState } from "react";
import { getSlice } from "../../store/books/bookscards.selectors";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsBookCardLoading,
  setBook,
  toggleBookIsFavorite,
} from "../../store/books/bookscards.reducer";
import BookCardActions from "../BookCards/BookCardAction/BookCardActions";

import Typography from "../Typography/Typography";
import Button from "../Button/Button";
import Subscribe from "../Subscribe/Subscribe";
import Tabs, { Tab } from "../Tabs/Tabs";
import Favorite from "../../components/Icon/icons/Favorite.svg";
import Rating from "../Icon/icons/Rating.svg";

import styles from "./BookCardDetail.module.css";
const tabs: Tab[] = [
  {
    label: "Description",
    value: "description",
  },
  { label: "Authors", value: "authors" },
  { label: "Reviews", value: "reviews" },
];

const BookPostDetail: React.FC = () => {
  const { id: bookId } = useParams();
  const { book, isBookLoading: loading, favoriteBooks } = useSelector(getSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoriteBooks));
  }, [favoriteBooks]);

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

  const [activeTab, setActiveTab] = useState(tabs[0].value);
  const handleChangeTab = (tab: Tab) => setActiveTab(tab.value);
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
                  
                  {/* <img src={Favorite} alt="logo" className={styles.imgFav} /> */}
                  <BookCardActions book={book} />
                </Button>
              </div>
              <div className={styles.content}>
                <div className={styles.description}>
                  <Typography
                    variant="h3"
                    color="primary"
                    className={styles.price}
                  >
                    {book.price}{" "}
                  </Typography>
                  <div className={styles.rating}>
                    <img src={Rating} alt="" />
                  </div>
                </div>
                <div className={styles.allInfo}>
                  <div className={styles.info1}>
                    <Typography
                      variant="p"
                      color="primary"
                      className={styles.author}
                      children={" Authors"}
                    />
                    <Typography
                      variant="p"
                      color="primary"
                      className={styles.publisher}
                      children={" Publisher"}
                    />
                    <Typography
                      variant="p"
                      color="primary"
                      className={styles.language}
                      children={" Language"}
                    />
                    <Typography
                      variant="p"
                      color="primary"
                      className={styles.format}
                      children={" Format"}
                    />
                  </div>
                  <div className={styles.info2}>
                    <Typography
                      variant="p"
                      color="primary"
                      className={styles.author}
                    >
                      {book.authors}
                    </Typography>
                    <Typography
                      variant="p"
                      color="primary"
                      className={styles.publisher}
                    >
                      {book.publisher}
                    </Typography>
                    <Typography
                      variant="p"
                      color="primary"
                      className={styles.language}
                      children={" English"}
                    />
                    <Typography
                      variant="p"
                      color="primary"
                      className={styles.format}
                      children={" Paper book / ebook (PDF)"}
                    />
                  </div>
                </div>
                <Typography variant="p" color="primary" className={styles.more}>
                  More details
                </Typography>
                <Button color="secondary" className={styles.buttonAddCart}>
                  Add to cart
                </Button>
                {!book.pdf && (
                  <div className={styles.previwBook}>
                    <a
                      style={{ textDecoration: "none" }}
                      href={
                        "https://itbook.store/files/9781617294136/chapter5.pdf"
                      }
                    >
                      <Typography
                        variant="p"
                        color="primary"
                        className={styles.preview}
                        children={"Preview book"}
                      />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.tabItem}>
            <Tabs
              className={styles.tabs}
              activeTab={activeTab}
              tabs={tabs}
              onTabClick={handleChangeTab}
            />
            {!loading && activeTab === "description" && (
              <Typography variant="p" children={book.desc} />
            )}
            {!loading && activeTab === "authors" && (
              <Typography variant="p" children={book.authors} />
            )}
            {!loading && activeTab === "reviews" && (
              <Typography variant="p" children={book.subtitle} />
            )}
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
