import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FormControl, InputLabel, Input } from "@mui/material";

import saveLoginData from "../Auth/utils/saveLoginData";
import ContainedPrimary from "@/app/components/Button/ContainedPrimary";
import TexedPrimary from "@/app/components/Button/TexedPrimary";
import Error from "../Shared/Error";

import loginForm from "@/app/lib/Auth/loginForm";
import { toast } from "react-toastify";

export default function Login({ setFormStatus }) {
  const router = useRouter();

  const usernameRef = useRef();
  const passwordRef = useRef();

  const [loading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState();
  const [passwordError, setPasswordError] = useState();

  const formValidate = () => {
    let hasError = false;

    if (usernameRef.current.value === "") {
      hasError = true;
      setUsernameError("فیلد اجباری");
    } else if (
      !usernameRef.current.value.match(/^\+?[0-9]\d{1,10}$/) &&
      !usernameRef.current.value.match(
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
      )
    ) {
      hasError = true;
      setUsernameError("لطفا ایمیل یا شماره تماس معتبر وارد نمایید");
    }

    if (passwordRef.current.value === "") {
      hasError = true;
      setPasswordError("فیلد اجباری");
    }

    return hasError;
  }
  const submitRegisterForm = async () => {
    const hasError = formValidate();

    if (!hasError) {
      setLoading(true);
      const user = await loginForm(
        usernameRef.current.value,
        passwordRef.current.value
      );

      if (user.error) {
        setLoading(false);
        toast.error(user.error);
      } else {
        saveLoginData(user);
        router.push(`/dashboard/okrsDashboard`);
      }
    }
  };

  return (
    <>
      <h4 className="weight-500">ورود به حساب کاربری</h4>
      <div
        className={`d-flex direction-column
          ${loading ? "loading" : ""}`}
        style={{ width: 400 }}>
        <FormControl className="mt-3 rtl-input p-relative">
          <InputLabel htmlFor="full-name">ایمیل یا شماره تماس</InputLabel>
          <Input
            id="full-name"
            aria-describedby="my-helper-text"
            inputRef={usernameRef}
            onFocus={() => setUsernameError(undefined)}
          />
          {usernameError && <Error>{usernameError}</Error>}
        </FormControl>
        <FormControl className="mt-3 rtl-input p-relative">
          <InputLabel htmlFor="mobile">رمز عبور</InputLabel>
          <Input
            id="mobile"
            aria-describedby="my-helper-text"
            inputRef={passwordRef}
            onFocus={() => setPasswordError(undefined)}
            type="password"
          />
          {passwordError && <Error>{passwordError}</Error>}
        </FormControl>

        <ContainedPrimary
          onClick={submitRegisterForm}
          className="mt-3 justify-center"
          size="large">
          ورود
        </ContainedPrimary>
      </div>
      <div className="mt-2">
        حساب کاربری ندارید
        <TexedPrimary
          className="mr-1"
          onClick={() => setFormStatus("register")}>
          ثبت نام
        </TexedPrimary>
      </div>
      <div className="mt-2">
        رمز عبور خود را فراموش کردین؟
        <TexedPrimary
          className="mr-1"
          onClick={() => setFormStatus("forgetPassword")}>
          بازیابی
        </TexedPrimary>
      </div>
    </>
  );
}
