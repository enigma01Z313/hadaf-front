import React, { useState, useEffect } from "react";

import { getYear, addYears } from "date-fns-jalali";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import {
  newDate,
  startOfYear,
  getQuarter,
  eachDayOfInterval,
  eachWeekOfInterval,
  eachMonthOfInterval,
  eachQuarterOfInterval,
  eachYearOfInterval,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
} from "date-fns-jalali-3";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TexedError from "@/app/components/Button/TextedError";
import Devider from "@/app/components/Devider";
import Nav from "./Nav";
import ContainedInheritText from "@/app/components/Button/ContainedInheritText";
import TexedInherit from "@/app/components/Button/TexedInherit";

import getAmounts from "@/app/lib/kpi/amounts/list";
import createAmount from "@/app/lib/kpi/amounts/create";
import updateAmount from "@/app/lib/kpi/amounts/update";

const startOfHistory = newDate(1400, 0, 1);

export default function Amount({ setOpenAmount, kpiId, title, continuous }) {
  const startDate = startOfYear(startOfHistory);
  const [loading, setLoading] = useState(true);
  const [enteredAmounts, setEnteredAmounts] = useState([]);
  const [amounts, setAmounts] = useState({});
  const [patchIndex, setPatchIndex] = useState(
    Math.floor((getYear(new Date()) - getYear(startDate)) / 5)
  );

  const closePopup = () => setOpenAmount(false);

  useEffect(() => {
    (async function () {
      const amounts = await getAmounts(kpiId);
      setEnteredAmounts(amounts.data);
      // setEnteredAmounts(amounts?.data ?? []);

      const ordersMethods = {
        daily: () =>
          eachDayOfInterval({
            start: startOfHistory,
            end: new Date(),
          }),
        weekly: () =>
          eachWeekOfInterval({
            start: startOfHistory,
            end: new Date(),
          }),
        monthly: () =>
          eachMonthOfInterval({
            start: startOfHistory,
            end: new Date(),
          }),
        seasonal: () =>
          eachQuarterOfInterval({
            start: startOfHistory,
            end: new Date(),
          }),
        yearly: () =>
          eachYearOfInterval({
            start: startOfHistory,
            end: new Date(),
          }),
      };

      const tmpArr = ordersMethods[continuous]();
      const currentPatchIndex = Math.floor(tmpArr.length / 5);

      setPatchIndex(currentPatchIndex);
      setLoading(false)
    })();
  }, []);

  useEffect(() => {
    const amountsCp = JSON.parse(JSON.stringify(amounts));
    const newAmountItemDef = {
      realAmount: "",
      expAmount: "",
      changePercent: "",
      id: -1,
    };

    if (continuous === "daily") {
      const index1 = patchIndex * 5 + 0;
      const index2 = patchIndex * 5 + 1;
      const index3 = patchIndex * 5 + 2;
      const index4 = patchIndex * 5 + 3;
      const index5 = patchIndex * 5 + 4;

      const indexes = [index1, index2, index3, index4, index5];

      indexes.forEach((item) => {
        const weekDayDate = addDays(startOfHistory, item);

        if (!amountsCp[item])
          amountsCp[item] = {
            label: `روز ${(item % 365) + 1}`,
            label2: `(${format(weekDayDate, "MM/dd")})`,
            order: item,
            ...newAmountItemDef,
          };
      });
    } else if (continuous === "weekly") {
      const index1 = patchIndex * 5 + 0;
      const index2 = patchIndex * 5 + 1;
      const index3 = patchIndex * 5 + 2;
      const index4 = patchIndex * 5 + 3;
      const index5 = patchIndex * 5 + 4;

      const indexes = [index1, index2, index3, index4, index5];

      indexes.forEach((item) => {
        const weekDayDate = addDays(startOfHistory, (item - 1) * 7);
        const startOfWeekDate = startOfWeek(weekDayDate);
        const endOfWeekDate = endOfWeek(weekDayDate);

        if (!amountsCp[item])
          amountsCp[item] = {
            label: `هفته${(item % 52) + 1}`,
            label2: `(${format(startOfWeekDate, "MM/dd")}-${format(
              endOfWeekDate,
              "MM/dd"
            )})`,
            order: item,
            ...newAmountItemDef,
          };
      });
    } else if (continuous === "monthly") {
      const months = [
        "فروردین",
        "اردیبهشت",
        "خرداد",
        "تیر",
        "مرداد",
        "شهریور",
        "مهر",
        "آبان",
        "آذر",
        "دی",
        "بهمن",
        "اسفند",
      ];

      const index1 = patchIndex * 5 + 0;
      const index2 = patchIndex * 5 + 1;
      const index3 = patchIndex * 5 + 2;
      const index4 = patchIndex * 5 + 3;
      const index5 = patchIndex * 5 + 4;

      const indexes = [index1, index2, index3, index4, index5];

      indexes.forEach((item) => {
        if (!amountsCp[item])
          amountsCp[item] = {
            label: `${Math.floor(item / 12) + 1400}/${(item % 12) + 1}`,
            order: item,
            ...newAmountItemDef,
          };
      });
    } else if (continuous === "seasonal") {
      const seasons = ["بهار", "تابستان", "پاییز", "زمستان"];

      const index1 = patchIndex * 5 + 0;
      const index2 = patchIndex * 5 + 1;
      const index3 = patchIndex * 5 + 2;
      const index4 = patchIndex * 5 + 3;
      const index5 = patchIndex * 5 + 4;

      const indexes = [index1, index2, index3, index4, index5];

      indexes.forEach((item) => {
        if (!amountsCp[item])
          amountsCp[item] = {
            label: `${seasons[item % 4]} ${Math.floor(item / 4) + 1400}`,
            order: item,
            ...newAmountItemDef,
          };
      });
    } else if (continuous === "yearly") {
      const index1 = patchIndex * 5 + 0;
      const index2 = patchIndex * 5 + 1;
      const index3 = patchIndex * 5 + 2;
      const index4 = patchIndex * 5 + 3;
      const index5 = patchIndex * 5 + 4;

      const indexes = [index1, index2, index3, index4, index5];

      indexes.forEach((item) => {
        if (!amountsCp[item])
          amountsCp[item] = {
            label: `سال ${1402 + item + -2}`,
            order: item,
            ...newAmountItemDef,
          };
      });
    }

    enteredAmounts.forEach((item) => {
      const targetAmount = amountsCp[item.order];
      if (amountsCp[item.order]) {
        amountsCp[item.order].id = item.id;
        amountsCp[item.order].realAmount = item.realAmount;
        amountsCp[item.order].expAmount = item.targetAmount;
      } else {
        console.log("22222222222222");
      }
    });

    setAmounts(amountsCp);
  }, [enteredAmounts, patchIndex]);

  const isPrevNavDisable = () => patchIndex === 0;

  const handleChange = (key, subKey, e) => {
    const amountsCp = JSON.parse(JSON.stringify(amounts));
    amountsCp[key][subKey] = e.target.value;

    setAmounts(amountsCp);
  };

  const handleAmountUpdate = async (order) => {
    const targetAmount = amounts[order];

    setLoading(true);
    if (targetAmount.id === -1) {
      // console.log("create new amount");

      const newAmoun = await createAmount(kpiId, {
        realAmount: +targetAmount.realAmount,
        targetAmount: +targetAmount.expAmount,
        order,
      });

      const amountsCp = JSON.parse(JSON.stringify(amounts));
      amountsCp[order].id = newAmoun.id;
      amountsCp[order].realAmount = newAmoun.realAmount;
      amountsCp[order].expAmount = newAmoun.targetAmount;

      setAmounts(amountsCp);
    } else {
      // console.log("update amount");

      const uppedAmount = await updateAmount(kpiId, targetAmount.id, {
        realAmount: +targetAmount.realAmount,
        targetAmount: +targetAmount.expAmount,
      });
    }
    setLoading(false);
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
      <DialogTitle>
        مقادیر: {title}
        <Devider line={true} />
      </DialogTitle>

      <DialogContent style={{ overflow: "visible" }}>
        <Nav
          setPatchIndex={setPatchIndex}
          isPrevNavDisable={isPrevNavDisable}
        />

        <div className="d-flex no-wrap">
          <div className="d-flex direction-column mt-4 ml-2">
            <div>واقعی</div>
            <div>هدف</div>
            <div>تغییرات(٪)</div>
          </div>
          {Object.values(amounts)
            .filter((item) => {
              const orderFifth = item.order / 5;

              return orderFifth >= patchIndex && orderFifth < patchIndex + 1;
            })
            .map((amount) => (
              <div
                className="d-flex direction-column grow-1 ml-1"
                key={amount.order}>
                <div className="w-100 text-center text-body-2">
                  {amount.label}
                  <br />
                  <span style={{ fontSize: "12px" }}>{amount.label2}</span>
                </div>
                <input
                  type="text"
                  className="text-center"
                  style={{ maxWidth: "85px" }}
                  value={amounts[amount.order].realAmount}
                  onChange={(e) => handleChange(amount.order, "realAmount", e)}
                  onBlur={() => handleAmountUpdate(amount.order)}
                />
                <input
                  type="text"
                  className="text-center"
                  style={{ maxWidth: "85px" }}
                  value={amounts[amount.order].expAmount}
                  onChange={(e) => handleChange(amount.order, "expAmount", e)}
                  onBlur={() => handleAmountUpdate(amount.order)}
                />
                {/* <span className="w-100 text-center"></span> */}
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
