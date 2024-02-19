import React from "react";

import ContainedBase from "./Layout/Contained";

export default function ContainedInheritText({
  children,
  className,
  size,
  active,
  ...rest
}) {
  return (
    <ContainedBase
      variant="inherited-text"
      className={className}
      size={size}
      active={active}
      {...rest}>
      {children}
    </ContainedBase>
  );
}
