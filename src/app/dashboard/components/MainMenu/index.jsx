import React, { useState, useContext, useEffect } from "react";

import permissionChec from "@/app/utils/permissionCheck.js";
import menuItems from "./menuItems.js";
import MenuItem from "./MenuItem";
import styles from "./style.module.css";

import getTrainees from "@/app/lib/trainees/list";

export default async function MainMenu({ smallMode, ...rest }) {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [traineeCount, setTraineeCount] = useState(0);

  useEffect(() => {
    (async function () {
      const traineesList = await getTrainees();

      setTraineeCount(traineesList.data.length);
    })();
  }, []);

  const menuItemClicked = (slug) => {
    setActiveMenu(slug);
    // setCreateMode(false);
  };

  const isAdmin = permissionChec("ADMIN");
  const isSuperAdmin = permissionChec("SUPER_ADMIN");

  return (
    <nav className={styles["main-menu"]} {...rest}>
      <ul className="d-flex direction-column">
        {menuItems(isSuperAdmin, isAdmin, traineeCount !== 0)
          .filter((item) => item.condition?.() ?? true)
          .map((item) => {
            const isDisabled = item?.disabled ?? false;

            return (
              <MenuItem
                className={`p-relative 
                ${activeMenu === item.slug ? styles.active : ""}`}
                key={item.id}
                item={item}
                onClick={() => !isDisabled && menuItemClicked(item.slug)}
                disabled={isDisabled}
                subMenu={item.subMenu}
              />
            );
          })}
      </ul>
    </nav>
  );
}
