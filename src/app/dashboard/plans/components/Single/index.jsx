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
import formatReadableNumber from "@/app/utils/formatNumber";

import createPlan from "@/app/lib/plan/create";
import updatePlan from "@/app/lib/plan/update";

export default function Single({
  closePopup,
  singlePlan,
  setSinglePlan,
  setReloadList,
  plans,
}) {
  const { theWorkspace } = useContext(workspaceContext);

  const [thePlan, setThePlan] = useState({
    name: "",
    amount: "",
    discount: "",
    freeDays: "",
    duration: "",
    membersNumber: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (singlePlan !== "create") {
      const targetPlan = plans.find((item) => item.id === singlePlan);

      if (!targetPlan) setSinglePlan("");

      setThePlan(targetPlan);
    }
  }, []);

  const handleTeamUpdate = async () => {
    setLoading(true);
    await updatePlan(thePlan.id, {
      ...thePlan,
      amount: parseInt(thePlan.amount),
      discount: parseInt(thePlan.discount),
      duration: parseInt(thePlan.duration),
      freeDays: parseInt(thePlan.freeDays),
    });
    setSinglePlan("");
    setLoading(false);
    setReloadList((state) => !state);
  };

  const handlePlanCreate = async () => {
    setLoading(true);
    await createPlan(thePlan);
    setSinglePlan("");
    setLoading(false);
    setReloadList((state) => !state);
  };

  const handleChange = (key, value) =>
    setThePlan((state) => ({ ...state, [key]: value }));

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
          <section className="w-100 d-flex justify-between mt-2">
            <div className={`mb-2 ${singlePlan === 'create' ? 'w-50' : 'w-100'}`}>
              <FormControl className="rtl-input p-relative w-100">
                <TextField
                  label="نام پلن"
                  className="w-100"
                  placeholder="نام پلن..."
                  value={thePlan.name ?? ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                  variant="standard"
                />
              </FormControl>
            </div>

            {singlePlan === "create" && (
              <div className="w-50 mb-2">
                <FormControl className="rtl-input p-relative w-100">
                  <TextField
                    label="تعداد اعضا"
                    className="w-100"
                    placeholder="30"
                    value={thePlan.membersNumber ?? ""}
                    onChange={(e) =>
                      handleChange(
                        "membersNumber",
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                    variant="standard"
                  />
                </FormControl>
              </div>
            )}

            {singlePlan === "create" && (
              <div className="w-50 mb-2">
                <FormControl className="rtl-input p-relative w-100">
                  <TextField
                    label="تعداد روز پلن"
                    className="w-100"
                    placeholder="30"
                    value={thePlan.duration ?? ""}
                    onChange={(e) =>
                      handleChange(
                        "duration",
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                    variant="standard"
                  />
                </FormControl>
              </div>
            )}

            {singlePlan === "create" && (
              <div className="w-50 mb-2">
                <FormControl className="rtl-input p-relative w-100">
                  <TextField
                    label="تعداد روز های رایگان"
                    className="w-100"
                    placeholder="5"
                    value={thePlan.freeDays ?? ""}
                    onChange={(e) =>
                      handleChange(
                        "freeDays",
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                    variant="standard"
                  />
                </FormControl>
              </div>
            )}

            <div className={`w-${singlePlan !== "create" ? "100" : "50"} mb-2`}>
              <FormControl className="rtl-input p-relative w-100">
                <TextField
                  label="قیمت پلن(تومان)"
                  className="w-100"
                  placeholder="30000"
                  value={
                    thePlan.amount ? formatReadableNumber(thePlan.amount) : ""
                  }
                  onChange={(e) =>
                    handleChange("amount", e.target.value.replace(/\D/g, ""))
                  }
                  variant="standard"
                />
              </FormControl>
            </div>

            {singlePlan === "create" && (
              <div className="w-50 mb-2">
                <FormControl className="rtl-input p-relative w-100">
                  <TextField
                    label="تخفیف پلن(تومان)"
                    className="w-100"
                    placeholder="5000"
                    value={
                      thePlan.discount
                        ? formatReadableNumber(thePlan.discount)
                        : ""
                    }
                    onChange={(e) =>
                      handleChange(
                        "discount",
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                    variant="standard"
                  />
                </FormControl>
              </div>
            )}
          </section>
        </DialogContent>
        <Devider line={true} spacing={0} />
        <DialogActions>
          {(singlePlan !== "create" && (
            <>
              <TexedError onClick={closePopup}>لغو</TexedError>
              <TexedPrimary
                disabled={
                  (String(thePlan.name.length) ?? "") === 0 ||
                  (String(thePlan.amount.length) ?? "") === 0 ||
                  thePlan.duration.length === 0
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
                  (String(thePlan.name.length) ?? "") === 0 ||
                  (String(thePlan.amount.length) ?? "") === 0 ||
                  thePlan.duration.length === 0
                }
                onClick={handlePlanCreate}
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
