import React from "react";

import Item from "./Item";

export default function List({ comments, okrId, setReloadList, setLoading }) {
  return (
    <div>
      {comments.map((comment, index) => (
        <Item
          key={comment.id}
          index={index}
          comment={comment}
          setReloadList={setReloadList}
          okrId={okrId}
          setLoading={setLoading}
        />
      ))}
    </div>
  );
}
