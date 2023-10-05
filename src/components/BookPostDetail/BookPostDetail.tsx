import { useParams } from "react-router-dom";
import BreadCrumbs, { BreadCrumb } from "../BreadCrumbs/BreadCrumbs";
import Typography from "../Typography/Typography";
import { Book, getBook } from "../../api/Books/getBook";
import styles from "./BookPostDetail.module.css";
import Button from "../Button/Button";
import { useState, useEffect } from "react";


const BookPostDetail: React.FC = () => {
  const { isbn13: bookId } = useParams();
  

  const book = books.find((book: { isbn13: number; }) => book.isbn13 === Number(bookId)) as Book;
 

  // const [book, setBook] = useState<Book | null>(null);
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (!bookId) return;

  //   setLoading(true);

  //   getBook({ isbn13: +bookId })
  //     .then((res) => setBook(res))
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, [bookId]);

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
      {/* {loading && "Loading"}  */}

      {/* {book && ( */}
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
                <Button>
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        </>
       {/* )} */}
    </div>
  );
};
export default BookPostDetail;
