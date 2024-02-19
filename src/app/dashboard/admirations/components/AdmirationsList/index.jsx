import React from "react";

import AdmirationItem from "./AdmirationItem";

export default function AdmirationsList({
  setSingleAdmiration,
  loading,
  admirations,
  handleAdmirationDelete,
}) {
  return (
    <>
      {(admirations.length === 0 && (
        <div className="wrapper-box w-100">هنوز تشویشی وجود ندارد...!</div>
      )) ||
        admirations.map((admiration, index) => (
          <AdmirationItem
            key={index}
            admiration={admiration}
            setSingleAdmiration={setSingleAdmiration}
            handleAdmirationDelete={handleAdmirationDelete}
          />
        ))}
    </>
  );
}
