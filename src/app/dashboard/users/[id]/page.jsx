"use client";

import React, { useEffect, useState } from "react";

import getUser from "@/app/lib/users/get";
import getUsersList from "@/app/lib/users/list";

export default function User({ params }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    (async function () {
      console.log("22222222222222222222222");
      //   const userData = await getUser(params.id);

      //   setUser(userData);
    })();
  }, []);

  console.log(user);

  return <div>single user page</div>;
}

// export async function generateStaticParams() {
//   const users = await getUsersList();

//   return users.map((item) => ({
//     id: item.id,
//   }));
// }
