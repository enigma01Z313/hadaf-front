"use client";

import React, { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

import styles from "./page.module.css";

import Register from "@/app/components/RegisterLogin/Register";
import Login from "@/app/components/RegisterLogin/Login";
import ActivateAccount from "@/app/components/RegisterLogin/ActivateAccount";
import ForgetPassword from "./components/RegisterLogin/ForgetPassword";

export default function Home() {
  const searchParams = useSearchParams();

  const defStatus = searchParams.get("action") ?? "login";
  const [formStatus, setFormStatus] = useState(defStatus);

  return (
    <main className={`${styles.main} auth-main justify-between`}>
      <div
        className={`w-50 d-flex justify-center align-center
        ${styles["logo-side"]}`}
      >
        <Image
          className="mb-2 mx-2"
          src="/logoa.png"
          alt="خانه"
          width={200}
          height={68}
        />
      </div>
      <div className="w-50 d-flex justify-center align-center direction-column">
        <Image
          className="mt-3 mb-2 mx-2 mobile-logo"
          src="/logoa.png"
          alt="خانه"
          width={150}
          height={51}
        />
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
