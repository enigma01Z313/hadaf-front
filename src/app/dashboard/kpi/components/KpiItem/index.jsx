import React, { useState } from "react";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import CurrentPeriod from "./CurrentPeriod";
import Assignee from "./Assignee";
import Actions from "./Actions";
import Amount from "../Amount";
import AmountEdit from "./AmountEdit";

import calcCurrentorder from "./calcCurrentorder";

export default function KpiItem({
  kpi,
  openedActions,
  setOpenedActions,
  setSingleKpi,
  setLoading,
  setReloadList,
  rowNum,
}) {
  const [openAmount, setOpenAmount] = useState(false);

  const currentOrder =
    kpi.realAmounts.current.order === ""
      ? calcCurrentorder(kpi.continuous.key)
      : kpi.realAmounts.current.order;

  return (
    <div className={`d-flex align-center py-1 text-body-2`}>
      {kpi.tags && (
        <div className="tag-lines">
          {kpi.tags.map((tag) => (
            <div
              key={tag.id}
              className="tag-line"
              style={{ "--bg-color": tag.color ?? "#ccc" }}
            ></div>
          ))}
        </div>
      )}
      <div style={{ width: "50px" }}>{rowNum}.</div>
      <div className="grow-1">{kpi.name}</div>
      <div className="text-center" style={{ width: "100px" }}>
        <CurrentPeriod continuous={kpi.continuous} />
      </div>
      <div
        style={{ width: "110px" }}
        className="text-center d-flex justify-center"
      >
        <div
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            background: kpi.sevenPreviousCourses.bg,
          }}
        ></div>
      </div>
      <div
        style={{ width: "120px" }}
        className="text-center d-flex justify-center"
      >
        <div
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            background: kpi.updateStatus.bg,
          }}
          title={kpi.updateStatus.label}
        ></div>
      </div>
      <div style={{ width: "80px" }} className="text-center">
        روند تغییر
      </div>
      <div
        style={{ width: "130px" }}
        className="text-caption text-center d-flex justify-around"
      >
        <AmountEdit
          value={kpi.realAmounts.previous.amount}
          amountId={kpi.realAmounts.previous.id}
          order={currentOrder - 2}
          kpiId={kpi.id}
          threshholds={[
            kpi.thresholdsOne,
            kpi.thresholdsTwo,
            kpi.thresholdsThree,
            kpi.thresholdsFour,
          ]}
          direction={kpi.direction.code}
        />
        <AmountEdit
          value={kpi.realAmounts.current.amount}
          amountId={kpi.realAmounts.current.id}
          order={currentOrder - 1}
          kpiId={kpi.id}
          threshholds={[
            kpi.thresholdsOne,
            kpi.thresholdsTwo,
            kpi.thresholdsThree,
            kpi.thresholdsFour,
          ]}
          direction={kpi.direction.code}
        />
      </div>

      <div style={{ width: "120px" }} className="text-center">
        <Assignee assignee={kpi.assignee} />
      </div>
      <div className="p-relative mr-auto" style={{ width: "50px" }}>
        <div
          className="cursor-pointer d-flex align-center p-1"
          onClick={() => setOpenedActions(kpi.id)}
        >
          <MoreHorizIcon />
        </div>
        {kpi.id === openedActions && (
          <>
            <Actions
              kpi={kpi}
              kpiId={kpi.id}
              setOpenedActions={setOpenedActions}
              setSingleKpi={setSingleKpi}
              setLoading={setLoading}
              setReloadList={setReloadList}
              setOpenAmount={setOpenAmount}
            />
          </>
        )}
      </div>

      {openAmount && (
        <Amount
          setOpenAmount={setOpenAmount}
          kpiId={kpi.id}
          title={kpi.name}
          continuous={kpi.continuous.key}
          setReloadList={setReloadList}
          threshholds={[
            kpi.thresholdsOne,
            kpi.thresholdsTwo,
            kpi.thresholdsThree,
            kpi.thresholdsFour,
          ]}
          direction={kpi.direction.code}
          validDays={kpi.validDays}
        />
      )}
    </div>
  );
}
