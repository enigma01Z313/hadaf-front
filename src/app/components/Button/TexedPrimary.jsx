import React from "react";

import TexedBase from "./Layout/Texted";

export default function TexedPrimary({ children, className, size, ...rest }) {
  return (
    <TexedBase variant="primary" className={className} size={size} {...rest}>
      {children}
    </TexedBase>
  );
}
