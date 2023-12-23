import React, { useState, useEffect, useRef } from "react";

import { useRouter } from "next/navigation";

import Loading from "./Loading";
import checkUser from "./checkUser";

export default function AuthedPath(params) {
  const children = params.children;
  const cb = params.cb;
  const role = params.role ?? "client";

  const isValidUser = useRef();
  const [checking, setChecking] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async function () {
      if( !localStorage.getItem('accessToken') ){}
      // {
      //   console.log('abc------------------------------');
      // }
      // let c;

      // if (role === "client") c = await checkUser();
      // else if (role === "audience") c = await getGuestToken();

      // isValidUser.current = c;

      // if (cb) cb();
      setChecking(false);
    })();
  }, []);

  if (!checking) {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      return <>{children}</>;
    } else router.push(`/`);
  } else return <Loading checking={checking} />;
}
