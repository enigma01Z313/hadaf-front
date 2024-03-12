"use client";

import React, { useState } from "react";

import "react-perfect-scrollbar/dist/css/styles.css";
import styles from "./page.module.css";
import MenuSide from "./components/MenuSide";
import Header from "../components/Header";
import { CreateModeProvider } from "./CreateModeContext";
import AuthedPath from "../components/Auth/AuthedPath";
import { WorkspaceContextProvider } from "@/app/context/workspaceContext";
import PerfectScrollbar from "react-perfect-scrollbar";

export default function DashboardLayout({ children }) {
  const [smallMode, setSmallMode] = useState(true);

  return (
    <AuthedPath>
      <WorkspaceContextProvider>
        <article
          className={`p-relative d-flex 
          ${styles.wrapper}
          ${smallMode ? styles["small-menu-mode"] : ""}`}
        >
          <CreateModeProvider>
            <div
              className={`${!smallMode ? styles["show"] : ""} 
                ${styles["menu-overlay"]}`}
              onClick={() => setSmallMode(true)}
            ></div>

            <aside
              className={`py-2 d-flex direction-column
                ${styles["menu-side"]}`}
            >
              <MenuSide smallMode={smallMode} setSmallMode={setSmallMode} />
            </aside>

            <aside className={`grow-1 ${styles["main-side"]}`}>
              <Header />
              <PerfectScrollbar style={{ maxHeight: "calc(100vh - 75px)" }}>
                <main className={window.innerWidth >= 1100 ? "p-3" : "p-2"}>
                  {children}
                </main>
              </PerfectScrollbar>
            </aside>
          </CreateModeProvider>
        </article>
      </WorkspaceContextProvider>
    </AuthedPath>
  );
}
