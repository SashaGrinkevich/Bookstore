import React, { useLayoutEffect } from "react";
import Typography from "../Typography/Typography";
import styles from "./Footer.module.css";
import { usePersistedState } from "../../hooks/usePersistedState";

const Footer: React.FC = () => {
  const [themeName, setThemeName] = usePersistedState<"dark" | "light">({
    key: "theme",
    initialValue: "light",
  });

  const changeTheme = () => {
    setThemeName(themeName === "light" ? "dark" : "light");
  };

  useLayoutEffect(() => {
    document.body.dataset.theme = themeName;
  }, [themeName]);

  return (
    <>
      <div className={styles.footer}>
        <Typography variant="h5" color="secondary">
          ©2023 Bookstore
        </Typography>
        <div className={styles.theme}>
          <label htmlFor="theme">
            <Typography color="secondary" font="Bebas Neue" variant="span">
              {themeName}
            </Typography>
          </label>
          <input
            type="checkbox"
            name="theme"
            id="theme"
            onChange={changeTheme}
          />
        </div>
        <Typography variant="h5" color="secondary">
          All rights reserved
        </Typography>
      </div>
    </>
  );
};

export default Footer;
