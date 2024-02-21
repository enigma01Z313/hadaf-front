import React, { useState } from "react";

import { format } from "date-fns-jalali-3";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import TexedInherit from "@/app/components/Button/TexedInherit";
import styles from "./style.module.css";

export default function DueDate({ dueDate, className, handleDueDateChange }) {
  const [isEditting, setIsEditting] = useState(false);

  const dateChangeHandle = (val) => handleDueDateChange(val.toISOString());

  console.log("4-------------------------");
  console.log(dueDate);

  return (
    <div className={styles["task-config"]}>
      <div
        onClick={() => setIsEditting(true)}
        className={`${className} wrapper-box2 cursor-pointer`}>
        تاریخ سررسید:
        {(dueDate &&
          !Object.is(null, dueDate) &&
          format(new Date(dueDate), "yyyy/MM/dd")) ||
          "-"}
      </div>
      {isEditting && (
        <>
          <div
            className={styles["fixed-overlay"]}
            onClick={() => {
              setIsEditting(false);
            }}></div>
          <article className={`wrapper-box pt-5 ${styles["config-box"]}`}>
            <TexedInherit
              onClick={() => setIsEditting(false)}
              className={`p-1 ${styles["close-config"]}`}>
              <CloseIcon style={{ fontSize: "18px" }} />
            </TexedInherit>
            <Box sx={{ width: "100%" }}>
              <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label=""
                    variant="standard"
                    onChange={dateChangeHandle}
                    value={dueDate && !Object.is(null, dueDate) && new Date(dueDate) || ""}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <Box sx={{ m: 1 }} />
            </Box>
          </article>
        </>
      )}
    </div>
  );
}
