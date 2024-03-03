import React from "react";
import Link from "next/link";
import Image from "next/image";

import SubMenuItem from "./SubMenuItem";
import styles from "./style.module.css";

export default function MenuItem({ item, disabled, subMenu, ...rest }) {
  return (
    <li {...rest}>
      {(disabled && (
        <span className="px-2 py-1-5 d-flex grow-1">
          {item.icon && (
            <item.icon className="ml-1" style={{ marginRight: "7px" }} />
          )}

          {item.image && (
            <Image
              className="ml-1"
              src={`/${item.image}.svg`}
              width={22}
              height={22}
              alt={item.title}
              style={{ marginRight: "7px" }}
            />
          )}
          
          <span>{item.title}</span>
        </span>
      )) || (
        <Link
          className="px-2 py-1-5 d-flex align-center grow-1"
          href={item.link}
          alt={item.slug}>
          {item.icon && (
            <item.icon className="ml-1" style={{ marginRight: "7px" }} />
          )}
          {item.image && (
            <Image
              className="ml-1"
              src={`/${item.image}.svg`}
              width={22}
              height={22}
              alt={item.title}
              style={{ marginRight: "7px" }}
            />
          )}
          <span>{item.title}</span>
        </Link>
      )}

      {subMenu && (
        <div className={styles["sub-menu"]}>
          {subMenu.map((item, index) => (
            <SubMenuItem key={index} item={item} />
          ))}
        </div>
      )}
    </li>
  );
}
