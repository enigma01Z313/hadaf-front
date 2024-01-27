import React from "react";

import KRItem from "./KRItem";

import canAddNew from "./canAddNew";

export default function KeyResults({ keyResults }) {
  return (
    <section>
      {keyResults.map((keyResult, index) => (
        <KRItem
          index={index}
          key={keyResult.id}
          krData={keyResult}
          isNew={false}
        />
      ))}
      <KRItem index={keyResults.length} isNew={true} />
    </section>
  );
}
