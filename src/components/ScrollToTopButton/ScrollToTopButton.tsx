import React, { useEffect, useState } from "react";
import clsx from "clsx";


import styles from "./ScrollToTopButton.module.css";
import { throttle } from "lodash";
import Button from "../Button/Button";

const MIN_HEIGHT = -300;

const ScrollToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const handleClick = () =>
    document.body.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    const handleScroll = throttle(() => {
      setVisible(document.body.getBoundingClientRect().top <= MIN_HEIGHT);
    }, 300);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Button 
    className={clsx(styles.button,
         { [styles.visible]: visible })}
    onClick={handleClick}>
        to top
    </Button>
  );
};

export default ScrollToTopButton;


