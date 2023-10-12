// import { useDispatch, useSelector } from "react-redux";
// import { Book } from "../../api/Books/getBook";
// import { useEffect } from "react";
// import { setCart, setFavorites, toggleBookIsCart } from "../../store/books/bookscards.reducer";
// import { getSlice } from "../../store/books/bookscards.selectors";
// import Typography from "../Typography/Typography";

import { useDispatch, useSelector } from "react-redux";
import { getSlice } from "../../store/books/bookscards.selectors";
import Typography from "../Typography/Typography";
import styles from './CartDetail.module.css'
import { Book } from "../../api/Books/getBook";
import { useEffect } from "react";
import { setCart } from "../../store/books/bookscards.reducer";


interface CartBooksProps {
    book: Book  ;
  }
  
  const CartBook: React.FC<CartBooksProps> = ({ book }) => {
    const dispatch = useDispatch();
    const cart = useSelector(getSlice);

    useEffect(() => {
      if (cart.length > 0) {
        localStorage.setItem(
          "cart",
          JSON.stringify(cart)
        );
      }
    }, [cart]);
  
    useEffect(() => {
      const cartInLocalStorage = localStorage.getItem("cart");
      if (cartInLocalStorage) {
        dispatch(setCart(JSON.parse(cartInLocalStorage)));
      }
    }, [dispatch]);
  
    return (
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.imgWrapper}>
            <img className={styles.img} src={book.image} alt={book.title} />
          </div>
          <div className={styles.description}>
            <Typography variant="h3" color="primary" className={styles.title}>
              {book.title}
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              className={styles.subtitle}
            >
              {book.subtitle}
            </Typography>
            <div className={styles.info}>
              <Typography variant="h3" color="primary" className={styles.price}>
                {book.price}
              </Typography>
              </div>
            </div>
          </div>
        </div>
        
    );
  };
  
  export default CartBook;