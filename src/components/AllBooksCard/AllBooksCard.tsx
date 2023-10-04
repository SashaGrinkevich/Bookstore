import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import styles from "./AllBooksCard.module.css";
import { Book } from "../../api/Books/getBook";
import BookCard from "../BookCards/MediumCard/BookCard";
import BookCardPosts from "../BookCards/MediumCard/BookCard";
import { getBooks } from "../../api/Books/getBooks";
import Subscribe from "../Subscribe/Subscribe";
import Typography from "../Typography/Typography";

// const AllNewBooks: React.FC = () => {
// //   const [books, setBooks] = useState<Book[]>([]);
// //   const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     setLoading(true);

// //     getBooks()
// //       .then((res) => setBooks(res))
// //       .finally(() => {
// //         setLoading(false);
// //       });
// //   }, [setBooks]);
// //   console.log(books);
// //   return (
// //     <>
// //       {loading && "Loading"}

// //       {!loading && books.length > 0 && (
// //         <>
// //           <div className={styles.wrapperMain}>
// //             <Typography variant="h1" font="Bebas Neue" className={styles.title}>
// //               New Releases Books
// //             </Typography>
// //           </div>
// //           <div>
// //             <ul className={styles.listBookCards}>
// //               {books.map((book: Book) => (
// //                 <li className={styles.listBookCard} key={book.isbn13}>
// //                   {/* <NavLink
// //                   style={{ textDecoration: "none" }}
// //                   to={`/new/${book.isbn13}`}
// //                 >
// //                 </NavLink> */}
// //                   <BookCardPosts book={book} />
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //           <div>
// //             <Subscribe />
// //           </div>
// //         </>
// //       )}
// //     </>
// //   );
// // };
// export default AllNewBooks;
