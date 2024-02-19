import React, { useEffect, useState, useContext } from "react";

import { DialogActions, TextField, Dialog, DialogContent } from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";

import Devider from "@/app/components/Devider";
import TexedError from "@/app/components/Button/TextedError";
import TexedPrimary from "@/app/components/Button/TexedPrimary";
import workspaceContext from "@/app/context/workspaceContext";
import Receivers from "./Receivers";
import Merits from "./Merits";

import getUsersList from "@/app/lib/users/list";
import listMerits from "@/app/lib/merits/list";
import createAdmiration from "@/app/lib/admiration/create";
import getAdmiration from "@/app/lib/admiration/get";
import updateAdmiration from "@/app/lib/admiration/update";
import deleteAdmiration from "@/app/lib/admiration/delete";

export default function Single({
  closePopup,
  singleAdmiration,
  setReloadList,
  setSingleAdmiration,
  admirations,
}) {
  const { theUsers, setTheUsers, theMerits, setTheMerits, theWorkspace } =
    useContext(workspaceContext);

  const [theAdmiration, setTheAdmiration] = useState({
    receivers: [],
    merits: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (singleAdmiration !== "create") {
      (async function () {
        const admirationData = await getAdmiration(
          theWorkspace,
          singleAdmiration
        );

        setTheAdmiration({
          ...admirationData,
          receivers: admirationData.receivers.map((item) => item.id),
          merits: admirationData.merits.map((item) => item.id),
        });
      })();
    }
  }, []);

  useEffect(() => {
    (async function () {
      let usersList, meritsList;

      if (!theWorkspace) usersList = [];
      else if (theWorkspace && (theUsers?.total ?? 0) !== 0)
        usersList = theUsers;
      else {
        usersList = await getUsersList(theWorkspace);
        setTheUsers(usersList);
      }

      if (!theWorkspace) usersList = [];
      else if (theWorkspace && (theMerits?.total ?? 0) !== 0)
        meritsList = theMerits;
      else {
        meritsList = await listMerits({ workspaceId: theWorkspace });
        setTheMerits(meritsList);
      }
    })();
  }, [theWorkspace]);

  const handleAdmirationUpdate = async () => {
    // console.log("1-update-------------------");
    // console.log(theAdmiration);

    setLoading(true);
    await updateAdmiration(theWorkspace, theAdmiration.id, {
      receivers: theAdmiration.receivers,
      merits: theAdmiration.merits,
      text: theAdmiration.text
    });
    setSingleAdmiration("");
    setLoading(false);
    setReloadList((state) => !state);
  };

  const handleAdmirationCreate = async () => {
    // console.log("-create");
    // console.log(theAdmiration);

    setLoading(true);
    await createAdmiration(theWorkspace, theAdmiration);
    setSingleAdmiration("");
    setLoading(false);
    setReloadList((state) => !state);
  };

  const handleChange = (key, value) =>
    setTheAdmiration((state) => ({ ...state, [key]: value }));

  return (
    <Dialog
      maxWidth="sm"
      fullWidth={true}
      open={true}
      onClose={closePopup}
      PaperProps={{ classes: { root: loading ? "loading " : "over-visible" } }}>
      <PerfectScrollbar>
        <DialogContent style={{ overflow: "visible" }}>
          <section className="d-flex direction-column mb-2">
            <Receivers
              values={theAdmiration.receivers}
              workspaceUsers={theUsers?.data ?? []}
              changeHandlred={handleChange}
            />
          </section>

          <section className="w-100 mb-2">
            <TextField
              multiline
              rows={5}
              className="w-100"
              placeholder="متن تحسین"
              value={theAdmiration.text ?? ""}
              onChange={(e) => handleChange("text", e.target.value)}
              variant="standard"
            />
          </section>

          <section>
            <Merits
              values={theAdmiration?.merits}
              workspaceUsers={theMerits?.data ?? []}
              changeHandlred={handleChange}
            />
          </section>
        </DialogContent>
        <Devider line={true} spacing={0} />
        <DialogActions>
          {(singleAdmiration !== "create" && (
            <>
              <TexedError onClick={closePopup}>لغو</TexedError>
              <TexedPrimary onClick={handleAdmirationUpdate}>
                به روز رسانی
              </TexedPrimary>
            </>
          )) || (
            <>
              <TexedError onClick={closePopup}>لغو</TexedError>
              <TexedPrimary
                disabled={(theAdmiration?.text?.length ?? 0) === 0}
                onClick={handleAdmirationCreate}>
                افزودن
              </TexedPrimary>
            </>
          )}
        </DialogActions>
      </PerfectScrollbar>
    </Dialog>
  );
}
