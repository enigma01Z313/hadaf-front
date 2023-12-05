"use client";

import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Grid,
  Switch,
  TextField,
} from "@mui/material";

import Error from "@/app/components/Shared/Error";
import ContainedPrimary from "@/app/components/Button/ContainedPrimary";

import DoupleActiveSwitch from "@/app/components/DoupleActiveSwitch";
import getWorkspace from "@/app/lib/workspaces/get";
import updateWorkspace from "@/app/lib/workspaces/update";

export default function User({ params }) {
  // const router = useRouter();

  const [workspace, setWorkspace] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [membersNumber, setMembersNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [nameError, setNameError] = useState();
  const [memberError, setMemberError] = useState();
  const [usage, setUsage] = useState(0);

  useEffect(() => {
    (async function () {
      const workspaceData = await getWorkspace(params.id);

      setWorkspace(workspaceData);
      setName(workspaceData.name);
      setDescription(workspaceData.description);
      setMembersNumber(
        typeof workspaceData.membersNumber === "number"
          ? String(workspaceData.membersNumber)
          : workspaceData.membersNumber
      );
      setLoading(false);
    })();
  }, []);

  const formValidate = () => {
    let hasError = false;

    if (name === "") {
      hasError = true;
      setNameError("فیلد اجباری");
    }

    console.log(membersNumber, typeof membersNumber);
    if (membersNumber === "") {
      hasError = true;
      setMemberError("فیلد اجباری");
    } else if (!membersNumber.match(/^\d+$/)) {
      setMemberError("فقط عدد وارد کنید");
    }

    return hasError;
  };

  const updaeWorkspaceForm = async () => {
    const hasError = formValidate();
    const usageType = usage === 0 ? 1 : 0;
    if (!hasError) {
      setLoading(true);

      const { uppedWorkspace } = await updateWorkspace(workspace.id, {
        name,
        membersNumber: +membersNumber,
        usageType,
        description,
      });
      setLoading(false);
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
          value={name}
          onFocus={() => setNameError(undefined)}
          onChange={(e) => setName(e.target.value)}
        />
        {nameError && <Error>{nameError}</Error>}
      </FormControl>
      <FormControl className="rtl-input p-relative w-50">
        <TextField
          id="standard-basic"
          label="تعداد اعضا"
          variant="standard"
          rows={4}
          value={membersNumber}
          onFocus={() => setMemberError(undefined)}
          onChange={(e) => setMembersNumber(e.target.value)}
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormControl>

      <ContainedPrimary
        onClick={updaeWorkspaceForm}
        className="mt-3 justify-center"
        size="large"
      >
        ذخیره
      </ContainedPrimary>
    </div>
  );
}

// export async function generateStaticParams() {
//   const users = await getUsersList();

//   return users.map((item) => ({
//     id: item.id,
//   }));
// }
