import React from "react";
import styles from "../style.module.css";

export default function ContainedBase({
  children,
  variant,
  className,
  size,
  active,
  ...rest
}) {
  const sizeClass =
    size &&
    ["extra-small", "small", "normal", "large", "over-large"].includes(size)
      ? styles[`btn-${size}`]
      : styles["btn-normal"];

  return (
    <button
      className={`
        ${className && className} 
        ${styles[`contained`]} 
        ${styles[`contained-${variant}`]} 
        ${styles["btn"]} 
        ${active === true ? styles["active"] : ""}
        ${sizeClass}`}
      {...rest}>
      {children}
      <span></span>
    </button>
  );
}
