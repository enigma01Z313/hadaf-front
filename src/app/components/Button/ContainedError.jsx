import React from "react";

import ContainedBase from "./Layout/Contained";

export default function ContainedError({ children, className, size, ...rest }) {
  return (
    <ContainedBase variant="error" className={className} size={size} {...rest}>
      {children}
    </ContainedBase>
  );
}
