"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

import styles from "./page.module.css";

import Register from "@/app/components/RegisterLogin/Register";
import Login from "@/app/components/RegisterLogin/Login";
import ActivateAccount from "@/app/components/RegisterLogin/ActivateAccount";
import ForgetPassword from "./components/RegisterLogin/ForgetPassword";

export default function Home() {
  const searchParams = useSearchParams();

  const defStatus = searchParams.get("action") ?? "register";
  const [formStatus, setFormStatus] = useState(defStatus);

  return (
    <main className={`${styles.main} justify-between`}>
      <div
        className={`w-50 d-flex justify-center align-center
        ${styles["logo-side"]}`}>
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
        {formStatus === "activateAccount" && (
          <ActivateAccount setFormStatus={setFormStatus} />
        )}
        {formStatus === "forgetPassword" && (
          <ForgetPassword setFormStatus={setFormStatus} />
        )}
      </div>
    </main>
  );
}
