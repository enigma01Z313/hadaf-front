import React, { useState } from "react";

import PerfectScrollbar from "react-perfect-scrollbar";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import UserCreate from "@/app/dashboard/users/create/page";
import AddUserToWorkspace from "../AddUserToWorkspace";
import permissionChec from "@/app/utils/permissionCheck";

export default function Create({ open, setMode, setRealoadList }) {
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setMode("list");
  };

  const isSuperAdmin = permissionChec("SUPER_USER");
  const isAdmin = permissionChec("ADMIN");
  const isStandardUser = permissionChec("STANDARD");

  return (
    <Dialog
      maxWidth="md"
      open={open}
      onClose={handleClose}
      PaperProps={{ classes: { root: loading ? "loading " : "" } }}>
      <PerfectScrollbar>
        <DialogTitle>افزودن کاربر جدید</DialogTitle>
        <DialogContent>
          {((isSuperAdmin || isAdmin) && (
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
      </PerfectScrollbar>
    </Dialog>
  );
}
