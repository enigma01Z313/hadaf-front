import React from "react";

import TexedError from "@/app/components/Button/TextedError";
import TexedInherit from "@/app/components/Button/TexedInherit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function OkrActions({ okrId, deleteOkr, setSingleOkr }) {
  return (
    <div className="d-flex align-end ml-1">
      <TexedInherit className="p-1" onClick={() => setSingleOkr(okrId)}>
        <EditIcon />
      </TexedInherit>
      <TexedError className="p-1" onClick={() => deleteOkr(okrId)}>
        <DeleteIcon />
      </TexedError>
    </div>
  );
}
