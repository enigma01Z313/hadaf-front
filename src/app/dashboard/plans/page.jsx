"use client";

import React, { useState, useEffect } from "react";
import NoSSR from "@/app/components/NoSSR";
import { useRouter } from "next/navigation";

import permissionChec from "@/app/utils/permissionCheck";
import ListTable from "./components/ListTable";
import Single from "./components/Single";

export default function Plan() {
  const router = useRouter();
  const [singlePlan, setSinglePlan] = useState("");
  const [reloadList, setReloadList] = useState(true);
  const [plans, setPlans] = useState([]);

  const closePopup = () => setSinglePlan("");

  useEffect(() => {
    const isSuperAmin = permissionChec("SUPER_ADMIN");
    const isAdmin = permissionChec("ADMIN");

    if (!(isSuperAmin || isAdmin)) router.push(`/dashboard/okrsDashboard`);
  }, []);

  return (
    <NoSSR>
      <ListTable
        setSinglePlan={setSinglePlan}
        reloadList={reloadList}
        setReloadList={setReloadList}
        plans={plans}
        setPlans={setPlans}
      />

      {singlePlan !== "" && (
        <Single
          singlePlan={singlePlan}
          setSinglePlan={setSinglePlan}
          closePopup={closePopup}
          setReloadList={setReloadList}
          plans={plans}
        />
      )}
    </NoSSR>
  );
}
