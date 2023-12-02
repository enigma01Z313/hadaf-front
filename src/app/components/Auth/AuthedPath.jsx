import React, { useState, useEffect, useRef } from "react";

import { useRouter } from "next/navigation";

import Loading from "./Loading";
import checkUser from "./checkUser";
import getGuestToken from "@/app/lib/auth/getGuestToken";

export default function AuthedPath(params) {
  const children = params.children;
  const cb = params.cb;
  const role = params.role ?? "client";

  const isValidUser = useRef();
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async function () {
      let c;

      if (role === "client") c = await checkUser();
      else if (role === "audience") c = await getGuestToken();

      isValidUser.current = c;

      if (cb) cb();
      setChecking(false);
    })();
  }, []);

  if (!checking) {
    const api_key = localStorage.getItem("api_key");

    // console.log('*************************************');
    // console.log(api_key);
    // console.log(isValidUser.current);
    // console.log(api_key && isValidUser.current);
    // console.log('*************************************');

    if (api_key && isValidUser.current) {
      return <>{children}</>;
    } else router.push(`/`);
  } else return <Loading checking={checking} />;
}
