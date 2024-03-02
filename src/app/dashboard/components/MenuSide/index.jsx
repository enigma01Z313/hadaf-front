import React from "react";

import Image from "next/image";
import Link from "next/link";

import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import MainMenu from "../MainMenu";

export default function MenuSide({ smallMode, setSmallMode }) {
  return (
    <>
      <div className="d-flex justify-center">
        {(smallMode && (
          <Image
            className="mb-2 mx-2"
            src={`/logo-smalla.png`}
            alt="خانه"
            width={40}
            height={28}
            style={{ filter: "brightness(0) invert(1)" }}
          />)) || (
          <Image
            className="mb-2 mx-2"
            src={`/logoa.png`}
            alt="خانه"
            width={150}
            height={53}
            style={{ filter: "brightness(0) invert(1)" }}
          />
        )}
      </div>

      <MainMenu smallMode={smallMode} />

      <Link
        href=""
        onClick={() => setSmallMode((state) => !state)}
        className="d-flex align-center px-2"
        style={{ marginTop: "auto" }}
      >
        {(smallMode && (
          <ArrowCircleLeftIcon style={{ fontSize: "40px" }} />
        )) || (
          <>
            <ArrowCircleRightIcon style={{ fontSize: "40px" }} />
            <span className="mr-2">کوچک کردن منو</span>
          </>
        )}
      </Link>
    </>
  );
}
