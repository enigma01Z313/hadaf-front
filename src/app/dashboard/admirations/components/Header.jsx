import React from "react";

import ContainedPrimary from "@/app/components/Button/ContainedPrimary";
import ContainedInheritText from "@/app/components/Button/ContainedInheritText";
import ContainedInfo from "@/app/components/Button/ContainedInfo";

export default function Header({
  admirationCats,
  admirationCat,
  setAdmirationCat,
  setSingleAdmiration,
}) {
  return (
    <div className="d-flex justify-between mb-3">
      <div>
        {admirationCats.map((cat, i) => (
          <ContainedInfo
            className={i !== 0 ? "mr-2" : ""}
            active={cat.slug === admirationCat}
            onClick={() => setAdmirationCat(cat.slug)}
            key={i}>
            {cat.label}
          </ContainedInfo>
        ))}
      </div>
      <ContainedPrimary onClick={() => setSingleAdmiration("create")}>
        ایجاد تحسین جدید
      </ContainedPrimary>
    </div>
  );
}
