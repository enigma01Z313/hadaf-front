import React from "react";

import styles from './style.module.css'

export default function BoxedDetailItem({
  title,
  value,
  icon,
  iconRender,
  color,
  index,
}) {
  return (
    <div
      className={`wrapper-box grow-1 d-flex direction-column align-center mt-3 
        ${styles['box-item']}
        ${index !== 0 ? "mr-3" : ""}`}>
      <div>
        {iconRender?.(color.text) ?? <box-icon color={color.text} name={icon}></box-icon>}
      </div>
      <div className="mb-2 text-body-2">{title}</div>
      <div
        className="p-1 text-center"
        style={{
          background: color.bg,
          color: color.text,
          minWidth: "43px",
          borderRadius: "43px",
        }}>
        {value}
      </div>
    </div>
  );
}
