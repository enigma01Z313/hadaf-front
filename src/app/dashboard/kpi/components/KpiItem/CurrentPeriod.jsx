import React from "react";

import {
  newDate,
  startOfDay,
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfQuarter,
  endOfQuarter,
  startOfYear,
  endOfYear,
} from "date-fns-jalali";

export default function CurrentPeriod({ continuous }) {
  const quartersNames = ["بهار", "تابستان", "پاییز", "زمستان"];

  const getCurrentPeriod = ({ key }) => {
    const currentPeriod = {
      daily: () => format(startOfDay(new Date()), "yyyy/M/d"),
      weekly: () => `${format(startOfWeek(new Date()), "M/d")}-
        ${format(endOfWeek(new Date()), "M/d")}`,
      monthly: () => `${format(startOfMonth(new Date()), "MMMM yyyy")}`,
      seasonal: () =>
        `${
          quartersNames[+format(startOfQuarter(new Date()), "q") - 1]
        } ${format(startOfYear(new Date()), "yyyy")}`,
      yearly: () => `سال ${format(startOfYear(new Date()), "yyyy")}`,
    };

    return currentPeriod[key]?.() ?? "";
  };

  return (
    <div className="d-flex direction-column px-1 align-center">
      <span className="text-subtitle-3">{getCurrentPeriod(continuous)}</span>
      <span className="text-caption">{`(${continuous.label})`}</span>
    </div>
  );
}
