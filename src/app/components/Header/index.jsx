import React from "react";

import styles from "./style.module.css";
import FullpageTrigger from "./FullpageTrigger";
import Profile from "./Profile";
import UserWorkspaces from "./UserWorkspaces";

export default function Header() {
  return (
    <header
      className={`py-2 px-2 d-flex justify-end align-center
        ${styles["header"]}`}>
      <UserWorkspaces />
      <FullpageTrigger className="ml-2" />
      <Profile />
    </header>
  );
}
