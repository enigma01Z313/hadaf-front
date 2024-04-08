import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import TexedError from "@/app/components/Button/TextedError";
import WorkspaceItem from "./WorkspaceItem";

import getUser from "@/app/lib/users/get";
import Devider from "@/app/components/Devider";

export default function WorkspaceSelect({ id, setSingleUserId }) {
  const [loading, setLoading] = useState(true);
  const [workspaces, setWorkspaces] = useState([]);

  useEffect(() => {
    (async function () {
      const userData = await getUser(id);

      setWorkspaces(userData.workspaces);
      setLoading(false);
    })();
  }, []);

  const handleClose = () => setSingleUserId(undefined);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {/* <DialogTitle id="alert-dialog-title">لیست فضاهای کاری</DialogTitle> */}
      <DialogContent className={`pb-0 ${loading ? "loading" : ""}`}>
        {workspaces.map((workspace, index) => (
          <WorkspaceItem
            key={workspace.id}
            workspace={workspace}
            index={index}
            handleClose={handleClose}
          />
        ))}
        <Devider line={true} spaacing={0} color="#222" />
      </DialogContent>
      <DialogActions className="d-flex justify-end">
        <TexedError onClick={() => handleClose()}>بستن</TexedError>
      </DialogActions>
    </Dialog>
  );
}
