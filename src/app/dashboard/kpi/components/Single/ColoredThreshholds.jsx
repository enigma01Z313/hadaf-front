import React from "react";

import { TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function ColoredThreshholds({
  changeHandlred,
  checkThreshHoldsError,
  treshOne,
  treshTwo,
  treshThree,
  treshFour,
  thresholdsErrors,
  direction,
}) {
  const threshholds = {
    thresholdsOne: { value: treshOne, label: "غیر قابل قبول" },
    thresholdsTwo: { value: treshTwo, color: "red", label: "ضعیف" },
    thresholdsThree: { value: treshThree, color: "orange", label: "قابل قبول" },
    thresholdsFour: { value: treshFour, color: "green", label: "عالی" },
  };

  return (
    <div className="mt-2">
      <p className="text-body-1">آستانه های رنگی</p>
      <div className="d-flex no-wrap align-center mt-1">
        {Object.keys(threshholds).map((key, i) => (
          <>
            {i !== 0 && (
              <ArrowBackIcon
                className="mx-1"
                style={{ color: threshholds[key].color, position: "relative", top: "13px" }}
              />
            )}
            <div className="grow-1">
              <span style={{ fontSize: "12px" }}>{threshholds[key].label}</span>
              <TextField
                value={threshholds[key].value}
                onChange={(e) =>
                  changeHandlred(
                    key,
                    isNaN(+e.target.value.replace(/\D/g, "")) ? "" : +e.target.value.replace(/\D/g, "")
                  )
                }
                inputProps={{ className: "text-h6 py-1" }}
                onBlur={() => checkThreshHoldsError(direction)}
              />
            </div>
          </>
        ))}
      </div>
      <div className="mt-1">
        {thresholdsErrors.map((v, i) => (
          <div key={i} style={{ color: "red" }}>
            {v}
          </div>
        ))}
      </div>
    </div>
  );
}
