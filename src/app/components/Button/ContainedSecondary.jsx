import React from "react";

import ContainedBase from "./Layout/Contained";

export default function ContainedSecondary({ children, className, size, ...rest }) {
  return (
    <ContainedBase variant="secondary" className={className} size={size} {...rest}>
      {children}
    </ContainedBase>
  );
}
