import React from "react";

import KRItem from "./KRItem";

import canAddNew from "./canAddNew";

export default function KeyResults({ keyResults, setTheOkr }) {

  const addNewKr = (newKr) => {
    setTheOkr((state) => {
      const newState = JSON.parse(JSON.stringify(state));
      newState.keyResults.push(newKr);

      return newState;
    });
  }

  const deleteKr = (index) => {
    setTheOkr((state) => {
      const newState = JSON.parse(JSON.stringify(state));
      newState.keyResults = state.keyResults.filter((v, i) => i !== index)

      return newState;
    });
  }

  return (
    <section>
      {keyResults.map((keyResult, index) => (
        <KRItem
          index={index}
          key={index}
          krData={keyResult}
          isNew={false}
          keyResultsL={keyResults.length}
          deleteKr={deleteKr}
        />
      ))}
      <KRItem
        index={keyResults.length}
        isNew={true}
        setTheOkr={setTheOkr}
        keyResultsL={keyResults.length}
        addNewKr={addNewKr}
      />
    </section>
  );
}
