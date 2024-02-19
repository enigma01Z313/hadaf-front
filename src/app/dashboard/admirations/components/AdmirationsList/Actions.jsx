import React from "react";

import TexedInherit from "@/app/components/Button/TexedInherit";
import TexedError from "@/app/components/Button/TextedError";

import styles from "./style.module.css";

export default function Actions({ openAdmirationEdit, deleteTheAdmiration }) {
  return (
    <div className={`wrapper-box p-0 d-flex ${styles["actions"]}`}>
      <TexedInherit
        className="py-1 px-3 justify-center w-100"
        onClick={openAdmirationEdit}>
        ویرایش
      </TexedInherit>
      <TexedError
        className="py-1 px-3 justify-center w-100"
        onClick={deleteTheAdmiration}>
        حذف
      </TexedError>
    </div>
  );
}
