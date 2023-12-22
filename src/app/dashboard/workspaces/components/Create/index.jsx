import React, { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import WorkspaceCreate from "@/app/dashboard/workspaces/create/page";

export default function Create({ open, setMode, setRealoadList }) {
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setMode("list");
  };

  return (
    <Dialog
      maxWidth="md"
      open={open}
      onClose={handleClose}
      PaperProps={{ classes: { root: loading ? "loading " : "" } }}>
      <DialogTitle>ثبت فضای کاری جدید</DialogTitle>
      <DialogContent>
        <WorkspaceCreate
          modal={true}
          modalClose={handleClose}
          modalLoading={setLoading}
          setRealoadList={setRealoadList}
        />
      </DialogContent>
    </Dialog>
  );
}
