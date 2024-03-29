import React, { useState, useContext, useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import TexedInherit from "@/app/components/Button/TexedInherit";
import Devider from "../../Devider";

import workspaceContext from "@/app/context/workspaceContext";

import styles from "./style.module.css";

export default function Profile() {
  const router = useRouter();
  const { theUser, setTheUser, theWorkspace } = useContext(workspaceContext);
  const user = theUser ?? JSON.parse(localStorage.getItem("user"));
  [""];
  useEffect(() => {
    setTheUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("meta");
    localStorage.removeItem("refresToken");
    document.exitFullscreen();

    router.push(`/`);
  };

  return (
    <div className={`${styles["profile-wrapper"]}`}>
      <Link
        className="d-flex align-center px-2 py-1 p-s-0 d-xs-none"
        href={`/dashboard/users/${theUser?.id}`}
      >
        {theUser?.fullName}
        <KeyboardArrowDownIcon className="mr-1" />
      </Link>
      <Link
        className={`d-none d-xs-flex align-center justify-center 
        ${styles["profile-mobile-trigger"]}`}
        href={`/dashboard/users/${theUser?.id}`}
      >
        {theUser?.fullName
          ?.split(" ")
          .map((item) => item.charAt(0))
          .join("")}
      </Link>
      <div className="pt-3">
        <div className="wrapper-box p-0">
          <ul className="py-1">
            <li className="px-1">
              <Link href={`/dashboard/users/${theUser?.id}`}>
                <TexedInherit className="w-100 px-1 py-1 d-flex" href="">
                  <PersonIcon className="ml-1" />
                  ویرایش
                </TexedInherit>
              </Link>
            </li>
            <li className="px-1">
              <Link href={`/dashboard/users/${theUser?.id}/edit-password`}>
                <TexedInherit className="w-100 px-1 py-1 d-flex" href="">
                  <PersonIcon className="ml-1" />
                  تغییر رمز عبور
                </TexedInherit>
              </Link>
            </li>
            <li className="px-1">
              <Link href={`/dashboard/workspaces/${theWorkspace}`}>
                <TexedInherit className="w-100 px-1 py-1 d-flex" href="">
                  <SettingsIcon className="ml-1" />
                  تنظیمات فضای کاری
                </TexedInherit>
              </Link>
            </li>
            <Devider line={true} size="90" />
            <li className="px-1">
              <TexedInherit
                onClick={handleLogout}
                className="w-100 px-1 py-1 d-flex"
                href=""
              >
                <ExitToAppIcon className="ml-1" />
                خروج
              </TexedInherit>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
