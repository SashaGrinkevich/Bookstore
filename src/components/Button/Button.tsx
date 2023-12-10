import React from "react";
import clsx from "clsx";

import styles from "./Button.module.css";



interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary"  | "secondary";
  variant?: "standard" | "icon";
  children?: React.ReactNode;
  type?: 'submit' | 'reset' | 'button' ;
  font?: 'Bebas Neue';
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  color = "primary" ,
  variant = "standard",
  font = 'Bebas Neue',
  className,
  type,
}) => {
  return (
    <button
    className={clsx(styles.button, styles[color], styles[variant],styles[font], className)}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
