import Devider from "@/app/components/Devider";
import React from "react";

import Description from "./Description";
import Comments from "./Comments";

export default function Right({
  description,
  handleDescriptionChange,
  taskId,
}) {
  return (
    <aside className="grow-1 pl-2">
      <Description
        description={description}
        handleDescriptionChange={handleDescriptionChange}
      />

      {taskId && <Comments taskId={taskId} />}
    </aside>
  );
}
