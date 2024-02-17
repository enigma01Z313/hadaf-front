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
    thresholdsOne: { value: treshOne },
    thresholdsTwo: { value: treshTwo, color: "red" },
    thresholdsThree: { value: treshThree, color: "orange" },
    thresholdsFour: { value: treshFour, color: "green" },
  };

  return (
    <div className="mt-2">
      <p className="text-body-1">آستانه های رنگی</p>
      <div className="d-flex no-wrap align-center mt-1">
        {Object.keys(threshholds).map((key, i) => (
          <>
            {i !== 0 && (
              <ArrowBackIcon className="mx-1" style={{ color: threshholds[key].color }} />
            )}
            <div className="grow-1">
              <TextField
                value={threshholds[key].value}
                onChange={(e) =>
                  changeHandlred(
                    key,
                    isNaN(+e.target.value) ? "" : +e.target.value
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
