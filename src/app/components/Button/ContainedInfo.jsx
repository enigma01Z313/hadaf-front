import React from "react";

import ContainedBase from "./Layout/Contained";

export default function ContainedInfo({ children, className, size, ...rest }) {
  return (
    <ContainedBase variant="info" className={className} size={size} {...rest}>
      {children}
    </ContainedBase>
  );
}
