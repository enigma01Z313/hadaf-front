"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FormControl,
  InputLabel,
  Input,
  Grid,
  Switch,
  TextField,
} from "@mui/material";

import DoupleActiveSwitch from "@/app/components/DoupleActiveSwitch";
import Error from "@/app/components/Shared/Error";
import ContainedPrimary from "@/app/components/Button/ContainedPrimary";

import createWorkspace from "@/app/lib/workspaces/create";

export default function UserCreate() {
  const router = useRouter();

  const name = useRef();
  const membersNumber = useRef();
  const description = useRef();

  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState();
  const [memberError, setMemberError] = useState();
  const [usage, setUsage] = useState(0);

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
    const theUser = JSON.parse(localStorage.getItem('user'))

    if (!hasError) {
      setLoading(true);
      const workspace = await createWorkspace(
        name.current.value,
        +membersNumber.current.value,
        usageType,
        description?.current?.value ?? "",
        theUser.id
      );

      setLoading(false);
      if (!workspace.error) {
        router.push(`/dashboard/workspaces/${workspace.id}`);
      }
    }
  };

  return (
    <div
      className={`
      d-flex justify-between w-100 py-3 px-2 wrapper-box align-center
      ${loading ? "loading" : ""}`}
    >
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

      <ContainedPrimary
        onClick={createWorkspaceForm}
        className="mt-3 justify-center"
        size="large"
      >
        ثبت فضای کاری جدید
      </ContainedPrimary>
    </div>
  );
}
