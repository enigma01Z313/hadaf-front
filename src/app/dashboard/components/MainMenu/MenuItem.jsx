import React from "react";
import Link from "next/link";

export default function MenuItem({ item, disabled, ...rest }) {
  return (
    <li {...rest}>
      {(disabled && (
        <span className="px-2 py-1-5 d-flex grow-1">
          {item.icon && (
            <item.icon className="ml-1" style={{ marginRight: "5px" }} />
          )}
          <span>{item.title}</span>
        </span>
      )) || (
        <Link
          className="px-2 py-1-5 d-flex align-center grow-1"
          href={item.link}
          alt={item.slug}>
          {item.icon && (
            <item.icon className="ml-1" style={{ marginRight: "5px" }} />
          )}
          <span>{item.title}</span>
        </Link>
      )}
    </li>
  );
}
