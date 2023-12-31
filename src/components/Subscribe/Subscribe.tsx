import React from "react";
import styles from "./Subscribe.module.css";
import Typography from "../Typography/Typography";
import Button from "../Button/Button";
import Input from "../Input/Input";

const Subscribe: React.FC = () => {
  return (
    <div className={styles.wrapperForm}>
      <div className={styles.descrtiprionForm}>
        <Typography variant="h2" color="primary" className={styles.formTitle}>
          Subscribe to Newsletter
        </Typography>
        <Typography
          color="secondary"
          variant="span"
          className={styles.formSubtitle}
        >
          Be the first to know about new IT books, upcoming releases, exclusive
          offers and more.
        </Typography>
      </div>
      <div className={styles.subscribe}>
        <Input
          type="email"
          placeholder="Your email"
          label={""}
          className={styles.inputSubscribe}
        />
        <Button
          type="button"
          variant="standard"
          className={styles.buttonSubscribe}
        >
          Subscribe
        </Button>
      </div>
    </div>
  );
};

export default Subscribe;
