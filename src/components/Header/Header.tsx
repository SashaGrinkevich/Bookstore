import React, { useState } from "react";
import Bookstore from "./Img/Bookstore.png";
import Search from "./Img/Search.svg";
import Frame from "./Img/Frame.svg"
import Heart from './Img/Heart .svg'
import ShoppingBag from './Img/ShoppingBag.svg'


import styles from "./Header.module.css";
import Button from "../Button/Button";
import Input from "../Input/Input";

const Header: React.FC = () => {
    const [searchValue, setSearchValue] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
      setSearchValue(e.target.value);

    return(
        <div className={styles.header}>
            <img src={Bookstore} alt="logo" className={styles.logo} />
            <div className={styles.searchWrapper}>
                <Input type="text"
                placeholder="Search"
                className={styles.search}
                value={searchValue}
                onChange={handleChange} label={""}                />
                <Button className={styles.searchButton}>
                    <img src={Search} alt="searchImg" />
                </Button>
            </div>
            <div className={styles.navButtons}>
                <Button className={styles.favButton}>
                    <img src={Heart} alt="logo" />
                </Button>
                <Button className={styles.shoppingBagButton}>
                    <img src={ShoppingBag} alt="logo" />
                </Button>
                <Button className={styles.accountButton}>
                    <img src={Frame} alt="logo" />
                </Button>
            </div>
        </div>
    )
};
export default Header;