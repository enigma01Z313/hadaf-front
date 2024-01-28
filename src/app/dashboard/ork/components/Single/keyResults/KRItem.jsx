import React, { useState, useContext } from "react";

import AddIcon from "@mui/icons-material/Add";
import {
  FormControl,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TextedInfo from "@/app/components/Button/TextedInfo";
import TexedError from "@/app/components/Button/TextedError";

import UsersSelector from "../../UsersSelector";
import styles from "./style.module.css";
import canAddNew from "./canAddNew";

import workspaceContext from "@/app/context/workspaceContext";

export default function KRItem({
  index,
  krData,
  isNew,
  setTheOkr,
  keyResultsL,
  addNewKr,
  deleteKr,
}) {
  const { theUsers } = useContext(workspaceContext);
  const directions = JSON.parse(localStorage.getItem("meta")).direction;

  const defaultKR = {
    title: "",
    owner: theUsers?.data?.[0]?.id ?? "",
    direction: directions?.[1]?.code ?? 1,
    start: 0,
    current: 0,
    end: 100,
    coefficient: 1,
  };

  const [theKR, setTheKR] = useState(krData ?? defaultKR);

  const handleChange = (key, value) => {
    setTheKR((state) => ({ ...state, [key]: value }));
  };

  const handleOwnerChange = (e) => handleChange("owner", e.target.value);

  const addNewKrItem = () => {
    addNewKr(theKR)
    setTheKR(defaultKR);
  };

  console.log('-----------------------');
  console.log(setTheOkr);

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
          value={theKR?.owner}
          changeHandlre={handleOwnerChange}
        />

        <FormControl
          id={"key-result-direction-" + index}
          variant="standard"
          className="rtl-input p-relative grow-1 ml-1-5">
          <InputLabel id="demo-simple-select-standard-label">جهت</InputLabel>
          <Select
            labelId="okey-result-direction-label"
            id={`okey-result-direction`}
            value={theKR.direction}
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
          style={{ maxWidth: "70px" }}>
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
          style={{ maxWidth: "70px" }}>
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
          style={{ maxWidth: "70px" }}>
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
          style={{ maxWidth: "70px" }}>
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

        {keyResultsL !== 0 && index !== keyResultsL && (
          <TexedError onClick={() => deleteKr(index)}>
            <DeleteIcon />
          </TexedError>
        )}
      </article>

      {isNew && (
        <TextedInfo disabled={!canAddNew(theKR.title)} onClick={addNewKrItem}>
          <AddIcon className="ml-1" />
          افزودن نتیجه کلیدی
        </TextedInfo>
      )}
    </>
  );
}
