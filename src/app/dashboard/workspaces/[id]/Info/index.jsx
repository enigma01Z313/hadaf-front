import React, { useEffect, useState, useContext } from "react";

import {
  FormControl,
  InputLabel,
  Input,
  Grid,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";

import workspaceContext from "@/app/context/workspaceContext";

import Error from "@/app/components/Shared/Error";
import ContainedPrimary from "@/app/components/Button/ContainedPrimary";
import DoupleActiveSwitch from "@/app/components/DoupleActiveSwitch";

import getWorkspace from "@/app/lib/workspaces/get";
import updateWorkspace from "@/app/lib/workspaces/update";
import getPlans from "@/app/lib/plan/list";

export default function Info({ params }) {
  const [plans, setPlans] = useState([]);
  const [workspace, setWorkspace] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [membersNumber, setMembersNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [nameError, setNameError] = useState();
  const [memberError, setMemberError] = useState();
  const [activePlan, setActivePlan] = useState({});
  const [reservePlan, setReservePlan] = useState({});

  const [usage, setUsage] = useState(0);
  const { setUserWorkspaces, theWorkspace } = useContext(workspaceContext);

  useEffect(() => {
    (async function () {
      const workspaceData = await getWorkspace(theWorkspace ?? params.id);
      const plansList = await getPlans();

      setPlans(plansList);
      setWorkspace(workspaceData);
      setName(workspaceData.name);
      setDescription(workspaceData.description);
      setMembersNumber(
        typeof workspaceData.membersNumber === "number"
          ? String(workspaceData.membersNumber)
          : workspaceData.membersNumber
      );
      setLoading(false);

      if (
        workspaceData.activePlan &&
        !Object.is(null, workspaceData.activePlan)
      )
        setActivePlan(workspaceData.activePlan.id);
      else setActivePlan("");

      if (
        workspaceData.reservePlan &&
        !Object.is(null, workspaceData.reservePlan)
      )
        setReservePlan(workspaceData.reservePlan.id);
      else setReservePlan("");
    })();
  }, [params.id, theWorkspace]);

  const formValidate = () => {
    let hasError = false;

    if (name === "") {
      hasError = true;
      setNameError("فیلد اجباری");
    }

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

      const data = {
        name,
        membersNumber: +membersNumber,
        usageType,
        description,
      };

      if (workspace?.activePlan?.id && activePlan !== workspace.activePlan.id)
        data.activePlan = activePlan;

      if (reservePlan !== workspace?.reserve?.id)
        data.reservePlan = reservePlan;

      const aa = await updateWorkspace(workspace.id, data);

      setUserWorkspaces((old) =>
        old.map((item) => ({
          ...item,
          name: item.id === workspace.id ? name : item.name,
        }))
      );

      setLoading(false);
    }
  };

  return (
    <div
      className={`d-flex justify-between w-100 py-3 px-2 wrapper-box align-center
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
      <FormControl className="mt-4 rtl-input p-relative w-100">
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

      <section className="w-100 d-flex no-wrap mt-2">
        <div className="grow-1 ml-2">
          <FormControl
            id="okr-owner-select-wrap"
            fullWidth
            variant="standard"
            className="rtl-input p-relative w-100"
          >
            <InputLabel id="okr-owner-select-label">پلن جاری</InputLabel>
            <Select
              labelId="okr-owner-select-label"
              id="okr-owner-select"
              value={activePlan ?? ""}
              onChange={(e) => setActivePlan(e.target.value)}
              className="text-h6 py-1"
            >
              {plans &&
                plans
                  ?.filter((plan) => plan.name !== "سازمانی")
                  ?.map((plan) => (
                    <MenuItem key={plan.id} value={plan.id}>
                      {plan.name} ({plan.duration} روزه)
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>
        </div>
        <div className="grow-1">
          <FormControl
            id="okr-owner-select-wrap"
            fullWidth
            variant="standard"
            className="rtl-input p-relative w-100"
          >
            <InputLabel id="okr-owner-select-label">پلن رزرو</InputLabel>
            <Select
              labelId="okr-owner-select-label"
              id="okr-owner-select"
              value={reservePlan ?? ""}
              onChange={(e) => setReservePlan(e.target.value)}
              className="text-h6 py-1"
            >
              {plans &&
                plans
                  ?.filter((plan) => plan.name !== "سازمانی")
                  ?.map((plan) => (
                    <MenuItem key={plan.id} value={plan.id}>
                      {plan.name} ({plan.duration} روزه)
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>
        </div>
      </section>

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
