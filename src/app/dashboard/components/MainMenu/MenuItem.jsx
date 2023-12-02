import React from "react";
import Link from "next/link";

export default function MenuItem({ item, ...rest }) {
  return (
    <li {...rest}>
      <Link className="px-3 py-1 w-100 d-flex" href={item.link} alt={item.slug}>
        {item.title}
      </Link>
    </li>
  );
}
