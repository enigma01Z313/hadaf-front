import React, { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import UserCreate from "@/app/dashboard/users/create/page";
import AddUserToWorkspace from "../AddUserToWorkspace";
import permissionChec from "@/app/utils/permissionCheck";

export default function Create({ open, setMode, setRealoadList }) {
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setMode("list");
  };

  const isSuperAdmin = permissionChec("SUPER_USER");
  const isStandardUser = permissionChec("STANDARD");

  return (
    <Dialog
      maxWidth="md"
      open={open}
      onClose={handleClose}
      PaperProps={{ classes: { root: loading ? "loading " : "" } }}>
      <DialogTitle>افزودن کاربر جدید</DialogTitle>
      <DialogContent>
        {(isSuperAdmin && (
          <UserCreate
            modal={true}
            modalClose={handleClose}
            modalLoading={setLoading}
            setRealoadList={setRealoadList}
          />
        )) ||
          (isStandardUser && (
            <AddUserToWorkspace
              modalClose={handleClose}
              modalLoading={setLoading}
              setRealoadList={setRealoadList}
            />
          ))}
      </DialogContent>
    </Dialog>
  );
}
