import React, { useState } from "react";
import { format } from "date-fns-jalali-3";
import { TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

import styles from "./style.module.css";
import ContainedInheritText from "@/app/components/Button/ContainedInheritText";
import ContainedError from "@/app/components/Button/ContainedError";
import ContainedPrimary from "@/app/components/Button/ContainedPrimary";
import Devider from "@/app/components/Devider";

import updateOkrComment from "@/app/lib/okr/comments/update";
import removeOkrComment from "@/app/lib/okr/comments/remove";

export default function Item({
  comment,
  index,
  okrId,
  setReloadList,
  setLoading,
}) {
  const theUser = JSON.parse(localStorage.getItem("user"));
  const [editMode, setEditMode] = useState(false);
  const [val, setVal] = useState(comment.content);

  const handleCommentDelete = async () => {
    setLoading(true);
    await removeOkrComment(okrId, comment.id);
    setReloadList((state) => !state);
  };

  const handleCommentUpdate = async () => {
    setLoading(true);
    await updateOkrComment(okrId, comment.id, { content: val });
    setReloadList((state) => !state);
  };

  return (
    <div
      className={`p-2 pb-1 mr-2 
        ${index !== 0 ? "mt-1" : ""}
        ${styles["comment-item"]}
        ${theUser.id === comment.owner.id ? styles["own-comment"] : ""}`}
    >
      <div>
        {(editMode && (
          <TextField
            className="w-100"
            multiline={true}
            rows={5}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            variant="standard"
            inputProps={{ style: { color: "var(--txt-color)" } }}
          />
        )) ||
          comment.content}
      </div>
      <Devider spacing={1} line={true} color="#ccc" />
      <div className="d-flex justify-between align-center direction-row-reverse">
        <span className="text-caption">
          {format(comment.createdAt, "yyyy/MM/d")}
        </span>
        {theUser.id === comment.owner.id && (
          <span>
            {(editMode && (
              <>
                <ContainedPrimary
                  className="p-0-5"
                  onClick={() => handleCommentUpdate()}
                >
                  <CheckIcon style={{ fontSize: "16px" }} />
                </ContainedPrimary>
                <ContainedError
                  className="p-0-5 mr-2"
                  onClick={() => {
                    setEditMode(false);
                    setVal(comment.content);
                  }}
                >
                  <ClearIcon style={{ fontSize: "16px" }} />
                </ContainedError>
              </>
            )) || (
              <>
                <ContainedInheritText
                  className="p-0-5"
                  onClick={() => setEditMode(true)}
                >
                  <EditIcon style={{ fontSize: "16px" }} />
                </ContainedInheritText>
                <ContainedError
                  className="p-0-5 mr-2"
                  onClick={() => handleCommentDelete()}
                >
                  <DeleteIcon style={{ fontSize: "16px" }} />
                </ContainedError>
              </>
            )}
          </span>
        )}
      </div>
    </div>
  );
}
