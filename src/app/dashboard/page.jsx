"use client";

import React, { useState, useEffect } from "react";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      setLoading(true);
      // const okrDashboardData = await getOkrDashboard()
    })();
  }, []);

  return <>Dashboard</>;
}
