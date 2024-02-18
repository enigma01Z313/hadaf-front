import React, { useState, useEffect } from "react";

import { getYear, subYears, addYears } from "date-fns-jalali";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { newDate, startOfYear } from "date-fns-jalali-3";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TexedError from "@/app/components/Button/TextedError";
import Devider from "@/app/components/Devider";

import getAmounts from "@/app/lib/kpi/amounts/list";
import TexedInherit from "@/app/components/Button/TexedInherit";
import ContainedInheritText from "@/app/components/Button/ContainedInheritText";

export default function Amount({ setOpenAmount, kpiId, title, continuous }) {
  const startDate = startOfYear(new Date("2021-3-24"));
  const [enteredAmounts, setEnteredAmounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [amounts, setAmounts] = useState({});
  const [patchIndex, setPatchIndex] = useState(
    Math.floor((getYear(new Date()) - getYear(startDate)) / 5)
  );

  const closePopup = () => setOpenAmount(false);

  useEffect(() => {
    (async function () {
      const amounts = await getAmounts(kpiId);
      setEnteredAmounts(amounts?.data ?? []);
    })();
  }, []);

  useEffect(() => {
    if (continuous === "seasonal") {
    } else if (continuous === "yearly") {
      const currentAmountDate = getYear(new Date());

      amounts[getYear(subYears(new Date(), 2))] = {};
      amounts[getYear(subYears(new Date(), 1))] = {};
      amounts[currentAmountDate] = {};
      amounts[getYear(addYears(new Date(), 1))] = {};
      amounts[getYear(addYears(new Date(), 2))] = {};

      //set indecies
      for (let i of Object.keys(amounts)) {
        amounts[i] = {
          jalaliYear: i,
          date: newDate(i, 10, 22),
          index: i - getYear(startDate),
        };
      }
    }
  }, [enteredAmounts]);

  const isPrevNavDisable = () =>
    Object.values(amounts)[0]?.jalaliYear == getYear(startDate);

  console.log(patchIndex);

  return (
    <Dialog
      maxWidth="sm"
      fullWidth={true}
      open={true}
      onClose={closePopup}
      PaperProps={{
        classes: { root: loading ? "loading" : "over-visible" },
      }}>
      <DialogTitle>
        مقادیر: {title}
        <Devider line={true} />
      </DialogTitle>

      <DialogContent style={{ overflow: "visible" }}>
        <div className="d-flex justify-between mb-2">
          <ContainedInheritText
            disabled={isPrevNavDisable()}
            className="no-shadow radius-circle p-1"
            onClick={() => setPatchIndex((state) => state - 1)}>
            <ChevronRightIcon />
          </ContainedInheritText>
          <ContainedInheritText
            className="no-shadow radius-circle p-1"
            onClick={() => setPatchIndex((state) => state + 1)}>
            <ChevronLeftIcon />
          </ContainedInheritText>
        </div>
        <div className="d-flex no-wrap">
          <div className="d-flex direction-column mt-4 ml-2">
            <div>واقعی</div>
            <div>هدف</div>
            <div>تغییرات(٪)</div>
          </div>
          {Object.values(amounts).map((amount) => (
            <div
              className="d-flex direction-column grow-1 ml-1"
              key={amount.index}>
              <div className="w-100 text-center">{amount.jalaliYear}</div>
              <input
                type="text"
                className="text-center"
                style={{ maxWidth: "85px" }}
              />
              <input
                type="text"
                className="text-center"
                style={{ maxWidth: "85px" }}
              />
              <span className="w-100 text-center"></span>
            </div>
          ))}
        </div>
      </DialogContent>

      <DialogActions>
        <TexedError onClick={closePopup}>لغو</TexedError>
      </DialogActions>
    </Dialog>
  );
}
