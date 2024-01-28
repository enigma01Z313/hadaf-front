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

import Title from "./header/Title";
import Assignee from "./header/Assignee";
import Status from "./header/Status";
import Weight from "./header/Weight";
import KeyResults from "./keyResults";
import Timeframe from "./moreInfo/Timeframe";
import ParentOkr from "./moreInfo/ParentOkr";
import Accesslevel from "./moreInfo/Accesslevel";
import Colleages from "./moreInfo/Colleages";

export default function Single({ singleOkr, closePopup, loading }) {
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
        // const theOkrData = await getOkr(singleOkr)
        // setTheOker(theOkrData)
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

      //   console.log('0000000000000000000000000000');
      //   console.log(usersList.data.map((user) => ({ ...user, isFiltered: true })));
      setWorkspaceUsers(
        usersList.data.map((user) => ({ ...user, isFiltered: true }))
      );
    })();
  }, [theWorkspace]);

  const changeHandlred = (key, value) => {
    setTheOker((state) => ({ ...state, [key]: value }));
  };

  const handleOkrCreate = () => {
    console.log("create new okr");
    console.log(theOkr);
  };

  return (
    <Dialog
      maxWidth="lg"
      fullWidth={true}
      open={true}
      onClose={closePopup}
      PaperProps={{ classes: { root: loading ? "loading " : "over-visible" } }}>
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

          <Weight
            value={theOkr?.weight ?? ""}
            changeHandlred={changeHandlred}
          />
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
            // onClick={handleTimeframeSave}
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
