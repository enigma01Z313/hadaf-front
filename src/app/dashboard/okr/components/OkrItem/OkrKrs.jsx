import React from "react";

import OkrKr from "./OkrKr";
import Devider from "@/app/components/Devider";

export default function OkrKrs({ krs }) {
  return (
    <section className="w-100">
      <Devider spacing={1} line={true} />
      {krs.map((kr, index) => (
        <OkrKr key={kr.id} kr={kr} index={index} />
      ))}
    </section>
  );
}
