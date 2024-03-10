import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import Countdown from "react-countdown";
import { toast } from "react-toastify";
import { FormControl, InputLabel, Input } from "@mui/material";
import saveLoginData from "../Auth/utils/saveLoginData";

import ContainedPrimary from "@/app/components/Button/ContainedPrimary";
import TexedPrimary from "@/app/components/Button/TexedPrimary";
import Error from "../Shared/Error";

import oneTimeLogin from "@/app/lib/Auth/oneTimeLogin";
import oneTimePassword from "@/app/lib/Auth/oneTimePassword";
import DigitsInput from "@/app/components/DigitsInput";

const resendInterval = 90 * 1000;
const oneTimeLenght = 4;

export default function ForgetPassword({ setFormStatus }) {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState();
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState("");
  const [resetDigits, setResetDigits] = useState(false);

  const usernameIdRef = useRef();

  const formValidate = () => {
    let hasError = false;

    if (username === "") {
      hasError = true;
      setUsernameError("فیلد اجباری");
    } else if (
      !username.match(/^\+?[0-9]\d{1,10}$/) &&
      !username.match(
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
      )
    ) {
      hasError = true;
      setUsernameError("لطفا ایمیل یا شماره تماس معتبر وارد نمایید");
    }

    return hasError;
  };

  const submitOnetimePasswordForm = async () => {
    const hasError = formValidate();

    if (!hasError || hasError) {
      setLoading(true);
      const { id } = await oneTimeLogin(username);
      localStorage.setItem("sendOnetimeLogin", new Date().getTime());

      if (id) {
        usernameIdRef.current = id;
        toast.success("رمز یکبار مصرف ارسال شد");

        setResendTimer(resendInterval);
        setStep(2);
      } else {
        setUsername("");
      }
      setLoading(false);
      setResetDigits((state) => !state);
    }
  };

  const submitOnetimeConfirmForm = async () => {
    const userId = usernameIdRef.current;

    setLoading(true);
    const user = await oneTimePassword(userId, password);

    setLoading(false);
    if (!user.error) {
      saveLoginData(user);
      router.push("/dashboard/okrsDashboard");
    } else {
      setResetDigits((state) => !state);
      toast.error(user.error);
    }
  };

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
      <h4 className="weight-500">فراموشی رمز عبور</h4>
      {(step === 1 && (
        <div
          className={`d-flex direction-column mt-3 
                ${loading ? "loading" : ""}`}
          style={{ maxWidth: 400, width: `calc(100% - 40px)` }}
        >
          <FormControl className="rtl-input p-relative focus-left">
            <InputLabel htmlFor="full-name">ایمیل یا شماره تماس</InputLabel>
            <Input
              id="full-name"
              aria-describedby="my-helper-text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setUsernameError(undefined)}
            />
            {usernameError && <Error>{usernameError}</Error>}
          </FormControl>

          <ContainedPrimary
            onClick={submitOnetimePasswordForm}
            className="mt-3 justify-center"
            size="large"
          >
            ارسال رمز یکبار مصرف
          </ContainedPrimary>
        </div>
      )) ||
        (step === 2 && (
          <div
            className={`d-flex direction-column mt-3 
                ${loading ? "loading" : ""}`}
            style={{ width: 400 }}
          >
            <DigitsInput
              digits={oneTimeLenght}
              setter={setPassword}
              resetDigits={resetDigits}
            />

            <ContainedPrimary
              disabled={password.length !== oneTimeLenght}
              onClick={submitOnetimeConfirmForm}
              className="mt-3 justify-center"
              size="large"
            >
              ورود
            </ContainedPrimary>
            <span className="mt-2 d-flex justify-center align-center">
              {resendTimer !== 0 && (
                <Countdown
                  date={Date.now() + resendTimer}
                  renderer={countdownRenderer}
                />
              )}
              <TexedPrimary
                onClick={submitOnetimePasswordForm}
                disabled={resendTimer !== 0}
                size="small"
                className="mr-1"
              >
                ارسال مجدد
              </TexedPrimary>
            </span>
          </div>
        ))}
      <div className="mt-2">
        حساب کاربری ندارید
        <TexedPrimary
          className="mr-1"
          onClick={() => setFormStatus("register")}
        >
          ثبت نام
        </TexedPrimary>
      </div>
    </>
  );
}
