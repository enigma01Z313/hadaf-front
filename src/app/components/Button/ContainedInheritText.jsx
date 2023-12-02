import React from "react";

import ContainedBase from "./Layout/Contained";

export default function ContainedInheritText({ children, className, size, ...rest }) {
  return (
    <ContainedBase variant="inherited-text" className={className} size={size} {...rest}>
      {children}
    </ContainedBase>
  );
}
