"use client";

import React, { useRef, useState } from "react";

import Image from "next/image";
import styles from "./page.module.css";

import Register from "@/app/components/RegisterLogin/Register";
import Login from "@/app/components/RegisterLogin/Login";

export default function Home() {
  const [formStatus, setFormStatus] = useState("register");

  return (
    <main className={`${styles.main} justify-center`}>
      <div className={`w-50 d-flex justify-center align-center
        ${styles['logo-side']}`}>
          <Image
            className="mb-2 mx-2"
            src="/logo.svg"
            alt="خانه"
            width={268}
            height={40}
          />
      </div>
      <div className="w-50 d-flex justify-center align-center direction-column">
        {formStatus === "register" && (
          <Register setFormStatus={setFormStatus} />
        )}
        {formStatus === "login" && <Login setFormStatus={setFormStatus} />}
        {/* {formStatus === 'register' && <Register />} */}
      </div>
    </main>
  );
}
