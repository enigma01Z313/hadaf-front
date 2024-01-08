import React from "react";

export default function Progress({ progress, className }) {
  return (
    <div className={`${className} wrapper-box2 cursor-pointer`}>
      درصد پیشرفت: {progress}٪
    </div>
  );
}
