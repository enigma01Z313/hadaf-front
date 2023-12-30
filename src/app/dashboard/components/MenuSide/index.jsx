import React from "react";

import Image from "next/image";
import Link from "next/link";

import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import MainMenu from "../MainMenu";

export default function MenuSide({ smallMode, setSmallMode }) {
  return (
    <>
      <Image
        className="mb-2 mx-2"
        src={`${smallMode ? "/logo-small.png" : "/logo.svg"}`}
        alt="خانه"
        width={smallMode ? 40 : 268}
        height={40}
      />

      <MainMenu smallMode={smallMode} />

      <Link
        href=""
        onClick={() => setSmallMode((state) => !state)}
        className="d-flex align-center px-2"
        style={{ marginTop: "auto" }}>
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
