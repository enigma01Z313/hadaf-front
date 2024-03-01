import React from "react";

import Assignee from "./Assignee";
import Progress from "./Progress";
import Colleages from "./Colleages";
import DueDate from "./DueDate";
import Tags from "./Tags";

export default function Left({
  dueDate,
  assignee,
  progress,
  colleages,
  tags,
  theTags,
  handleDueDateChange,
  handleassigneeChange,
  handleProgressChange,
  handleColleagesChange,
  handleTagsChange,
}) {
  const changeHandlred = (key, value) => handleTagsChange(value);

  return (
    <aside className={`grow-1`} style={{ maxWidth: "25%" }}>
      <DueDate
        dueDate={dueDate}
        handleDueDateChange={handleDueDateChange}
        className="mb-1"
      />

      <Assignee
        assignee={assignee}
        handleassigneeChange={handleassigneeChange}
        className="mb-1"
      />

      <Progress
        progress={progress}
        handleProgressChange={handleProgressChange}
        className="mb-1"
      />

      <Colleages
        colleages={colleages}
        handleColleagesChange={handleColleagesChange}
      />

      <Tags
        workspaceTags={theTags}
        values={tags}
        changeHandlred={changeHandlred}
      />
    </aside>
  );
}
