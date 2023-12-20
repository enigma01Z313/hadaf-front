import React from "react";

export default function Devider(params) {
  const line = params?.line ?? false;
  const thickness = params?.thickness ?? 1;
  const spacing = params?.spacing ?? 1;
  const size = params?.size ?? 100;
  const color = params?.color ?? "#ccc";
  const bg = params?.bg ?? "transparent";

  return (
    <div
      className={`w-100 d-flex justify-center py-${spacing}`}
      style={{ background: bg }}>
      {line && (
        <div
          className={`w-${size}`}
          style={{ height: `${thickness}px`, background: color }}></div>
      )}
    </div>
  );
}
