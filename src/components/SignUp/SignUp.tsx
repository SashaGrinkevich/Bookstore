import React, { useCallback, useEffect, useRef, useState } from "react";

import Input from "../Input/Input";
import Button from "../Button/Button";


import styles from "./SignUp.module.css";

interface SignUpUserInfoErrors {
  username?: string;
  password?: string;
  email?: string;
  confirmPassword?: string;
}
interface SignUpValues {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
}

const initialValues: SignUpValues = {
  username: "",
  password: "",
  email: "",
  confirmPassword: "",
};

const signUpValidation = (values: SignUpValues) => {
  const errors: SignUpUserInfoErrors = {};

  if (!values.username) {
    errors.username = "required field";
  }

  if (!values.email) {
    errors.email = "required field";
  }

  if (!values.password) {
    errors.password = "required field";
  } else if (values.password !== values.confirmPassword) {
    errors.password = "password and confirmPassword should be equal";
  }

  return errors;
};

const SignUp: React.FC = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<SignUpUserInfoErrors>({});
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prevValues: any) => ({ ...prevValues, [name]: value }));
  }, []);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    const errors = signUpValidation(values);

    if (Object.keys(errors).length === 0) {
      setErrors({});
      setValues(initialValues);
    } else {
      setErrors(errors);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className={styles.SignIUpWrapper}>
      <form className={styles.formSignUp}>
        <div className={styles.formTitle}>
          <Button type="button" color="primary" className={styles.title1}>
            Sign In
          </Button>
          <Button type="button" color="primary" className={styles.title2}>
            Sign Up
          </Button>
        </div>
        <div className={styles.signUpInput}>
          <Input
            placeholder="Your name"
            ref={inputRef}
            label="User name"
            id="username"
            name="username"
            value={values.username}
            error={!!errors.username}
            description={!!errors.username ? errors.username : ""}
            type="text"
            onChange={handleChange}
          />
          <Input
            placeholder="Your email"
            label="Email"
            id="email"
            name="email"
            value={values.email}
            error={!!errors.email}
            description={!!errors.email ? errors.email : ""}
            type="text"
            onChange={handleChange}
          />
          <Input
            placeholder="Your password"
            label="Password"
            id="password"
            name="password"
            value={values.password}
            error={!!errors.password}
            description={!!errors.password ? errors.password : ""}
            type="password"
            onChange={handleChange}
          />
          <Input
            placeholder="Confirm your password"
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            value={values.confirmPassword}
            error={!!errors.confirmPassword}
            description={!!errors.confirmPassword ? errors.confirmPassword : ""}
            type="password"
            onChange={handleChange}
          />
        </div>
        <div className={styles.SignUpBtn}>
          <Button
            type="submit"
            color="secondary"
            onClick={handleSubmit}
            className={styles.btn_signup}
          >
            SIGN UP
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
