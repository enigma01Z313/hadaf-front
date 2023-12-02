import React from "react";

import TexedBase from "./Layout/Texted";

export default function TextedInfo({ children, className, size, ...rest }) {
  return (
    <TexedBase variant="info" className={className} size={size} {...rest}>
      {children}
    </TexedBase>
  );
}
