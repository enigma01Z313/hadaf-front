import React, { useState, useEffect, useRef, use } from "react";

import { Input } from "@mui/material";
import styles from "./style.module.css";

export default function DigitsInput({ digits, setter, resetDigits }) {
  const [digitsVal, setDigitsVal] = useState([]);
  const digitsRefs = useRef();

  useEffect(() => {
    const digitsValNew = [];
    digitsValNew.length = digits;
    digitsValNew.fill("");

    setDigitsVal(digitsValNew);
  }, []);

  useEffect(() => {
    setter(digitsVal.join(""));
  }, [digitsVal]);

  useEffect(() => {
    setDigitsVal(["","","",""])
  }, [resetDigits])

  const hadnleDigitFocus = (index) => {
    setDigitsVal((oldState) => {
      const digitsCp = [...oldState];
      digitsCp[index] = "";

      return digitsCp;
    });
  };

  const handleDigitVal = (val, index) => {
    const digitsCp = [...digitsVal];
    digitsCp[index] = val;
    setDigitsVal(digitsCp);

    document.getElementById(`digits-${index + 1}`)?.focus();
  };

  return (
    <div className={styles["digits-wrapper"]}>
      {digitsVal.map((item, index) => (
        <div
          className={`px-3 ${styles["digits"]}`}
          key={index}
          ref={digitsRefs}>
          <Input
            id={`digits-${index}`}
            aria-describedby="my-helper-text"
            value={digitsVal[index]}
            inputProps={{ className: "text-center" }}
            onFocus={() => hadnleDigitFocus(index)}
            onChange={(e) => handleDigitVal(e.target.value, index)}
          />
        </div>
      ))}
    </div>
  );
}
