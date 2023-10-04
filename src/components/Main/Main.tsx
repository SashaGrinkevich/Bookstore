import React, { useEffect, useState } from "react";
import Subscribe from "../Subscribe/Subscribe";
import Typography from "../Typography/Typography";
import styles from "./Main.module.css";
import { getBooks } from "../../api/Books/getBooks";
import { Book, getBook } from "../../api/Books/getBook";
import { NavLink } from "react-router-dom";
import BookCard from "../BookCards/MediumCard/BookCard";
import BookCardPosts from "../BookCards/MediumCard/BookCard";

const Main: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getBooks()
      .then((res) => setBooks(res))
      .finally(() => {
        setLoading(false);
      });
  }, [setBooks]);
  return (
    <>
      {loading && "Loading"}

      {!loading && books.length > 0 && (
        <>
          <div className={styles.wrapperMain}>
            <Typography variant="h1" font="Bebas Neue" className={styles.title}>
              New Releases Books
            </Typography>
          </div>
          <div>
            <ul className={styles.listBookCards}>
              {books.map((book) => (
                <li className={styles.listBookCard} key={book.isbn13}>
                  <NavLink
                    style={{ textDecoration: "none" }}
                    to={`/new/${book.isbn13}`}
                  >
                  <BookCardPosts book={book} />
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Subscribe />
          </div>
        </>
      )}
    </>
  );
};

export default Main;
