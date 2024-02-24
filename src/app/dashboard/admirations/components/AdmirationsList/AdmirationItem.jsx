import React from "react";
import { format } from "date-fns-jalali-3";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styles from "./style.module.css";
import Devider from "@/app/components/Devider";
import DeviderPack from "./DeviderPack";
import Actions from "./Actions";

export default function AdmirationItem({
  admiration,
  setSingleAdmiration,
  handleAdmirationDelete,
  admirationCat,
}) {
  const openAdmirationEdit = () => {
    setSingleAdmiration(admiration.id);
  };

  const deleteTheAdmiration = () => {
    handleAdmirationDelete(admiration.id);
  };

  // console.log(admiration);
  // return "aaaaaaaaaaaaaa"
  return (
    <article
      className={`wrapper-box grow-1 mb-2
        ${styles["admiration-item"]}`}>
      <header className="d-flex justify-between align-center">
        <h3 className="text-h6">{admiration?.sender?.fullName}</h3>
        <div className="d-flex align-center">
          <span className="text-body-2">
            {format(admiration.createdAt, "yyyy-MM-dd")}
          </span>
          {admirationCat === "sent" && (
            <span
              className={`cursor-pointer d-flex align-center mr-1 ${styles["more-trigger"]}`}>
              <MoreHorizIcon />
              <Actions
                openAdmirationEdit={openAdmirationEdit}
                deleteTheAdmiration={deleteTheAdmiration}
              />
            </span>
          )}
        </div>
      </header>

      <DeviderPack />

      <section className="w-100">
        <span className="weight-600">به: </span>
        {admiration.receivers.map((reveiver, i) => (
          <span key={reveiver.id}>
            {i !== 0 ? ", " : ""}
            {reveiver.fullName}
          </span>
        ))}
      </section>
      <Devider spacing={1} />
      <section className="w-100">
        <span className="weight-600">متن تحسین: </span>
        {admiration.text}
      </section>

      {admiration.merits.length !== 0 && (
        <section className="w-100">
          <DeviderPack />

          {admiration.merits.map((merit, i) => (
            <>
              {i !== 0 ? ", " : ""}
              <span key={i}>{merit.title}</span>
            </>
          ))}
        </section>
      )}
    </article>
  );
}
