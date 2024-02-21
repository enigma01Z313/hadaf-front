import React, { useState, useEffect } from "react";

import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";

export default function RangeDatepicker({ handleChange, theTimefram }) {
  const [value, setValue] = useState([null, null]);

  useEffect(() => {
    const newValue = [
      Object.is(null, theTimefram.startDate)
        ? null
        : new Date(theTimefram.startDate),
      Object.is(null, theTimefram.endDate)
        ? null
        : new Date(theTimefram.endDate),
    ];

    setValue(newValue);
  }, [theTimefram]);

  const dateChangeHandle = (val) => {
    if (!Object.is(val[0], null))
      handleChange("startDate", val[0].toISOString());

    if (!Object.is(val[1], null)) handleChange("endDate", val[1].toISOString());
  };

  return (
    <div dir="rtl" className="range-date-input">
      <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
        <DemoContainer components={["DateRangePicker"]}>
          <DemoItem component="DateRangePicker">
            <DateRangePicker
              localeText={{
                start: "",
                end: "",
              }}
              value={value}
              onChange={dateChangeHandle}
              variant="standard"
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}
