import React from "react";
import Link from "next/link";

export default function MenuItem({ item, disabled, ...rest }) {
  return (
    <li {...rest}>
      {(disabled && (
        <span className="px-3 py-1 w-100 d-flex">{item.title}</span>
      )) || (
        <Link
          className="px-3 py-1 w-100 d-flex"
          href={item.link}
          alt={item.slug}>
          {item.title}
        </Link>
      )}
    </li>
  );
}
