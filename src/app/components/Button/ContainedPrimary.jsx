import React from "react";

import ContainedBase from "./Layout/Contained";

export default function ContainedPrimary({ children, className, size, ...rest }) {
  return (
    <ContainedBase variant="primary" className={className} size={size} {...rest}>
      {children}
    </ContainedBase>
  );
}
