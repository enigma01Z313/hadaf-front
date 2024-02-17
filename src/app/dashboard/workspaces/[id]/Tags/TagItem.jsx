import React, { useContext } from "react";

import workspaceContext from "@/app/context/workspaceContext";
import TextedInfo from "@/app/components/Button/TextedInfo";
import TexedError from "@/app/components/Button/TextedError";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import deleteTag from "@/app/lib/tags/delete";

export default function TagItem({ tag, setSingle, setLoading, setReloadList }) {
  const { theWorkspace } = useContext(workspaceContext);

  const handleDelete = async () => {
    setLoading(true);
    await deleteTag(theWorkspace, tag.id);
    setReloadList((state) => !state);
    setLoading(false);
  };

  return (
    <div className="d-flex justify-between wrapper-box mb-4">
      <div className="d-flex align-center" style={{ "--tag-color": tag.color }}>
        <div
          className="ml-1-5"
          style={{
            width: 16,
            height: 16,
            background: tag.color,
            borderRadius: "50%",
          }}></div>
        {tag.name}
      </div>
      <div>
        <TextedInfo
          className="p-1 ml-2"
          onClick={() => {
            setSingle(tag.id);
          }}>
          <EditIcon />
        </TextedInfo>
        <TexedError className="p-1" onClick={handleDelete}>
          <DeleteIcon />
        </TexedError>
      </div>
    </div>
  );
}
