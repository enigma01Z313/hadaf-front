import React, { useState } from "react";

import createAmount from "@/app/lib/kpi/amounts/create";
import updateAmount from "@/app/lib/kpi/amounts/update";
import calcColor from "../Amount/calcColor";

export default function AmountEdit({
  kpiId,
  value,
  order,
  amountId,
  threshholds,
  direction,
}) {
  const [amount, setAmount] = useState(value);
  const [id, setId] = useState(amountId);

  const handleAmountUpdate = async () => {
    if (id === "") {
      const newAmount = await createAmount(kpiId, {
        realAmount: +amount,
        order,
      });

      setId(newAmount.id);
    } else {
      const uppedAmount = await updateAmount(kpiId, id, {
        realAmount: +amount,
      });
    }
  };

  

  const colorClass = calcColor(amount, threshholds, direction);

  return (
    <input
      className={`standard-input ${colorClass}`}
      type="text"
      style={{ width: "45px" }}
      value={amount}
      onChange={(e) => setAmount(e.target.value.replace(/\D/g,''))}
      onBlur={handleAmountUpdate}
    />
  );
}
