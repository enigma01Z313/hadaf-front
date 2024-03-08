import React, { useEffect, useState, useContext } from "react";

import {
  DialogActions,
  TextField,
  Dialog,
  DialogContent,
  FormControl,
} from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";

import Devider from "@/app/components/Devider";
import TexedError from "@/app/components/Button/TextedError";
import TexedPrimary from "@/app/components/Button/TexedPrimary";
import workspaceContext from "@/app/context/workspaceContext";
import Colleages from "@/app/dashboard/okr/components/Single/moreInfo/Colleages";

import getTeam from "@/app/lib/workspaces/team/get";
import updateTeam from "@/app/lib/workspaces/team/update";
import createTeam from "@/app/lib/workspaces/team/add";
import getWorkspaceUsersList from "@/app/lib/workspaces/users/list";

export default function Single({
  closePopup,
  singleTeam,
  setSingleTeam,
  setReloadList,
}) {
  const { theUsers, setTheUsers, theWorkspace } = useContext(workspaceContext);

  const [theTeam, setTheTeam] = useState({
    name: "",
    target: "",
    colleagues: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (singleTeam !== "create") {
      (async function () {
        setLoading(true);
        const teamData = await getTeam(theWorkspace, singleTeam);

        setTheTeam({
          ...teamData,
          colleagues: teamData.members.map((item) => item.id),
        });
        setLoading(false);
      })();
    }
  }, []);

  useEffect(() => {
    if (theWorkspace) {
      (async function () {
        if (theUsers.total === 0) {
          const usersList = await getWorkspaceUsersList(theWorkspace);

          setTheUsers(usersList);
        }
      })();
    }
  }, [theWorkspace]);

  const handleTeamUpdate = async () => {
    setLoading(true);
    await updateTeam(theWorkspace, theTeam.id, {
      ...theTeam,
      members: theTeam.colleagues,
    });
    setSingleTeam("");
    setLoading(false);
    setReloadList((state) => !state);
  };

  const handleTeamCreate = async () => {
    setLoading(true);
    await createTeam(theWorkspace, { ...theTeam, members: theTeam.colleagues });
    setSingleTeam("");
    setLoading(false);
    setReloadList((state) => !state);
  };

  const handleChange = (key, value) =>
    setTheTeam((state) => ({ ...state, [key]: value }));

  return (
    <Dialog
      maxWidth="sm"
      fullWidth={true}
      open={true}
      onClose={closePopup}
      PaperProps={{ classes: { root: loading ? "loading " : "over-visible" } }}
    >
      <PerfectScrollbar>
        <DialogContent style={{ overflow: "visible" }}>
          <section>
            <FormControl className="rtl-input p-relative w-100">
              <TextField
                label="نام تیم"
                className="w-100"
                placeholder="هدف تیم..."
                value={theTeam.name ?? ""}
                onChange={(e) => handleChange("name", e.target.value)}
                variant="standard"
              />
            </FormControl>
          </section>

          <section className="w-100 mt-2 mb-2">
            <FormControl className="rtl-input p-relative w-100">
              <TextField
                label="هدف تیم"
                multiline
                rows={5}
                className="w-100"
                placeholder="هدف تیم..."
                value={theTeam.target ?? ""}
                onChange={(e) => handleChange("target", e.target.value)}
                variant="standard"
              />
            </FormControl>
          </section>

          <Colleages
            workspaceUsers={theUsers.data ?? []}
            values={theTeam.colleagues}
            changeHandlred={handleChange}
          />
          {/* <section>
            <Merits
              values={theAdmiration?.merits}
              workspaceUsers={theMerits?.data ?? []}
              changeHandlred={handleChange}
            />
          </section> */}
        </DialogContent>
        <Devider line={true} spacing={0} />
        <DialogActions>
          {(singleTeam !== "create" && (
            <>
              <TexedError onClick={closePopup}>لغو</TexedError>
              <TexedPrimary
                disabled={
                  (theTeam?.name?.length ?? 0) === 0 ||
                  theTeam.colleagues.length === 0
                }
                onClick={handleTeamUpdate}
              >
                به روز رسانی
              </TexedPrimary>
            </>
          )) || (
            <>
              <TexedError onClick={closePopup}>لغو</TexedError>
              <TexedPrimary
                disabled={
                  (theTeam?.name?.length ?? 0) === 0 ||
                  theTeam.colleagues.length === 0
                }
                onClick={handleTeamCreate}
              >
                افزودن
              </TexedPrimary>
            </>
          )}
        </DialogActions>
      </PerfectScrollbar>
    </Dialog>
  );
}
