import React from "react";

import TexedBase from "./Layout/Texted";

export default function TexedError({ children, className, size, ...rest }) {
  return (
    <TexedBase variant="error" className={className} size={size} {...rest}>
      {children}
    </TexedBase>
  );
}
