"use client";

import saveLoginData from "../Auth/utils/saveLoginData";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Countdown from "react-countdown";

import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { FormControl, InputLabel, Input } from "@mui/material";

import ContainedPrimary from "@/app/components/Button/ContainedPrimary";
import TexedPrimary from "@/app/components/Button/TexedPrimary";
import Timer from "./Timer";
import Error from "../Shared/Error";

import activateAccount from "@/app/lib/Auth/activateAccount";

import resendActivationCode from "@/app/lib/Auth/resendActivationCode";
import Link from "next/link";

const resendInterval = 120 * 1000;

export default function ActivateAccount({ setFormStatus }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const usernameRef = useRef();

  const [usernameError, setUsernameError] = useState();
  const [loading, setLoading] = useState(true);
  const [resend, setResend] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const formValidate = () => {
    let hasError = false;

    if (usernameRef.current.value === "") {
      hasError = true;
      setUsernameError("فیلد اجباری");
    } else if (
      !usernameRef.current.value.match(
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
      )
    ) {
      hasError = true;
      setUsernameError("لطفا ایمیل معتبر وارد نمایید");
    }

    return hasError;
  };

  const submitResendActivateCodeForm = async () => {
    const hasError = formValidate();

    if (!hasError) {
      setLoading(true);
      const { data } = await resendActivationCode(usernameRef.current.value);
      localStorage.setItem("sendActivateCode", new Date().getTime());

      setLoading(false);
      toast.success(data);
      setResendTimer(resendInterval);
    }
  };

  useEffect(() => {
    (async function () {
      const nowTime = new Date().getTime();
      const lastSnetTime = localStorage.getItem("sendActivateCode");

      if (lastSnetTime && nowTime - lastSnetTime < resendInterval) {
        setResendTimer(resendInterval - (nowTime - lastSnetTime));
        setResend(true);
      } else {
        const userId = searchParams.get("userId");
        const activationCode = searchParams.get("activationCode");

        const user = await activateAccount(userId, activationCode);

        localStorage.setItem("sendActivateCode", new Date().getTime());
        setResendTimer(resendInterval);
        if (user.error) setResend(true);
        else {
          saveLoginData(user);
          router.push("/dashboard/okrsDashboard");
        }
      }

      setLoading(false);
    })();
  }, []);

  const countdownRenderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      setTimeout(function () {
        setResendTimer(0);
      }, 100);
      return "";
    } else {
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  };

  return (
    <>
      {loading && "درحال فعالسازی حساب کاربری"}
      {resend && (
        <>
          <h4 className="weight-500">ارسال مجدد کد فعالسازی</h4>
          {(resendTimer === 0 && (
            <div
              className={`d-flex direction-column
                ${loading ? "loading" : ""}`}
              style={{ width: 400 }}>
              <FormControl className="mt-3 rtl-input p-relative">
                <InputLabel htmlFor="full-name">ایمیل</InputLabel>
                <Input
                  id="full-name"
                  aria-describedby="my-helper-text"
                  inputRef={usernameRef}
                  onFocus={() => setUsernameError(undefined)}
                />
                {usernameError && <Error>{usernameError}</Error>}
              </FormControl>

              <ContainedPrimary
                onClick={submitResendActivateCodeForm}
                className="mt-3 justify-center"
                size="large">
                فعال سازی
              </ContainedPrimary>
            </div>
          )) || (
            <span className="mt-2">
              <Countdown
                date={Date.now() + resendTimer}
                renderer={countdownRenderer}
              />
            </span>
          )}
          <div className="mt-2">
            حساب کاربری ندارید
            <Link href={"/"}>
              <TexedPrimary
                className="mr-1"
                onClick={() => setFormStatus("register")}>
                ثبت نام
              </TexedPrimary>
            </Link>
          </div>
        </>
      )}
    </>
  );
}
