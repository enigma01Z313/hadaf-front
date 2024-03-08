import React, { useState, useEffect } from "react";

import { getYear, addYears } from "date-fns-jalali";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import {
  startOfYear,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
} from "date-fns-jalali-3";

import TexedError from "@/app/components/Button/TextedError";
import Devider from "@/app/components/Devider";
import Nav from "./Nav";
import AmountCol from "./AmountCol";
import ColInfo from "./ColInfo";

import getAmounts from "@/app/lib/kpi/amounts/list";
import createAmount from "@/app/lib/kpi/amounts/create";
import updateAmount from "@/app/lib/kpi/amounts/update";

import { startOfHistory } from "@/app/configs";
import calcCurrentorder from "../KpiItem/calcCurrentorder";

export default function Amount({
  setOpenAmount,
  kpiId,
  title,
  continuous,
  setReloadList,
  threshholds,
  direction,
  validDays,
}) {
  const startDate = startOfYear(startOfHistory);
  const [activeOrder, setActiveOrder] = useState();
  const [loading, setLoading] = useState(true);
  const [enteredAmounts, setEnteredAmounts] = useState([]);
  const [amounts, setAmounts] = useState({});
  const [patchIndex, setPatchIndex] = useState(
    Math.floor((getYear(new Date()) - getYear(startDate)) / 5)
  );

  const closePopup = () => setOpenAmount(false);

  useEffect(() => {
    (async function () {
      const validDaysArr = validDays.map((item) => item.code);
      let currentPatchIndex;
      const amounts = await getAmounts(kpiId);
      setEnteredAmounts(amounts.data);

      const currentOrder = calcCurrentorder(continuous);

      if (validDays) {
        const rounDays = Math.floor(currentOrder / 7) * 7;
        const availableDaysCount = (rounDays / 7) * validDays.length;
        let reamainDays = currentOrder - rounDays;

        for (let i of validDaysArr)
          reamainDays = reamainDays === 0 ? 0 : reamainDays - 1;

        const newPatchIndex = Math.floor(
          (availableDaysCount + reamainDays) / 5
        );

        currentPatchIndex = Math.floor(currentOrder / 5);
      } else {
        currentPatchIndex = Math.floor(currentOrder / 5);
      }

      setPatchIndex(currentPatchIndex);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    const amountsCp = JSON.parse(JSON.stringify(amounts));
    const newAmountItemDef = {
      realAmount: "",
      expAmount: "",
      changePercent: "",
      description: "",
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
        amountsCp[item.order].description = item.description ?? "";
      } else {
        console.log("22222222222222");
      }
    });

    setAmounts(amountsCp);
  }, [enteredAmounts, patchIndex]);

  const isPrevNavDisable = () => patchIndex === 0;

  const handleChange = (key, subKey, e, isNumber = false) => {
    const amountsCp = JSON.parse(JSON.stringify(amounts));
    amountsCp[key][subKey] = isNumber
      ? e.target.value.replace(/\D/g, "")
      : e.target.value;

    setAmounts(amountsCp);
  };

  const handleAmountUpdate = async (order) => {
    const targetAmount = amounts[order];

    setLoading(true);
    if (targetAmount.id === -1) {
      const newAmoun = await createAmount(kpiId, {
        label: `${targetAmount.label} ام ${targetAmount.label2}`,
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
      const uppedAmount = await updateAmount(kpiId, targetAmount.id, {
        realAmount: +targetAmount.realAmount,
        targetAmount: +targetAmount.expAmount,
      });
    }
    setLoading(false);
    setReloadList((state) => !state);
  };

  const handleDescriptionUpdate = async (value, amountId, order) => {
    setLoading(true);
    const amountsCp = JSON.parse(JSON.stringify(amounts));

    if (amountId === -1) {
      const newAmoun = await createAmount(kpiId, {
        description: value,
        order,
      });

      amountsCp[order].id = newAmoun.id;
    } else {
      await updateAmount(kpiId, amountId, {
        description: value,
      });
    }
    amountsCp[order].description = value;

    setAmounts(amountsCp);
    setLoading(false);
  };

  const curOrder = calcCurrentorder(continuous);

  return (
    <Dialog
      maxWidth="sm"
      fullWidth={true}
      open={true}
      onClose={closePopup}
      PaperProps={{
        classes: { root: loading ? "loading" : "over-visible" },
      }}
    >
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
            <div style={{ marginBottom: "15px", marginTop: "20px" }}>واقعی</div>
            <div style={{ marginBottom: "2px" }}>هدف</div>
            <div>تغییرات(٪)</div>
          </div>
          {Object.values(amounts)
            .filter((item) => {
              const orderFifth = item.order / 5;

              return orderFifth >= patchIndex && orderFifth < patchIndex + 1;
            })
            .map((amount) => {
              return (
                <AmountCol
                  key={amount.order}
                  activeOrder={activeOrder}
                  amounts={amounts}
                  amount={amount}
                  threshholds={threshholds}
                  direction={direction}
                  order={amount.order}
                  setActiveOrder={setActiveOrder}
                  handleChange={handleChange}
                  handleAmountUpdate={handleAmountUpdate}
                  disabled={amount.order >= curOrder}
                />
              );
            })}
        </div>
        {activeOrder && (
          <ColInfo
            activeOrder={activeOrder}
            amountId={amounts[activeOrder].id}
            description={amounts[activeOrder].description}
            handleDescriptionUpdate={handleDescriptionUpdate}
          />
        )}
      </DialogContent>

      <DialogActions>
        <TexedError onClick={closePopup}>لغو</TexedError>
      </DialogActions>
    </Dialog>
  );
}
