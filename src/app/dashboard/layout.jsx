"use client";

import React from "react";
import Image from "next/image";

import styles from "./page.module.css";
import MainMenu from "./components/MainMenu";
import Header from "../components/Header";
import { CreateModeProvider } from "./CreateModeContext";
import AuthedPath from "../components/Auth/AuthedPath";
import { WorkspaceContextProvider } from "@/app/context/workspaceContext";

export default function DashboardLayout({ children }) {
  return (
    <AuthedPath>
      <WorkspaceContextProvider>
        <article className={`p-relative d-flex ${styles.wrapper}`}>
          <CreateModeProvider>
            <aside className={`py-2 ${styles["menu-side"]}`}>
              <Image
                className="mb-2 mx-2"
                src="/logo.svg"
                alt="خانه"
                width={268}
                height={40}
              />
              <MainMenu />
            </aside>
            {/* <main className={`grow-1 p-3 ${styles['main-side']}`}><children></children></main> */}
            <aside className={`grow-1 ${styles["main-side"]}`}>
              <Header />
              <main className={`p-3 ${styles["main-side"]}`}>{children}</main>
            </aside>
          </CreateModeProvider>
        </article>
      </WorkspaceContextProvider>
    </AuthedPath>
  );
}
