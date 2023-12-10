import React, { useState, useEffect, useRef } from "react";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

import { toast } from "react-toastify";
import { FormControl, InputLabel, Input } from "@mui/material";

import ContainedPrimary from "@/app/components/Button/ContainedPrimary";
import TexedPrimary from "@/app/components/Button/TexedPrimary";
import Error from "../Shared/Error";

import activateAccount from "@/app/lib/Auth/activateAccount";

import resendActivationCode from "@/app/lib/Auth/resendActivationCode";

export default function ActivateAccount({ setFormStatus }) {
  const searchParams = useSearchParams();

  const usernameRef = useRef();

  const [usernameError, setUsernameError] = useState();
  const [loading, setLoading] = useState(true);
  const [resend, setResend] = useState(false);

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

  const submitRegisterForm = async () => {
    const hasError = formValidate();

    if (!hasError) {
      setLoading(true);
      const user = await resendActivationCode(usernameRef.current.value);
      setLoading(false);

      toast.success("کد فعالسازی ارسال شد.");
    }
  };

  useEffect(() => {
    (async function () {
      const userId = searchParams.get("userId");
      const activationCode = searchParams.get("activationCode");

      const user = await activateAccount(userId, activationCode);
      setLoading(false);

      if (user.error) setResend(true);
      console.log("1");
      console.log(user);
    })();
  }, []);

  return (
    <>
      {loading && "درحال فعالسازی حساب کاربری"}
      {resend && (
        <>
          <h4 className="weight-500">ارسال مجدد کد فعالسازی</h4>
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
              onClick={submitRegisterForm}
              className="mt-3 justify-center"
              size="large">
              فعال سازی
            </ContainedPrimary>
          </div>
          <div className="mt-2">
            حساب کاربری ندارید
            <TexedPrimary className="mr-1" onClick={() => setFormStatus("register")}>
              ثبت نام
            </TexedPrimary>
          </div>
        </>
      )}
    </>
  );
}
