import React, { useState, useContext } from "react";

import menuItems from "./menuItems.json";
import MenuItem from "./MenuItem";
import CreateModeContext from "../../CreateModeContext";
import styles from "./style.module.css";

export default function MainMenu({...rest }) {
  // const { setCreateMode } = useContext(CreateModeContext);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const menuItemClicked = (slug) => {
    setActiveMenu(slug);
    // setCreateMode(false);
  };

  return (
    <nav className={styles["main-menu"]} {...rest}>
      <ul>
        {menuItems.map((item) => (
          <MenuItem
            className={activeMenu === item.slug ? styles.active : ""}
            key={item.id}
            item={item}
            onClick={() => menuItemClicked(item.slug)}
          />
        ))}
      </ul>
    </nav>
  );
}
