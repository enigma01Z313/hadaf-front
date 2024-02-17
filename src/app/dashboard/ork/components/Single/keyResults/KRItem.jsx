import React, { useState, useContext } from "react";

import AddIcon from "@mui/icons-material/Add";
import {
  FormControl,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import TextedInfo from "@/app/components/Button/TextedInfo";
import TexedError from "@/app/components/Button/TextedError";

import UsersSelector from "../../UsersSelector";
import styles from "./style.module.css";
import canAddNew from "./canAddNew";

import workspaceContext from "@/app/context/workspaceContext";
import updateKR from "@/app/lib/keryResult/update";
import getOkr from "@/app/lib/okr/get";

export default function KRItem({
  index,
  krData,
  isNew,
  setTheOkr,
  keyResultsL,
  addNewKr,
  deleteKr,
  okrId,
  setLoading,
  createMode,
}) {
  const { theUsers, theWorkspace } = useContext(workspaceContext);
  const directions = JSON.parse(localStorage.getItem("meta")).direction;

  const defaultKR = {
    title: "",
    owner: theUsers?.data?.[0]?.id ?? "",
    direction: directions?.[1]?.code ?? 1,
    start: 0,
    current: 0,
    goal: 100,
    coefficient: 1,
  };

  const [theKR, setTheKR] = useState(krData ?? defaultKR);

  const saveCurrentKR = async () => {
    if (!isNew && !createMode) {
      setLoading(true);
      await updateKR(okrId, krData.id, theKR);
      const uppedOkr = await getOkr(theWorkspace, okrId);

      setTheOkr({
        ...uppedOkr,
        assignee: uppedOkr.assignee.id,
        status: uppedOkr.status.code,
        timeFrame: uppedOkr.timeFrame.id,
        access: uppedOkr.access.code,
      });
      setLoading(false);
    }
  };

  const handleChange = (key, value) => {
    setTheOkr((theOkr) => {
      const nweKeyResults = theOkr.keyResults.map((item, i) => {
        if (i !== index) return item;

        return { ...item, [key]: value };
      });

      const newOkr = { ...theOkr, keyResults: nweKeyResults };

      return newOkr;
    });
    setTheKR((state) => ({ ...state, [key]: value }));
  };

  const handleOwnerChange = (e) => handleChange("owner", e.target.value);

  const addNewKrItem = () => {
    addNewKr(theKR);
    setTheKR(defaultKR);
  };

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
            onBlur={() => saveCurrentKR()}
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
          className="rtl-input p-relative grow-1 ml-1-5"
          style={{ width: "50px" }}>
          <InputLabel id="demo-simple-select-standard-label">جهت</InputLabel>
          <Select
            labelId="okey-result-direction-label"
            id={`okey-result-direction`}
            value={theKR.direction}
            label={"جهت"}
            onChange={(e) => handleChange("direction", e.target.value)}
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
            id={`key-result-start-${index}`}
            label="شروع"
            variant="standard"
            placeholder="شروع"
            inputProps={{ className: "text-body-2 py-0-7" }}
            onChange={(e) => handleChange("start", +e.target.value)}
            value={theKR?.start ?? 0}
            onBlur={() => saveCurrentKR?.()}
          />
        </FormControl>

        <FormControl
          className="rtl-input p-relative grow-1 ml-1-5"
          style={{ maxWidth: "70px" }}>
          <TextField
            id={`key-result-current-${index}`}
            label="جاری"
            variant="standard"
            placeholder="جاری"
            inputProps={{ className: "text-body-2 py-0-7" }}
            onChange={(e) => handleChange("current", +e.target.value)}
            value={theKR?.current ?? 0}
            onBlur={() => saveCurrentKR?.()}
          />
        </FormControl>

        <FormControl
          className="rtl-input p-relative grow-1 ml-1-5"
          style={{ maxWidth: "70px" }}>
          <TextField
            id={`key-result-goal-${index}`}
            label="هدف"
            variant="standard"
            placeholder="هدف"
            inputProps={{ className: "text-body-2 py-0-7" }}
            onChange={(e) => handleChange("goal", +e.target.value)}
            value={theKR?.goal ?? 100}
            onBlur={() => saveCurrentKR?.()}
          />
        </FormControl>

        <FormControl
          className="rtl-input p-relative grow-1"
          style={{ maxWidth: "70px" }}>
          <TextField
            id={`key-result-coefficient-${index}`}
            label="ضریب"
            variant="standard"
            placeholder="ضریب"
            inputProps={{ className: "text-body-2 py-0-7" }}
            onChange={(e) => handleChange("coefficient", +e.target.value)}
            value={theKR?.coefficient ?? 1}
            onBlur={() => saveCurrentKR?.()}
          />
        </FormControl>

        {keyResultsL !== 0 && index !== keyResultsL && (
          <TexedError onClick={() => deleteKr(index)}>
            <DeleteIcon />
          </TexedError>
        )}

        <div className="w-100 mt-2">
          <Accordion className="bg-trans">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header">
              توضیحات
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                className="w-100"
                variant="standard"
                placeholder="توضیحات..."
                multiline
                rows={4}
                onChange={(e) => handleChange("description", e.target.value)}
                value={theKR?.description ?? ""}
              />
            </AccordionDetails>
          </Accordion>
        </div>
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
