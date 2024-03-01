import React, { useEffect, useState } from "react";

import {
  DialogActions,
  TextField,
  Dialog,
  DialogContent,
} from "@mui/material";

import { MuiColorInput } from "mui-color-input";

import Devider from "@/app/components/Devider";
import TexedPrimary from "@/app/components/Button/TexedPrimary";
import TexedError from "@/app/components/Button/TextedError";
import TextedInfo from "@/app/components/Button/TextedInfo";

import createTag from "@/app/lib/tags/create";
import updateTag from "@/app/lib/tags/update";

export default function Single({
  single,
  setSingle,
  setReloadList,
  theWorkspace,
  tags,
}) {
  const [loading, setLoading] = useState(false);
  const [theTag, setTheTag] = useState({
    id: undefined,
    name: "",
    color: undefined,
  });

  useEffect(() => {
    if (single !== "create") {
      const targetTag = tags.find((item) => item.id === single);

      setTheTag({
        name: targetTag.name,
        color: targetTag.color,
        id: targetTag.id,
      });
    }
  }, []);

  const handleChange = (color) => {
    setTheTag((state) => ({ ...state, color }));
  };

  const handleClose = () => setSingle("");

  const handleTagCreate = async () => {
    setLoading(true);
    await createTag(theWorkspace, theTag);
    setReloadList((state) => !state);
    setLoading(false);
    handleClose();
  };

  const handleTagSave = async () => {
    setLoading(true);
    await updateTag(theWorkspace, theTag.id, theTag);
    setReloadList((state) => !state);
    handleClose();
    setLoading(false);
  };

  return (
    <Dialog
      maxWidth="sm"
      fullWidth={true}
      open={open}
      onClose={handleClose}
      PaperProps={{ classes: { root: loading ? "loading " : "over-visible" } }}>
      <DialogContent style={{ overflow: "visible" }}>
        <section className="d-flex direction-column">
          <TextField
            label="نام برچسب"
            className="rtl-input w-100 mb-4"
            inputProps={{ className: "w-100" }}
            placeholder="نام برچسب"
            variant="standard"
            value={theTag?.name ?? ""}
            onChange={(e) =>
              setTheTag((state) => ({ ...state, name: e.target.value }))
            }
          />
          <div id="color-picker-wrapper" className="w-100">
            <MuiColorInput
              className="rtl-input"
              label="رنگ برچسب"
              value={theTag.color ?? "rgb(0,0,0)"}
              onChange={handleChange}
              variant="standard"
            />
          </div>
        </section>
      </DialogContent>
      <Devider line={true} spacing={0} />
      <DialogActions>
        {(single !== "create" && (
          <>
            <TexedError onClick={handleClose}>لغو</TexedError>
            <TexedPrimary onClick={handleTagSave}>
              به روز رسانی
            </TexedPrimary>
          </>
        )) || (
          <>
            <TexedError onClick={handleClose}>لغو</TexedError>
            <TexedPrimary
              disabled={
                (theTag?.name?.length ?? 0) === 0 ||
                typeof theTag?.color === typeof undefined
              }
              onClick={handleTagCreate}>
              افزودن
            </TexedPrimary>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
