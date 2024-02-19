import React from "react";

import SouthIcon from "@mui/icons-material/South";
import Devider from "@/app/components/Devider";
import styles from './style.module.css'

export default function DeviderPack() {
  return (
    <div className="w-100 p-relative">
      <Devider spacing={3} line={true} />
      <div className={`p-1 ${styles["icon"]}`}>
        <SouthIcon />
      </div>
    </div>
  );
}
