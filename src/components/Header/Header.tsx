import React, { useState } from "react";
import Bookstore from "../../components/Icon/icons/Bookstore.png";
import Search from "../../components/Icon/icons/Search.svg";
import User from "../../components/Icon/icons/Frame.svg";
import Favorite from "../../components/Icon/icons/Favorite.svg";
import Cart from "../../components/Icon/icons/Cart.svg";

import styles from "./Header.module.css";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Icon from "../Icon/Icon";
import { NavLink } from "react-router-dom";

const Header: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchValue(e.target.value);

  return (
    <div className={styles.header}>
      <img src={Bookstore} alt="logo" className={styles.logo} />
      <div className={styles.searchWrapper}>
        <Input
          type="text"
          placeholder="Search"
          className={styles.search}
          value={searchValue}
          onChange={handleChange}
          label={""}
        />
        <Button className={styles.searchButton}>
          <img src={Search} alt="searchImg" />
        </Button>
      </div>
      <div className={styles.navButtons}>
        <Button className={styles.favButton}>
          <NavLink to={"/favorite"}>
            <Icon type={"bookmark"} />
          </NavLink>
        </Button>
        <Button className={styles.shoppingBagButton}>
        <NavLink to={"/cart"}>
            <Icon type={"cart"} />
          </NavLink>
        </Button>
        <Button className={styles.accountButton}>
        <NavLink to={"/"}>
            <Icon type={"user"} />
          </NavLink>
        </Button>
      </div>
    </div>
  );
};
export default Header;
