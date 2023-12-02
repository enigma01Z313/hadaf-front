"use client";

import React, { useRef, useState } from "react";

import styles from "./page.module.css";

import Register from "@/app/components/RegisterLogin/Register";
import Login from "@/app/components/RegisterLogin/Login";

export default function Home() {
  const [formStatus, setFormStatus] = useState("register");

  return (
    <main className={`${styles.main} justify-center`}>
      {formStatus === "register" && <Register setFormStatus={setFormStatus} />}
      {formStatus === "login" && <Login setFormStatus={setFormStatus} />}
      {/* {formStatus === 'register' && <Register />} */}
    </main>
  );
}
