import React, { useState, useContext } from "react";
import { TextField, FormControl } from "@mui/material";
import TexedPrimary from "@/app/components/Button/TexedPrimary";

import createOkrComment from "@/app/lib/okr/comments/create";

export default function Create({ okrId, setReloadList, setLoading }) {
  const [val, setVal] = useState("");

  const saveCurrentTask = async () => {
    setLoading(true);
    setVal("");
    const newComment = await createOkrComment(okrId, { content: val });
    setReloadList((state) => !state);
  };

  return (
    <div>
      <FormControl className="rtl-input p-relative w-100">
        <TextField
          id="task-title-new"
          label="کامنت"
          variant="standard"
          placeholder="متن کامنت..."
          onChange={(e) => setVal(e.target.value)}
          value={val}
          multiline={true}
          rows={5}
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
