import React, { useState, useEffect, useContext } from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogActions } from "@mui/material";

import Devider from "@/app/components/Devider";
import TexedPrimary from "@/app/components/Button/TexedPrimary";
import TexedError from "@/app/components/Button/TextedError";
import workspaceContext from "@/app/context/workspaceContext";
import getUsersList from "@/app/lib/users/list";
import getOkr from "@/app/lib/okr/get";

import Title from "./header/Title";
import Assignee from "./header/Assignee";
import Status from "./header/Status";
import Weight from "./header/Weight";
import OkrFrom from "./header/OkrFrom";
import OkrTo from "./header/OkrTo";
import KeyResults from "./keyResults";
import Timeframe from "./moreInfo/Timeframe";
import ParentOkr from "./moreInfo/ParentOkr";
import Accesslevel from "./moreInfo/Accesslevel";
import Colleages from "./moreInfo/Colleages";

import createOkr from "@/app/lib/okr/create";
import Gauge from "@/app/components/Gauge";

export default function Single({
  singleOkr,
  setSingleOkr,
  closePopup,
  saveCurrentOkr,
}) {
  const [loading, setLoading] = useState(false);
  const { theWorkspace, theUsers, setTheUsers, theWorkspaceTimeframes } =
    useContext(workspaceContext);

  const [workspaceUsers, setWorkspaceUsers] = useState(
    theUsers.total !== 0 ? theUsers.data : []
  );

  const [okrStatuses, setOkrStatuses] = useState(
    JSON.parse(localStorage.getItem("meta")).okrStatus
  );

  const [theOkr, setTheOker] = useState({
    title: "",
    assignee: theUsers.data[0]?.id ?? "",
    status: okrStatuses[0].code,
    weight: 1,
    keyResults: [],
    timeFrame: theWorkspaceTimeframes?.[0]?.id ?? "",
    targetParent: "",
    access: 1,
    colleagues: [],
  });

  useEffect(() => {
    if (singleOkr !== "create") {
      (async function () {
        setLoading(true);
        const theOkrData = await getOkr(theWorkspace, singleOkr);

        setTheOker({
          ...theOkrData,
          timeFrame: theOkrData.timeFrame.id,
          assignee: theOkrData.assignee.id,
          status: theOkrData.status.code,
          access: theOkrData.access.code,
          colleagues: theOkrData.colleagues.map((item) => item.id),
        });
        setLoading(false);
      })();
    }
  }, []);

  useEffect(() => {
    (async function () {
      let usersList;

      if (!theWorkspace) usersList = [];
      else if (theWorkspace && theUsers.total !== 0) usersList = theUsers;
      else {
        usersList = await getUsersList(theWorkspace);
        setTheUsers(usersList);
      }

      setWorkspaceUsers(
        usersList.data.map((user) => ({ ...user, isFiltered: true }))
      );
    })();
  }, [theWorkspace]);

  const changeHandlred = (key, value) => {
    setTheOker((state) => ({ ...state, [key]: value }));
  };

  const handleOkrCreate = async () => {
    setLoading(true);
    await createOkr(theWorkspace, theOkr);
    setSingleOkr("");
    setLoading(false);
  };

  return (
    <Dialog
      maxWidth="lg"
      fullWidth={true}
      open={true}
      onClose={closePopup}
      PaperProps={{ classes: { root: loading ? "loading" : "over-visible" } }}>
      <DialogTitle>
        <div className="d-flex no-wrap">
          <Title changeHandlred={changeHandlred} value={theOkr?.title ?? ""} />

          <Assignee
            workspaceUsers={workspaceUsers}
            value={theOkr?.assignee}
            changeHandlred={changeHandlred}
          />

          <Status
            okrStatuses={okrStatuses}
            value={theOkr?.status}
            changeHandlred={changeHandlred}
          />

          <OkrFrom value={theOkr?.from ?? ""} changeHandlred={changeHandlred} />

          <OkrTo value={theOkr?.to ?? ""} changeHandlred={changeHandlred} />

          <Weight
            value={theOkr?.weight ?? ""}
            changeHandlred={changeHandlred}
          />

          <Gauge value={theOkr.progress}/>
        </div>
      </DialogTitle>

      <DialogContent style={{ overflow: "visible" }}>
        <Devider spacing={0} line={true} />
        <h6 className="text-h6 weight-400 my-2">نتایج کلیدی</h6>
        <KeyResults
          keyResults={theOkr?.keyResults ?? []}
          setTheOkr={setTheOker}
        />
        <Devider line={true} spacing={2} />
        <div className="d-flex">
          <Timeframe value={theOkr.timeFrame} changeHandlred={changeHandlred} />

          <ParentOkr
            value={theOkr.targetParent}
            changeHandlred={changeHandlred}
            // okrs={okrs}
          />

          <Accesslevel value={theOkr.access} changeHandlred={changeHandlred} />

          <Colleages
            workspaceUsers={workspaceUsers}
            values={theOkr.colleagues}
            changeHandlred={changeHandlred}
          />
        </div>
      </DialogContent>

      <Devider line={true} spacing={0} />
      <DialogActions>
        {(singleOkr !== "create" && (
          <>
            <TexedError onClick={closePopup}>لغو</TexedError>
            <TexedPrimary
            onClick={() => saveCurrentOkr(singleOkr, theOkr)}
            >
              به روز رسانی
            </TexedPrimary>
          </>
        )) || (
          <>
            <TexedError onClick={closePopup}>لغو</TexedError>
            <TexedPrimary
              disabled={
                theOkr.title.length === 0 || theOkr.keyResults.length === 0
              }
              onClick={handleOkrCreate}>
              افزودن
            </TexedPrimary>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
