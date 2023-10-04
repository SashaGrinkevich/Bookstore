import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BreadCrumbs, { BreadCrumb } from "../BreadCrumbs/BreadCrumbs";
import Typography from "../Typography/Typography";
import { Book, getBook } from "../../api/Books/getBook";
import styles from "./BookPostDetail.module.css"

const BookPostDetail: React.FC = () => {
    const { isbn13: bookId } = useParams();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      if (!bookId) return;
  
setLoading(true);

getBook({ isbn13: +bookId })
  .then((res) => setBook(res))
  .finally(() => {
    setLoading(false);
  });
}, [bookId]);

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
    <Typography className={styles.title} variant="h2">
      {book.title}
    </Typography>
    <div className={styles.content}>
      <div>
        <img className={styles.img} src={book.image} alt={book.title} />
      </div>
      <Typography className={styles.text} variant="p">
        {book.subtitle}
      </Typography>
    </div>
  </>
)}
</div>
);
};
export default BookPostDetail
