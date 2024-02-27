import React from "react";
import Link from "next/link";

import styles from "./style.module.css";

export default function SubMenuItem({ item }) {
  return (
    <div className={styles["sub-menu-item"]}>
      <Link
        className="px-2 py-1-5 d-flex align-center justify-start grow-1"
        href={item.link}
        alt={item.slug}>
        {item.icon && (
          <item.icon className="ml-2 aaaaaaaaaaaaa" />
        )}
        <span className="mr-1">{item.title}</span>
      </Link>
    </div>
  );
}
