import React from "react";
import clsx from "clsx";

import styles from "./Typography.module.css";

interface TypographyProps {
    variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "p" | "span" | "h6";
    color?: "primary" |"primary 2"| "secondary" ;
    font?: "Bebas Neue" | "Helios" | "DIN Pro" ;
    className?: string;
    children: React.ReactNode;
  }
  const Typography: React.FC<TypographyProps> = ({
    variant = "p",
    color = "primary",
    font = "Bebas Neue",
    className,
    children,
  }) => {
    const Tag = variant;
  
    return (
      <Tag className={clsx(styles[variant],
       styles[color], styles[font],
        className
        )}>
        {children}
      </Tag>
    );
  };
  
  export default Typography;