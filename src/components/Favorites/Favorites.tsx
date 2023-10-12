import React from "react";
import { getSlice } from "../../store/books/bookscards.selectors";
import { Book } from "../../api/Books/getBook";
import Typography from "../Typography/Typography";
import BreadCrumbs, { BreadCrumb } from "../BreadCrumbs/BreadCrumbs";
import { useSelector } from "react-redux";
import FavoritesBookCard from "../FavoritesDetail/FavoriteBookCard";

import styles from "./Favorite.module.css";

 interface FavoriteBookProps {}

const Favorites: React.FC<FavoriteBookProps> = () => {
  const { isBookLoading: loading } = useSelector(getSlice);
  const favoriteBooks = useSelector(getSlice);
  
  if (favoriteBooks.favoriteBooks.length === 0) {
    return (
      <Typography variant="h2" color="primary">
        "EMPTY"
      </Typography>
    );
  }
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
      <>
      <Typography variant="h1" color="primary">
       FAVORITES
       </Typography>
        <div>
          <ul className={styles.mediumPosts}>
            {favoriteBooks.favoriteBooks.map((book: Book) => (
              <li className={styles.mediumPost} key={book.isbn13}>
                <FavoritesBookCard book={book} />
              </li>
            ))}
          </ul>
        </div>
      </>
    </div>
  );
};

export default Favorites;
