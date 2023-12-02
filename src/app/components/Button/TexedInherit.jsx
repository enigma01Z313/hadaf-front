import React from "react";

import TexedBase from "./Layout/Texted";

export default function TexedInherit({ children, className, size, ...rest }) {
  return (
    <TexedBase variant="inherit" className={className} size={size} {...rest}>
      {children}
    </TexedBase>
  );
}
