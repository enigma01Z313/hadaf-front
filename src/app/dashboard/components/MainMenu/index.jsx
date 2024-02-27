import React, { useState, useContext } from "react";

import menuItems from "./menuItems.js";
import MenuItem from "./MenuItem";
import styles from "./style.module.css";

export default function MainMenu({ smallMode, ...rest }) {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const menuItemClicked = (slug) => {
    setActiveMenu(slug);
    // setCreateMode(false);
  };

  return (
    <nav className={styles["main-menu"]} {...rest}>
      <ul className="d-flex direction-column">
        {menuItems.map((item) => {
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
