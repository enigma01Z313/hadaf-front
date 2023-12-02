import React from "react";
import styles from "../style.module.css";

export default function TexedBase({
  children,
  variant,
  className,
  size,
  ...rest
}) {
  const sizeClass =
    size && ["small", "normal", "large", "over-large"].includes(size)
      ? styles[`btn-${size}`]
      : styles["btn-normal"];

  return (
    <button
      className={`
        ${className && className} 
        ${styles[`text`]} 
        ${styles[`text-${variant}`]} 
        ${styles["btn"]} 
        ${sizeClass}`}
      {...rest}
    >
      {children}
      <span></span>
    </button>
  );
}
