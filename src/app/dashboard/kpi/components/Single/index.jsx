import React, { useEffect, useState, useContext } from "react";

import PerfectScrollbar from "react-perfect-scrollbar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import Devider from "@/app/components/Devider";
import TexedError from "@/app/components/Button/TextedError";
import workspaceContext from "@/app/context/workspaceContext";
import TexedPrimary from "@/app/components/Button/TexedPrimary";

import Tags from "./Tags";
import Title from "./Title";
import Assignee from "./Assignee";
import Direction from "./Direction";
import ValidDays from "./ValidDays";
import Continuous from "./Continuous";
import TargetValue from "./TargetValue";
import Description from "./Description";
import Calculation from "./Calculation";
import ColoredThreshholds from "./ColoredThreshholds";
// import Colleages from "@/app/dashboard/okr/components/Single/moreInfo/Colleages";
import Colleages from "./Colleages";

import getKpi from "@/app/lib/kpi/get";
import createKPI from "@/app/lib/kpi/create";
import updateKpi from "@/app/lib/kpi/update";
import getUsersList from "@/app/lib/users/list";
import listTags from "@/app/lib/tags/list";

export default function Single({
  closePopup,
  singleKpi,
  setSingleKpi,
  setReloadList,
}) {
  const { theUsers, setTheUsers, theWorkspace } = useContext(workspaceContext);

  const [thresholdsErrors, setThreshholdsErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [theKPI, setTheKPI] = useState({
    name: "",
    description: "",
    targetValue: "",
    thresholdsOne: "",
    thresholdsTwo: "",
    thresholdsThree: "",
    thresholdsFour: "",
    assignee: { id: theUsers?.data?.[0]?.id },
    direction: { code: 0 },
    continuous: { code: 0 },
    colleagues: [],
    tags: [],
    calculationMethod: 0,
    validDays: [1, 2, 3, 4, 5, 6, 7],
  });
  const [theTags, setTheTags] = useState([]);

  const meta = JSON.parse(localStorage.getItem("meta"));
  const continuousList = meta.continuous;
  const directionsList = meta.kpiDirection;
  const calculationMethods = meta.calculationMethod;

  useEffect(() => {
    (async function () {
      if (singleKpi !== "create") {
        setLoading(true);
        const kpiData = await getKpi(theWorkspace, singleKpi);

        setTheKPI({
          ...kpiData,
          colleagues: kpiData.colleagues?.map((item) => item.id),
          tags: kpiData.tags?.map((item) => item.id),
          validDays: kpiData.validDays.map((item) => item.code),
        });
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async function () {
      let usersList;

      if (!theWorkspace) usersList = [];
      else if (theWorkspace && theUsers.total !== 0) usersList = theUsers;
      else {
        usersList = await getUsersList(theWorkspace);
        setTheUsers(usersList);
      }

      if (theWorkspace) {
        const tagsList = await listTags({ workspaceId: theWorkspace });
        setTheTags(tagsList.data);
      }
    })();
  }, [theWorkspace]);

  const changeHandlred = (key, value) => {
    setTheKPI((state) => ({ ...state, [key]: value }));
  };

  const handleKPICreate = async () => {
    setLoading(true);
    const newKPI = await createKPI(theWorkspace, {
      ...theKPI,
      assignee: theKPI.assignee.id,
      continuous: theKPI.continuous.code,
      direction: theKPI.direction.code,
      targetValue: theKPI.targetValue === "" ? undefined : theKPI.targetValue,
      calculationMethod: theKPI.calculationMethod.code,
    });

    setSingleKpi("");
    setLoading(false);
    setReloadList((state) => !state);
  };

  const handleSingleSave = async () => {
    setLoading(true);
    const newKPI = await updateKpi(theWorkspace, theKPI.id, {
      ...theKPI,
      assignee: theKPI.assignee.id ?? theUsers?.data?.[0]?.id,
      continuous: theKPI.continuous.code,
      direction: theKPI.direction.code,
      calculationMethod: theKPI.calculationMethod.code,
      status: theKPI.status.code,
      validDays:
        theKPI.continuous.code === 0
          ? theKPI.validDays.reduce((acc, cur, index) => {
              if (cur.status) {
                acc.push(index);
              }
              return acc;
            }, [])
          : undefined,
    });

    setSingleKpi("");
    setLoading(false);
    setReloadList((state) => !state);
  };

  const isDirectionTresholdsValid = (theKPI) => {
    if (
      theKPI.thresholdsOne === "" ||
      theKPI.thresholdsTwo === "" ||
      theKPI.thresholdsThree === "" ||
      theKPI.thresholdsFour === ""
    )
      return false;

    if (theKPI?.direction?.code === 0) {
      return true;
    }

    const tmpArr = [
      theKPI.thresholdsOne,
      theKPI.thresholdsTwo,
      theKPI.thresholdsThree,
      theKPI.thresholdsFour,
    ];
    const tmpStr = JSON.stringify(tmpArr);

    const sortedArr = tmpArr.sort((a, b) => {
      if (theKPI?.direction?.code === 1) return a - b;
      else return b - a;
    });
    const sortedStr = JSON.stringify(sortedArr);

    if (tmpStr === sortedStr) {
      return true;
    } else {
      return false;
    }
  };

  const checkThreshHoldsError = (direction) => {
    const dir = direction ?? theKPI.direction.code;
    const tmpErrors = [];

    if (theKPI.thresholdsOne === "") tmpErrors.push("بازه رنگی اول اجباری است");
    if (theKPI.thresholdsTwo === "") tmpErrors.push("بازه رنگی دوم اجباری است");
    if (theKPI.thresholdsThree === "")
      tmpErrors.push("بازه رنگی سوم اجباری است");
    if (theKPI.thresholdsFour === "")
      tmpErrors.push("بازه رنگی چهارم اجباری است");

    if (
      dir === 0 ||
      theKPI.thresholdsOne === "" ||
      theKPI.thresholdsTwo === "" ||
      theKPI.thresholdsThree === "" ||
      theKPI.thresholdsFour === ""
    ) {
      setThreshholdsErrors(tmpErrors);
      return;
    }

    const tmpArr = [
      theKPI.thresholdsOne,
      theKPI.thresholdsTwo,
      theKPI.thresholdsThree,
      theKPI.thresholdsFour,
    ];
    const tmpStr = JSON.stringify(tmpArr);

    const sortedArr = tmpArr.sort((a, b) => {
      if (dir === 1) return a - b;
      else return b - a;
    });
    const sortedStr = JSON.stringify(sortedArr);

    if (tmpStr !== sortedStr) {
      tmpErrors.push(
        `بازه های رنگی باید ${dir === 1 ? "صعودی" : "نزولی"} باشند`
      );
    }

    setThreshholdsErrors(tmpErrors);
    return;
  };

  return (
    <Dialog
      maxWidth="sm"
      fullWidth={true}
      open={true}
      onClose={closePopup}
      PaperProps={{
        classes: { root: loading ? "loading" : "over-visible" },
      }}>
      <PerfectScrollbar>
        <DialogTitle>
          <Title value={theKPI?.name ?? ""} changeHandlred={changeHandlred} />
        </DialogTitle>

        <DialogContent style={{ overflow: "visible" }}>
          <Description
            value={theKPI?.description ?? ""}
            changeHandlred={changeHandlred}
          />

          <div className="d-flex no-wrap mt-3">
            <Continuous
              value={theKPI?.continuous?.code ?? continuousList[0].code}
              changeHandlred={changeHandlred}
              continuousList={continuousList}
            />

            <Direction
              value={theKPI?.direction?.code ?? directionsList[0].code}
              changeHandlred={changeHandlred}
              directionsList={directionsList}
              checkThreshHoldsError={checkThreshHoldsError}
            />
          </div>

          <div className="d-flex no-wrap mt-2">
            <TargetValue
              value={theKPI?.targetValue ?? ""}
              changeHandlred={changeHandlred}
            />

            <Assignee
              value={theKPI?.assignee?.id ?? theUsers?.data?.[0]?.id}
              changeHandlred={changeHandlred}
              theUsers={theUsers}
            />
          </div>

          <ColoredThreshholds
            changeHandlred={changeHandlred}
            checkThreshHoldsError={checkThreshHoldsError}
            treshOne={theKPI?.thresholdsOne ?? ""}
            treshTwo={theKPI?.thresholdsTwo ?? ""}
            treshThree={theKPI?.thresholdsThree ?? ""}
            treshFour={theKPI?.thresholdsFour ?? ""}
            thresholdsErrors={thresholdsErrors}
            direction={theKPI?.direction?.code}
          />

          <Accordion className="mt-2" expanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header">
              <span className="text-body-1">گزینه های بیشتر...</span>
            </AccordionSummary>
            <Devider spacing={0} line={true} />
            <AccordionDetails>
              <Colleages
                values={theKPI?.colleagues}
                workspaceUsers={theUsers?.data ?? []}
                changeHandlred={changeHandlred}
              />
              <Devider line={false} spacing={2} />
              <Tags
                values={theKPI?.tags ?? []}
                workspaceTags={theTags ?? []}
                changeHandlred={changeHandlred}
              />
              <Devider line={false} spacing={2} />
              <Calculation
                value={theKPI?.calculationMethod?.code ?? 0}
                calculationMethods={calculationMethods}
                changeHandlred={changeHandlred}
              />
              {theKPI.continuous.code === 0 && (
                <ValidDays
                  value={theKPI?.validDays}
                  changeHandlred={changeHandlred}
                />
              )}
            </AccordionDetails>
          </Accordion>
        </DialogContent>

        <DialogActions>
          {(singleKpi !== "create" && (
            <>
              <TexedError onClick={closePopup}>لغو</TexedError>
              <TexedPrimary onClick={handleSingleSave}>
                به روز رسانی
              </TexedPrimary>
            </>
          )) || (
            <>
              <TexedError onClick={closePopup}>لغو</TexedError>
              <TexedPrimary
                disabled={
                  (theKPI?.name ?? "") === "" ||
                  (theKPI?.assignee?.id ?? "") === "" ||
                  !isDirectionTresholdsValid(theKPI)
                }
                onClick={handleKPICreate}>
                افزودن
              </TexedPrimary>
            </>
          )}
        </DialogActions>
      </PerfectScrollbar>
    </Dialog>
  );
}
