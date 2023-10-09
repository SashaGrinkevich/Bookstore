import { useParams } from "react-router-dom";
import BreadCrumbs, { BreadCrumb } from "../BreadCrumbs/BreadCrumbs";
import Typography from "../Typography/Typography";
import { getBook } from "../../api/Books/getBook";
import styles from "./BookCardDetail.module.css";
import Button from "../Button/Button";
import { useEffect, useState } from "react";
import { getSlice } from "../../store/books/bookscards.selectors";
import { useDispatch, useSelector } from "react-redux";
import {setIsBookCardLoading, setBook,} from "../../store/books/bookscards.reducer";
import Subscribe from "../Subscribe/Subscribe";
import Tabs, { Tab } from "../Tabs/Tabs";
import Favorite from "../../components/Icon/icons/Favorite.svg"
import Favorites from "../Favorites/Favorite";

const tabs: Tab[] = [
  {
    label: "Description",
    value: "description",
  },
  { label: "Authors", value: "authors" },
  {label:"Reviews", value:"reviews"},
];

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

  const [activeTab, setActiveTab] = useState(tabs[0].value);
  const handleChangeTab = (tab: Tab) => setActiveTab(tab.value);
  // const favoritesBooks = books.filter((book) => book.isFavorite);
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
                <Button variant="icon" className={styles.favButton}>
                    <img src={Favorite} alt="logo" className={styles.imgFav} />
                </Button>
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
          <div className={styles.tabItem}>
          <Tabs
          className={styles.tabs } activeTab={activeTab} tabs={tabs} onTabClick={handleChangeTab}
          /></div>
          <div>
            <Subscribe />
          </div>
          </>
      )}
    </div>
  );
};
export default BookPostDetail;
