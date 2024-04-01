import React from "react";

export default function OkrKr({ kr, index }) {
  console.log("4------------------------------");
  console.log(kr);

  return (
    <div className={`d-flex ${index !== 0 ? "mt-2" : "mt-1"}`}>
      <span className="grow-1 ml-3" style={{ maxWidth: "calc(100% - 230px)" }}>
        {kr.title}
      </span>
      <span className="ml-3">مالک: {kr.owner.fullName}</span>
      <span>میزان پشرفت: {kr.current}</span>
    </div>
  );
}
