import React from "react";

import Item from "./Item";

export default function List({ comments, taskId, setReloadList, setLoading }) {
  return (
    <div className="mt-2">
      {comments.map((comment, index) => (
        <Item
          key={comment.id}
          index={index}
          comment={comment}
          setReloadList={setReloadList}
          taskId={taskId}
          setLoading={setLoading}
        />
      ))}
    </div>
  );
}
