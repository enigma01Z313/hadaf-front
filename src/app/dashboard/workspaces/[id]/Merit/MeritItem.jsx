import React, { useContext } from "react";

import workspaceContext from "@/app/context/workspaceContext";
import TextedInfo from "@/app/components/Button/TextedInfo";
import TexedError from "@/app/components/Button/TextedError";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import Devider from "@/app/components/Devider";
import styles from "./style.module.css";

import deleteMerit from "@/app/lib/merits/delete";

export default function MeritItem({
  merit,
  setSingle,
  setLoading,
  setReloadList,
}) {
  const { theWorkspace } = useContext(workspaceContext);

  const handleDelete = async () => {
    setLoading(true);
    await deleteMerit(theWorkspace, merit.id);
    setReloadList((state) => !state);
    setLoading(false);
  };

  return (
    <div
      className={`d-flex justify-between wrapper-box mb-2 
        ${styles["merit-item"]}`}>
      <span className="grow-1">{merit.title}</span>
      <div>
        <TextedInfo
          className="p-1 ml-2"
          onClick={() => {
            setSingle(merit.id);
          }}>
          <EditIcon />
        </TextedInfo>
        <TexedError className="p-1" onClick={handleDelete}>
          <DeleteIcon />
        </TexedError>
      </div>
      <Devider line={true} spacing={1} />
      {merit.description}
    </div>
  );
}
