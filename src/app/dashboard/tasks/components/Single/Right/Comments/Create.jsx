import React, { useState, useContext } from "react";
import { TextField, FormControl } from "@mui/material";
import TexedPrimary from "@/app/components/Button/TexedPrimary";

import createTaskComment from "@/app/lib/tasks/comments/create";

export default function Create({ taskId, setReloadList, setLoading }) {
  const [val, setVal] = useState("");

  const saveCurrentTask = async () => {
    setLoading(true);
    setVal("");
    const newComment = await createTaskComment(taskId, { content: val });
    setReloadList((state) => !state);
  };

  return (
    <div>
      <FormControl className="rtl-input p-relative w-100">
        <TextField
          id="task-title-new"
          variant="standard"
          placeholder="متن کامنت..."
          onChange={(e) => setVal(e.target.value)}
          value={val}
          multiline={true}
          rows={3}
        />
      </FormControl>
      <div className="d-flex justify-end mt-1">
        <TexedPrimary onClick={() => saveCurrentTask()}>
          ثبت کامنت جدید
        </TexedPrimary>
      </div>
    </div>
  );
}
