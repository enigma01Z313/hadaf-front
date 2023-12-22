import React, { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import UserCreate from "@/app/dashboard/users/create/page";

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
      <DialogTitle>ثبت کاربر جدید</DialogTitle>
      <DialogContent>
        <UserCreate
          modal={true}
          modalClose={handleClose}
          modalLoading={setLoading}
          setRealoadList={setRealoadList}
        />
      </DialogContent>
    </Dialog>
  );
}
