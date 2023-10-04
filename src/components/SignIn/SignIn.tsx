import React, { useCallback, useEffect, useRef, useState } from "react";

import Input from "../Input/Input";
import Typography from "../Typography/Typography";
import Button from "../Button/Button";

import styles from "./SingIn.module.css";

interface SignInUserInfoErrors {
  password?: string;
  email?: string;
}
interface FormSignIn {
  email: string;
  password: string;
}

const initialValues: FormSignIn = {
  email: "",
  password: "",
};

const signInValidation = (values: FormSignIn): SignInUserInfoErrors => {
  const errors: SignInUserInfoErrors = {};

  if (!values.email) {
    errors.email = "required field";
  }

  if (!values.password) {
    errors.password = "required field";
  }

  return errors;
};

const SignIn: React.FC = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<SignInUserInfoErrors>({});
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prevValues: any) => ({ ...prevValues, [name]: value }));
  }, []);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    const errors = signInValidation(values);

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
    <div className={styles.SignInWrapper}>
      <form className={styles.form_signin}>
        <div className={styles.formTitle}>
          <Button type="button" color="primary" className={styles.title1}>
            Sign In
          </Button>
          <Button type="button" color="primary" className={styles.title2}>
            Sign Up
          </Button>
        </div>
        <div className={styles.signInInput}>
          <Input
            placeholder="Your email"
            ref={inputRef}
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
        </div>
        <div>
          <Typography variant="p">Forgot password ?</Typography>
        </div>
        <div className={styles.SignInBtn}>
          <Button
            type="submit"
            color="secondary"
            onClick={handleSubmit}
            className={styles.btn_signin}
          >
            SIGN IN
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
