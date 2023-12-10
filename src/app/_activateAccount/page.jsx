"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { useSearchParams } from "next/navigation";
import activateAccount from "../lib/Auth/activateAccount";

export default function ActivateAccount() {
  const router = useRouter()
  const searchParams = useSearchParams();

  useEffect(() => {
    (async function () {
      const userId = searchParams.get("userId");
      const activationCode = searchParams.get("activationCode");

      const user = await activateAccount(userId, activationCode);

      // if(user.error) router.p
      console.log("1");
      console.log(user);
    })();
  }, []);

  return <div>ActivateAccount</div>;
}
