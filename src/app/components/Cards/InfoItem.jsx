import React from "react";

export default function InfoItem({ card, columnConfig, index, targetW }) {
  return (
    <div className={`d-flex justify-between align-center mb-1`}>
      {(typeof columnConfig.mobileDisableHeader === typeof undefined ||
        columnConfig.mobileDisableHeader === false) && (
        <div className="d-flex grow-1">{columnConfig.headerName}</div>
      )}

      <div className="d-flex grow-1 justify-end">
        {columnConfig?.renderCell?.({ ...card, targetW }) ??
          columnConfig?.valueGetter?.({ ...card, targetW }) ??
          card[columnConfig?.field] ??
          ""}
      </div>
    </div>
  );
}
