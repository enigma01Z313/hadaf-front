import React from "react";

function OkrItem({ index, item: { title, progress } }) {
  const prgsClass =
    (progress < 30 && "error") ||
    (progress >= 30 && progress < 60 && "warning") ||
    (progress >= 60 && "success");

  return (
    <div
      className={`d-flex w-100 align-center progress-bar px-2 py-2 
        ${index === 0 ? "" : "mt-1"}
        ${prgsClass}
        `}
      style={{ "--fill-width": `${progress}%` }}>
      <span>{title}: </span>
      <span className="mr-1">{progress}%</span>
    </div>
  );
}

export default function OkrList({ data }) {
  return (
    <section className="mt-3">
      {data.map((v, i) => (
        <OkrItem key={i} index={i} item={v} />
      ))}
    </section>
  );
}
