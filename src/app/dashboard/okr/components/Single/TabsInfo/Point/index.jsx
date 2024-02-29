import React, { useState, useContext } from "react";
import { TextField, FormControl } from "@mui/material";
import { toast } from "react-toastify";

import updateOkr from "@/app/lib/okr/update";

import workspaceContext from "@/app/context/workspaceContext";

export default function Point({ okrId, description }) {
  const { theWorkspace } = useContext(workspaceContext);
  const [val, setVal] = useState(description ?? "");

  const saveCurrentTask = async () => {
    const newTask = await updateOkr(theWorkspace, okrId, { description: val });
    toast.success("به روزرسانی با موفقیت انجام شد");
  };

  return (
    <div>
      <FormControl className="rtl-input p-relative w-100">
        <TextField
          id="task-title-new"
          label="نکات"
          variant="standard"
          placeholder="نکات..."
          onChange={(e) => setVal(e.target.value)}
          value={val}
          onBlur={saveCurrentTask}
          multiline={true}
          rows={5}
        />
      </FormControl>
    </div>
  );
}
