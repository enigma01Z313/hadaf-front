import React, { useEffect, useState } from "react";

import { DialogActions, TextField, Dialog, DialogContent } from "@mui/material";

import { MuiColorInput } from "mui-color-input";

import Devider from "@/app/components/Devider";
import TexedPrimary from "@/app/components/Button/TexedPrimary";
import TexedError from "@/app/components/Button/TextedError";

import createMerit from "@/app/lib/merits/create";
import updateMerit from "@/app/lib/merits/update";

export default function Single({
  single,
  setSingle,
  setReloadList,
  theWorkspace,
  merits,
}) {
  const [loading, setLoading] = useState(false);
  const [theMerit, setTheMerit] = useState({
    id: undefined,
    name: "",
    description: "",
  });

  useEffect(() => {
    if (single !== "create") {
      const targetMerit = merits.find((item) => item.id === single);

      setTheMerit({
        title: targetMerit.title,
        description: targetMerit.description,
        id: targetMerit.id,
      });
    }
  }, []);

  const handleChange = (color) => {
    setTheMerit((state) => ({ ...state, color }));
  };

  const handleClose = () => setSingle("");

  const handleMeritCreate = async () => {
    setLoading(true);
    await createMerit(theWorkspace, theMerit);
    setReloadList((state) => !state);
    setLoading(false);
    handleClose();
  };

  const handleMeritSave = async () => {
    setLoading(true);
    await updateMerit(theWorkspace, theMerit.id, theMerit);
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
            label="نام ارزش"
            className="rtl-input w-100 mb-4"
            inputProps={{ className: "w-100" }}
            placeholder="نام ارزش"
            variant="standard"
            value={theMerit?.title ?? ""}
            onChange={(e) =>
              setTheMerit((state) => ({ ...state, title: e.target.value }))
            }
          />
          <TextField
            multiline
            rows={4}
            label="توضیحات ارزش"
            className="rtl-input w-100 mb-4"
            inputProps={{ className: "w-100" }}
            placeholder="توضیحات ارزش"
            variant="standard"
            value={theMerit?.description ?? ""}
            onChange={(e) =>
              setTheMerit((state) => ({ ...state, description: e.target.value }))
            }
          />
        </section>
      </DialogContent>
      <Devider line={true} spacing={0} />
      <DialogActions>
        {(single !== "create" && (
          <>
            <TexedError onClick={handleClose}>لغو</TexedError>
            <TexedPrimary onClick={handleMeritSave}>به روز رسانی</TexedPrimary>
          </>
        )) || (
          <>
            <TexedError onClick={handleClose}>لغو</TexedError>
            <TexedPrimary
              disabled={
                (theMerit?.title?.length ?? 0) === 0 ||
                (theMerit?.description?.length ?? 0) === 0
              }
              onClick={handleMeritCreate}>
              افزودن
            </TexedPrimary>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
