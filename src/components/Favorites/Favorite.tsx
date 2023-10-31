import React, { useEffect } from "react";
import { getSlice } from "../../store/books/bookscards.selectors";
import { Book } from "../../api/Books/getBook";
import BreadCrumbs, { BreadCrumb } from "../BreadCrumbs/BreadCrumbs";
import { useDispatch, useSelector } from "react-redux";
import Typography from "../Typography/Typography";
import FavoritesBookCard from "../FavoritesDetail/FavoriteBookCard";
import { setFavorite } from "../../store/books/bookscards.reducer";

import styles from "./Favorite.module.css";

 interface FavoriteBookProps {}

const Favorites: React.FC<FavoriteBookProps> = () => {
  const { isBookLoading: loading } = useSelector(getSlice);
  const favoriteBooks = useSelector(getSlice);

  const dispatch = useDispatch();
  useEffect(()=>{
    const favBookInLocalStorage = localStorage.getItem('favorites');
    if (favBookInLocalStorage) {
      dispatch(setFavorite(JSON.parse(favBookInLocalStorage)))
    }
  },[dispatch])
  
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
