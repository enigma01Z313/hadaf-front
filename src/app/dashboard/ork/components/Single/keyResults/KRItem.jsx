import React, { useState } from "react";

import TextedInfo from "@/app/components/Button/TextedInfo";
import AddIcon from "@mui/icons-material/Add";
import {
  FormControl,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

import UsersSelector from "../../UsersSelector";
import styles from "./style.module.css";
import canAddNew from "./canAddNew";

export default function KRItem({ index, krData, isNew }) {
  const directions = JSON.parse(localStorage.getItem("meta")).direction;

  const [theKR, setTheKR] = useState(
    krData ?? {
      title: "",
      owner: {},
      direction: {code: directions[1].code ?? 1},
      start: 0,
      current: 0,
      end: 100,
      coefficient: 1,
    }
  );

  const handleChange = (key, value) => {
    setTheKR((state) => ({ ...state, [key]: value }));
  };

  console.log("1-------------------------");
  console.log(theKR);

  return (
    <>
      <article className={`p-2 mb-1 d-flex ${styles["key-result-item"]}`}>
        <FormControl className="rtl-input p-relative grow-1 ml-1-5">
          <TextField
            id="key-result-title"
            label="عنوان"
            variant="standard"
            placeholder="عنوان..."
            inputProps={{ className: "text-h6 py-0-5" }}
            onChange={(e) => handleChange("title", e.target.value)}
            value={theKR?.title ?? ""}
          />
        </FormControl>

        <UsersSelector
          id={`kr-owner-${index}`}
          label={"مالک"}
          value={theKR?.owner?.id}
        />

        <FormControl
          id={"key-result-direction"}
          variant="standard"
          className="rtl-input p-relative grow-1 ml-1-5">
          <InputLabel id="demo-simple-select-standard-label">جهت</InputLabel>
          <Select
            labelId="okey-result-direction-label"
            id={`okey-result-direction`}
            value={theKR.direction.code}
            label={"جهت"}
            // onChange={handleChange}
            className="text-h6 py-1">
            {directions &&
              directions?.map((direction) => (
                <MenuItem key={direction.code} value={direction.code}>
                  {direction.label}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <FormControl
          className="rtl-input p-relative grow-1 ml-1-5"
          style={{ width: "100px" }}>
          <TextField
            id="key-result-start"
            label="شروع"
            variant="standard"
            placeholder="شروع"
            inputProps={{ className: "text-h6 py-0-5" }}
            onChange={(e) => handleChange("start", +e.target.value)}
            value={theKR?.start ?? 0}
          />
        </FormControl>

        <FormControl
          className="rtl-input p-relative grow-1 ml-1-5"
          style={{ width: "100px" }}>
          <TextField
            id="key-result-current"
            label="جاری"
            variant="standard"
            placeholder="جاری"
            inputProps={{ className: "text-h6 py-0-5" }}
            onChange={(e) => handleChange("current", +e.target.value)}
            value={theKR?.current ?? 0}
          />
        </FormControl>

        <FormControl
          className="rtl-input p-relative grow-1 ml-1-5"
          style={{ width: "100px" }}>
          <TextField
            id="key-result-goal"
            label="هدف"
            variant="standard"
            placeholder="هدف"
            inputProps={{ className: "text-h6 py-0-5" }}
            onChange={(e) => handleChange("goal", +e.target.value)}
            value={theKR?.goal ?? 100}
          />
        </FormControl>

        <FormControl
          className="rtl-input p-relative grow-1"
          style={{ width: "100px" }}>
          <TextField
            id="key-result-coefficient"
            label="ضریب"
            variant="standard"
            placeholder="ضریب"
            inputProps={{ className: "text-h6 py-0-5" }}
            onChange={(e) => handleChange("coefficient", +e.target.value)}
            value={theKR?.coefficient ?? 1}
          />
        </FormControl>
      </article>

      {isNew && (
        <TextedInfo disabled={!canAddNew(theKR.title)}>
          <AddIcon className="ml-1" />
          افزودن نتیجه کلیدی
        </TextedInfo>
      )}
    </>
  );
}
