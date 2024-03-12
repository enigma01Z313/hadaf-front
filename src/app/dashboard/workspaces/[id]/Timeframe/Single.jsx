import React, { useRef, useState, useEffect } from "react";

import {
  FormControl,
  Input,
  DialogActions,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import Devider from "@/app/components/Devider";
import TexedPrimary from "@/app/components/Button/TexedPrimary";
import TexedError from "@/app/components/Button/TextedError";
import TextedInfo from "@/app/components/Button/TextedInfo";
import RangeDatepicker from "./RangeDatepicker";

import createTimeframe from "@/app/lib/timeframes/create";
import getTimeframe from "@/app/lib/timeframes/get";
import updateTimeframe from "@/app/lib/timeframes/update";

export default function Single({
  single,
  setSingle,
  setReloadList,
  theWorkspace,
}) {
  const [loading, setLoading] = useState(false);
  const [theTimefram, setTheTimefarame] = useState({
    title: "",
    description: "",
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    (async function () {
      if (single !== "" && single !== "create") {
        setLoading(true);
        const singleTimefram = await getTimeframe(theWorkspace, single);
        setTheTimefarame(singleTimefram);
        setLoading(false);
      }
    })();
  }, [single]);

  const handleChange = (field, value) => {
    const tfCp = { ...theTimefram };

    tfCp[field] = value;

    setTheTimefarame(tfCp);
  };

  const handleClose = () => setSingle("");

  const handleTimeframeCreate = async () => {
    setLoading(true);
    await createTimeframe(theWorkspace, theTimefram);
    setReloadList((state) => !state);
    setLoading(false);
    handleClose();
  };

  const handleTimeframeSave = async () => {
    setLoading(true);
    await updateTimeframe(
      theTimefram.id,
      {
        status: theTimefram.status.code,
        title: theTimefram.title,
        description: theTimefram.description,
        startDate: theTimefram.startDate,
        endDate: theTimefram.endDate,
      },
      theWorkspace
    );
    setReloadList((state) => !state);
    handleClose();
    setLoading(false);
  };

  const handleTimeframeStatusChange = async (newStatus) => {
    setLoading(true);
    await updateTimeframe(theTimefram.id, { status: newStatus }, theWorkspace);
    setReloadList((state) => !state);
    handleClose();
    setLoading(false);
  };

  return (
    <Dialog
      maxWidth="md"
      fullWidth={true}
      open={open}
      onClose={handleClose}
      PaperProps={{ classes: { root: loading ? "loading " : "over-visible" } }}>
      <DialogTitle>
        <div className="d-flex no-wrap flex-xxs-wrap">
          <FormControl className="rtl-input p-relative w-100">
            <Input
              id="full-name"
              aria-describedby="my-helper-text"
              className="text-h5 py-1"
              value={theTimefram?.title ?? ""}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="نام بازه زمانی..."
              //   inputRef={timeframeTitleRef}
            />
          </FormControl>
          <div className="mr-2 mt-xxs-2 mr-xxs-0" style={{ width: "520px" }}>
            <div className="text-subtitle-1">بازه زمانی</div>

            <RangeDatepicker
              handleChange={handleChange}
              theTimefram={theTimefram}
            />
          </div>
        </div>
      </DialogTitle>
      <DialogContent style={{ overflow: "visible" }}>
        <section className="d-flex">
          <TextField
            className="w-100"
            multiline
            inputProps={{ className: "w-100" }}
            placeholder="توصیحات..."
            rows={4}
            value={theTimefram?.description ?? ""}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </section>
      </DialogContent>
      <Devider line={true} spacing={0} />
      <DialogActions>
        {(single !== "create" && (
          <>
            {(theTimefram?.status?.code === 1 && (
              <TextedInfo
                onClick={() => handleTimeframeStatusChange(0)}
                style={{ marginLeft: "auto", padding: "6px" }}>
                غیر فعال کردن بازه زمانی
              </TextedInfo>
            )) ||
              (theTimefram?.status?.code === 0 && (
                <TexedPrimary
                  onClick={() => handleTimeframeStatusChange(1)}
                  style={{ marginLeft: "auto", padding: "6px" }}>
                  فعال کردن بازه زمانی
                </TexedPrimary>
              ))}
            <TexedError onClick={handleClose}>لغو</TexedError>
            <TexedPrimary onClick={handleTimeframeSave}>
              به روز رسانی
            </TexedPrimary>
          </>
        )) || (
          <>
            <TexedError onClick={handleClose}>لغو</TexedError>
            <TexedPrimary
              disabled={
                (theTimefram?.title?.length ?? 0) === 0 ||
                (theTimefram?.description?.length ?? 0) === 0 ||
                theTimefram.startDate === null ||
                theTimefram.endDate === null
              }
              onClick={handleTimeframeCreate}>
              افزودن
            </TexedPrimary>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
