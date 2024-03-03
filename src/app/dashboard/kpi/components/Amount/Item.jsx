import React from "react";

export default function Item({ log, index }) {
  return (
    <div className={`text-caption ${index !== 0 ? "mt-1" : ""}`}>
      {log.content}
    </div>
  );
}
