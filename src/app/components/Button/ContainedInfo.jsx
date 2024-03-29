import React from "react";

import ContainedBase from "./Layout/Contained";

export default function ContainedInfo({
  children,
  className,
  size,
  active,
  ...rest
}) {
  return (
    <ContainedBase
      variant="info"
      className={className}
      size={size}
      active={active}
      {...rest}>
      {children}
    </ContainedBase>
  );
}
