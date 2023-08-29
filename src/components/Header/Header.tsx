import React, { useState } from "react";
import Bookstore from "./Img/Bookstore.png";
import Search from "./Img/Search.svg";
import Frame from "./Img/Frame.svg"
import Heart from './Img/Heart .svg'
import ShoppingBag from './Img/ShoppingBag.svg'

import styles from "./Header.module.css";

const Header: React.FC = () => {
    const [searchValue, setSearchValue] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
      setSearchValue(e.target.value);

    return(
        <div className={styles.header}>
            <img src={Bookstore} alt="logo" className={styles.logo} />
            <div className={styles.searchWrapper}>
                <input type="text"
                className={styles.search}
                value={searchValue} 
                onChange={handleChange}
                />
                <button className={styles.serchButton}>
                    <img src={Search} alt="searchImg" />
                </button>
            </div>
            <div className={styles.navButtons}>
                <button className={styles.favButton}>
                    <img src={Heart} alt="logo" />
                </button>
                <button className={styles.shoppingBagButton}>
                    <img src={ShoppingBag} alt="logo" />
                </button>
                <button className={styles.accountButton}>
                    <img src={Frame} alt="logo" />
                </button>
            </div>
        </div>
    )
};
export default Header;