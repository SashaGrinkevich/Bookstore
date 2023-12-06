import React, {  useState } from "react";
import Bookstore from "../../components/Icon/icons/Bookstore.png";
import styles from "./Header.module.css";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Icon from "../Icon/Icon";
import { NavLink } from "react-router-dom";
import { setSearch } from "../../store/books/bookscards.reducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";

const Header: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchValue(e.target.value);

  const handleClick = () => {
    dispatch(setSearch(searchValue));
  };

  const handleBackClick = () => {
    dispatch(setSearch(""));
  };
  return (
    <div className={styles.header}>
      <NavLink to="/" onClick={handleBackClick}>
        <img src={Bookstore} alt="logo" className={styles.logo} />
      </NavLink>
      <div className={styles.searchWrapper}>
        <Input
          type="text"
          placeholder="Search"
          className={styles.search}
          value={searchValue}
          onChange={handleChange}
          label={""}
        />
        <Button className={styles.searchButton} onClick={handleClick}>
          <Icon type={"search"} />
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
          <NavLink to={"/authorization"}>
            <Icon type={"user"} />
          </NavLink>
        </Button>
      </div>
    </div>
  );
};
export default Header;
