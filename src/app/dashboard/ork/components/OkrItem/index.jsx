import React, { useEffect, useState, useRef } from "react";

import updateOkr from "@/app/lib/okr/update";

import OkrWeight from "./OkrWeight";
import OkrActions from "./OkrActions";
import OkrAssignee from "./OkrAssignee";
import OkrStatus from "./OkrStatus";
import OkrTitle from "./OkrTitle";

import Gauge from "@/app/components/Gauge";

export default function OkrItem({
  okr,
  className,
  deleteOkr,
  setSingleOkr,
  theWorkspace,
  saveCurrentOkr,
}) {
  const [theOrk, setTheOrk] = useState(okr);

  const changeHandler = (key, value) =>
    setTheOrk((state) => {
      return { ...state, [key]: value };
    });

  // const saveCurrentOkr = async (data={}) => {
  //   const okrListUpdateData = {
  //     // ...theOrk,
  //     title: theOrk.title,
  //     weight: +theOrk.weight,
  //     assignee: theOrk.assignee.id,
  //     status: theOrk.status.code,
  //     access: theOrk.access.code,
  //     timeFrame: theOrk.timeFrame.id,
  //     // keyResult: theOrk.keyResults,
  //     ...data
  //   };

  //   console.log(okrListUpdateData);
  //   const updatedData = await updateOkr(
  //     theWorkspace,
  //     theOrk.id,
  //     okrListUpdateData
  //   );
  // };

  const saveCurrentOkrClousure = (data = {}) => {
    const okrListUpdateData = {
      // ...theOrk,
      title: theOrk.title,
      weight: +theOrk.weight,
      assignee: theOrk.assignee.id,
      status: theOrk.status.code,
      access: theOrk.access.code,
      timeFrame: theOrk.timeFrame.id,
      // keyResult: theOrk.keyResults,
      ...data,
    };

    saveCurrentOkr(theOrk.id, okrListUpdateData);
  };

  return (
    <li className={`d-flex ${className}`}>
      <OkrTitle
        className="ml-1 grow-1"
        value={theOrk.title}
        changeHandler={changeHandler}
        saveCurrentOkr={saveCurrentOkrClousure}
      />

      <OkrActions
        okrId={theOrk.id}
        deleteOkr={deleteOkr}
        setSingleOkr={setSingleOkr}
      />

      <OkrStatus
        className="ml-1 grow-1"
        value={theOrk.status.code}
        changeHandler={changeHandler}
        saveCurrentOkr={saveCurrentOkrClousure}
      />

      <OkrAssignee
        className="ml-1 grow-1"
        value={theOrk.assignee.id}
        changeHandler={changeHandler}
        saveCurrentOkr={saveCurrentOkrClousure}
      />

      <OkrWeight
        className="ml-1"
        value={theOrk.weight}
        changeHandler={changeHandler}
        saveCurrentOkr={saveCurrentOkrClousure}
      />

      <Gauge value={theOrk.progress} />
    </li>
  );
}
