import React, { useCallback, useEffect, useRef, useState } from "react";

import Input from "../Input/Input";
import Typography from "../Typography/Typography";
import Button from "../Button/Button";

import styles from "./SingIn.module.css";
const SignIn: React.FC = () => {
  return (
  <div>
    <form className={styles.formSignIn}>
      <Input label="Email" placeholder="Your email" type="email" />
      <Input label="Password" placeholder="Your password" type="password" />
      <Typography variant="h6" color="primary">
        <a href="" className={styles.link}>
          Forgot password ?
        </a>
      </Typography>
      <Button type="submit" className={styles.signIn} >Sign In</Button>
    </form>
  </div>
);
};

export default SignIn;
