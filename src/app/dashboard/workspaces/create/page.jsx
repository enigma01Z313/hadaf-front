"use client";

import React, { useRef, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { FormControl, InputLabel, Input, Grid, TextField } from "@mui/material";

import { toast } from "react-toastify";

import DoupleActiveSwitch from "@/app/components/DoupleActiveSwitch";
import Error from "@/app/components/Shared/Error";
import ContainedPrimary from "@/app/components/Button/ContainedPrimary";
import TexedError from "@/app/components/Button/TextedError";
import TexedPrimary from "@/app/components/Button/TexedPrimary";

import createWorkspace from "@/app/lib/workspaces/create";
import workspaceContext from "@/app/context/workspaceContext";

export default function WorkspaceCreate({
  modal,
  modalClose,
  modalLoading,
  setRealoadList,
}) {
  const router = useRouter();

  const isModal = modal ?? false;

  const name = useRef();
  const membersNumber = useRef();
  const description = useRef();

  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState();
  const [memberError, setMemberError] = useState();
  const [usage, setUsage] = useState(0);
  const { setUserWorkspaces } = useContext(workspaceContext);

  const formValidate = () => {
    let hasError = false;

    if (name.current.value === "") {
      hasError = true;
      setNameError("فیلد اجباری");
    }

    if (membersNumber.current.value === "") {
      hasError = true;
      setMemberError("فیلد اجباری");
    } else if (!membersNumber.current.value.match(/^\d+$/)) {
      setMemberError("فقط عدد وارد کنید");
    }

    return hasError;
  };

  const createWorkspaceForm = async () => {
    const hasError = formValidate();
    const usageType = usage === 0 ? 1 : 0;
    const theUser = JSON.parse(localStorage.getItem("user"));

    if (!hasError) {
      if (modal) modalLoading(true);
      else setLoading(true);

      const workspace = await createWorkspace(
        name.current.value,
        +membersNumber.current.value,
        usageType,
        description?.current?.value ?? "",
        theUser.id
      );
      setUserWorkspaces((old) => [...old, { ...workspace, isActive: false }]);

      if (modal) modalLoading(false);
      else setLoading(false);

      if (!workspace.error && workspace.id) {
        if (modal) {
          toast.success("فضای کاری جدید با موفقیت افزوده شد");
          modalClose();
          setRealoadList((state) => !state);
        } else router.push(`/dashboard/workspaces/${workspace.id}`);
      }
    }
  };

  return (
    <div
      className={`
      d-flex justify-between w-100 align-center 
      ${!isModal ? "py-3 px-2 wrapper-box " : ""}
      ${loading ? "loading" : ""}`}>
      <FormControl className="rtl-input p-relative w-50">
        <InputLabel htmlFor="full-name">نام فضای کاری</InputLabel>
        <Input
          id="full-name"
          aria-describedby="my-helper-text"
          inputRef={name}
          onFocus={() => setNameError(undefined)}
        />
        {nameError && <Error>{nameError}</Error>}
      </FormControl>
      <FormControl className="rtl-input p-relative w-50">
        <InputLabel htmlFor="mobile">تعداد اعضا</InputLabel>
        <Input
          id="mobile"
          aria-describedby="my-helper-text"
          inputRef={membersNumber}
          onFocus={() => setMemberError(undefined)}
          multiline
        />
        {memberError && <Error>{memberError}</Error>}
      </FormControl>
      <FormControl className="mt-3 rtl-input p-relative w-50">
        <span htmlFor="password-re">نوع استفاده</span>

        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item className="text-h6 weight-500">
            شخصی
          </Grid>
          <Grid item>
            <DoupleActiveSwitch
              onChange={(val) => {
                console.log("111111111", val);
              }}
              value={1}
              style="two-active"
            />
          </Grid>
          <Grid item className="text-h6 weight-500">
            سازمانی
          </Grid>
        </Grid>
      </FormControl>
      <FormControl className="mt-3 rtl-input p-relative w-100">
        <TextField
          id="standard-basic"
          label="شرح فعالیت"
          variant="standard"
          multiline
          rows={4}
          inputRef={description}
        />
      </FormControl>

      {(!isModal && (
        <ContainedPrimary
          onClick={createWorkspaceForm}
          className="mt-3 justify-center"
          size="large">
          ثبت فضای کاری جدید
        </ContainedPrimary>
      )) || (
        <div className="w-100 d-flex mt-3 justify-end">
          <TexedError onClick={() => modalClose?.()} className="ml-1">
            منصرف شدن
          </TexedError>
          <TexedPrimary onClick={createWorkspaceForm}>ثبت</TexedPrimary>
        </div>
      )}
    </div>
  );
}
