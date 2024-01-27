import React, { useState, useEffect, useContext } from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  DialogActions,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";

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

export default function Single({ singleOkr, closePopup, loading }) {
  const { theWorkspace, theUsers, setTheUsers } = useContext(workspaceContext);

  const [workspaceUsers, setWorkspaceUsers] = useState(
    theUsers.total !== 0 ? theUsers.data : []
  );
  const [okrStatuses, setOkrStatuses] = useState(
    JSON.parse(localStorage.getItem("meta")).okrStatus
  );
  const [theOkr, setTheOker] = useState({
    title: "",
    assignee: {},
    status: {},
    weight: 1,
    keyResults: [],
  });

  useEffect(() => {
    if( singleOkr!=='create'){
        (async function() {
            // const theOkrData = await getOkr(singleOkr)

            // setTheOker(theOkrData)
        })()
    }
  }, [])

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

  const handleChange = () => {
    console.log("33333333333333333333333333");
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
          <Title value={theOkr?.title ?? ""} />

          <Assignee
            workspaceUsers={workspaceUsers}
            value={theOkr?.assignee?.id ?? workspaceUsers[0]?.id ?? ""}
          />

          <Status
            okrStatuses={okrStatuses}
            value={theOkr?.status?.code ?? okrStatuses[0].code}
          />

          <Weight value={theOkr?.weight ?? ""} />
        </div>
      </DialogTitle>

      <DialogContent style={{ overflow: "visible" }}>
        <Devider spacing={0} line={true}/>
        <h6 className="text-h6 weight-400 my-2">نتایج کلیدی</h6>
        <KeyResults keyResults={theOkr?.keyResults ?? []} />
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
            //   disabled={
            //     (theTimefram?.title?.length ?? 0) === 0 ||
            //     (theTimefram?.description?.length ?? 0) === 0 ||
            //     theTimefram.startDate === null ||
            //     theTimefram.endDate === null
            //   }
            //   onClick={handleTimeframeCreate}
            >
              افزودن
            </TexedPrimary>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
