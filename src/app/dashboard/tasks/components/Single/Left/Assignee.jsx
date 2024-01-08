import React from "react";

export default function Assignee({ assignee, className }) {
  return (
    <div className={`${className} wrapper-box2 cursor-pointer`}>
      منصوب به: {assignee.fullName}
    </div>
  );
}
