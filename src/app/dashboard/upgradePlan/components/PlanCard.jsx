import React, { useEffect, useState } from "react";

import Devider from "@/app/components/Devider";
import formatReadableNumber from "@/app/utils/formatNumber";
import PlanItem from "./PlanItem";
import ContainedPrimary from "@/app/components/Button/ContainedPrimary";

export default function PlanCard({ plan, index }) {
  const [planData, setPlanData] = useState({
    name: "",
    amount: "",
    discount: "",
    freeDays: "",
    duration: "",
    membersNumber: "",
  });

  useEffect(() => {
    setPlanData(plan.items[0]);
  }, []);

  const setActivePlanItem = (id) => {
    const targetItem = plan.items.find((item) => item.id === id);

    setPlanData(targetItem);
  };

  console.log('7-----------------------------------');
  console.log(planData.discount);

  return (
    <article
      className={`d-flex grow-1 direction-column wrapper-box 
        ${index === 0 ? "" : "mr-2"}`}
    >
      <h6 className="text-h6 w-100 text-center">{plan.name}</h6>

      <Devider line={true} spacing={2} />

      <div className="d-flex justify-between mb-1">
        <span className="text-body-1 weight-700">تعداد اعضا</span>
        <span className="text-body-1">{`${
          !Object.is(null, planData.membersNumber)
            ? `${planData.membersNumber} نفر`
            : "-"
        }`}</span>
      </div>

      <div className="d-flex justify-between mb-1">
        <span className="text-body-1 weight-700">مدت زمان</span>
        <span className="text-body-1">{`${
          !Object.is(null, planData.duration) ? `${planData.duration} روز` : "-"
        }`}</span>
      </div>

      <div className="d-flex justify-between mb-1">
        <span className="text-body-1 weight-700">زمان رایگان</span>
        <span className="text-body-1">{`${
          !Object.is(null, planData.freeDays) ? `${planData.freeDays} روز` : "-"
        }`}</span>
      </div>

      <div className="d-flex justify-between mb-1">
        <span className="text-body-1 weight-700">قیمت</span>
        <span className="text-body-1">{`${
          !Object.is(null, planData.amount)
            ? `${formatReadableNumber(planData.amount)} تومان`
            : "-"
        }`}</span>
      </div>

      <div className="d-flex justify-between mb-1">
        <span className="text-body-1 weight-700">تخفیف</span>
        <span className="text-body-1">{`${
          !Object.is(null, planData.discount)
            ? `${formatReadableNumber(planData.discount)} تومان`
            : "-"
        }`}</span>
      </div>

      <Devider line={true} spacing={1} />

      {plan.name !== "سازمانی" && (
        <div className="d-flex no-wrap">
          {plan.items.map((plan) => (
            <PlanItem
              key={plan.id}
              planItem={plan}
              activeId={planData.id}
              setActivePlanItem={setActivePlanItem}
            />
          ))}
        </div>
      )}

      <Devider line={false} spacing={1} />

      {(plan.name === "سازمانی" && (
        <ContainedPrimary className="justify-center mt-auto">
          تماس با پشتیبانی
        </ContainedPrimary>
      )) || (
        <ContainedPrimary className="justify-center mt-auto" disabled={true}>
          خرید و فعال سازی
        </ContainedPrimary>
      )}
    </article>
  );
}
