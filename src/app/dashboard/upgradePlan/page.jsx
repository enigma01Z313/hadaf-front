"use client";

import React, { useState, useEffect } from "react";
import NoSSR from "@/app/components/NoSSR";
import { useRouter } from "next/navigation";

import PlanCard from "./components/PlanCard";

import getPlans from "../../lib/plan/list";

export default function Plan() {
  const router = useRouter();
  const [singlePlan, setSinglePlan] = useState("");
  const [reloadList, setReloadList] = useState(true);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    (async function () {
      const groupedPlans = [];
      const plansList = await getPlans();

      plansList.forEach((plan) => {
        const targetGpIndex = groupedPlans.findIndex(
          (item) => item.name === plan.name
        );

        if (targetGpIndex === -1)
          groupedPlans.push({
            name: plan.name,
            items: [plan],
          });
        else groupedPlans[targetGpIndex].items.push(plan);
      });

      setPlans(groupedPlans);
    })();
  }, []);

  return (
    <NoSSR>
      <section className="d-flex">
        {plans.map((plan, index) => (
          <PlanCard key={index} plan={plan} index={index} />
        ))}
      </section>
    </NoSSR>
  );
}
