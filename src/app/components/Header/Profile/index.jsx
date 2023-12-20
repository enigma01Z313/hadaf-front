import React, { useState } from "react";

import Link from "next/link";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from '@mui/icons-material/Person';
import TexedInherit from "@/app/components/Button/TexedInherit";
import Devider from "../../Devider";

import styles from "./style.module.css";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [fullName, setFullName] = useState(user.fullName);

  return (
    <div className={styles["profile-wrapper"]}>
      <Link className="d-flex align-center px-2 py-1" href="/">
        {fullName}
        <KeyboardArrowDownIcon className="mr-1" />
      </Link>
      <div className="pt-3">
        <div className="wrapper-box p-0">
          <ul className="py-1">
            <li className="px-1">
              <TexedInherit className="w-100 px-1 py-1 d-flex" href="">
                <PersonIcon className="ml-1" />
                ویرایش
              </TexedInherit>
            </li>
            <Devider line={true} size="90" />
            <li className="px-1">
              <TexedInherit className="w-100 px-1 py-1 d-flex" href="">
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
