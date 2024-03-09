import React, { useContext } from "react";
import { toast } from "react-toastify";

import workspaceContext from "@/app/context/workspaceContext";
import Devider from "@/app/components/Devider";

export default function WorkspaceItem({ workspace, index, handleClose }) {
  const { setTheWorkspace, setTheWorkspaceFull } = useContext(workspaceContext);

  const handleSelectWp = () => {
    setTheWorkspace(workspace.id);
    setTheWorkspaceFull(workspace);
    toast.success(`فضای کاری به ${workspace.name} تغییر کرد`);
    setTimeout(function () {
      handleClose();
    }, 2000);
  };

  return (
    <>
      {index !== 0 && <Devider spacing={1} line={true} />}
      <div className={`text-body-1 cursor-pointer`} onClick={handleSelectWp}>
        {workspace.name}
      </div>
    </>
  );
}
