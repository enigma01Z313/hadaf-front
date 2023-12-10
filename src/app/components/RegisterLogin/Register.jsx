import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FormControl, InputLabel, Input, Grid, Switch } from "@mui/material";

import saveLoginData from "../Auth/utils/saveLoginData";
import ContainedPrimary from "@/app/components/Button/ContainedPrimary";
import DoupleActiveSwitch from "@/app/components/DoupleActiveSwitch";
import TexedPrimary from "../Button/TexedPrimary";
import Error from "../Shared/Error";

import registerForm from "@/app/lib/Auth/registerForm";

export default function Register({ setFormStatus }) {
  const router = useRouter();

  const fullNameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordReRef = useRef();
  const referalCodeRef = useRef();

  const [loading, setLoading] = useState(false);
  const [fullNameError, setFullNameError] = useState();
  const [phoneError, setPhoneError] = useState();
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [passwordReError, setPasswordReError] = useState();
  const [usage, setUsage] = useState(0);
  const [referalCode, setReferalCode] = useState(false);

  const formValidate = () => {
    let hasError = false;

    if (fullNameRef.current.value === "") {
      hasError = true;
      setFullNameError("فیلد اجباری");
    }

    if (phoneRef.current.value === "") {
      hasError = true;
      setPhoneError("فیلد اجباری");
    } else if (!phoneRef.current.value.match(/^\+?[0-9]\d{1,10}$/)) {
      setPhoneError("فرمت شماره تماس اشتباه میباشد");
    }

    if (emailRef.current.value === "") {
      hasError = true;
      setEmailError("فیلد اجباری");
    } else if (
      !emailRef.current.value.match(
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
      )
    ) {
      setEmailError("فرمت ایمیل اشتباه میباشد");
    }

    if (passwordRef.current.value === "") {
      hasError = true;
      setPasswordError("فیلد اجباری");
    } else if (
      !passwordRef.current.value.match(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/
      )
    ) {
      setPasswordError("حداقل 8 کارکتر و استفاده از حروف انگلیسی کوچک و بزرگ");
    }

    if (passwordReRef.current.value === "") {
      hasError = true;
      setPasswordReError("فیلد اجباری");
    } else if (passwordRef.current.value !== passwordReRef.current.value) {
      setPasswordReError("عدم تطابق با رمز عبور");
    }

    return hasError;
  };

  const submitRegisterForm = async () => {
    const hasError = formValidate();
    const usageType = usage === 0 ? 1 : 0;

    if (!hasError) {
      setLoading(true);
      const user = await registerForm(
        fullNameRef.current.value,
        phoneRef.current.value,
        emailRef.current.value,
        passwordRef.current.value,
        passwordReRef.current.value,
        usageType
      );

      setLoading(false);
      if (!user.error) {
        saveLoginData(user);
        router.push(`/dashboard`);
      }
    }
  };

  return (
    <>
      <h4 className="weight-500">ثبت نام</h4>
      <div
        className={`d-flex direction-column
          ${loading ? "loading" : ""}`}
        style={{ width: 400 }}>
        <FormControl className="mt-3 rtl-input p-relative">
          <InputLabel htmlFor="full-name">نام و نام خانوادگی</InputLabel>
          <Input
            id="full-name"
            aria-describedby="my-helper-text"
            inputRef={fullNameRef}
            onFocus={() => setFullNameError(undefined)}
          />
          {fullNameError && <Error>{fullNameError}</Error>}
        </FormControl>
        <FormControl className="mt-3 rtl-input p-relative">
          <InputLabel htmlFor="mobile">شماره موبایل</InputLabel>
          <Input
            id="mobile"
            aria-describedby="my-helper-text"
            inputRef={phoneRef}
            onFocus={() => setPhoneError(undefined)}
          />
          {phoneError && <Error>{phoneError}</Error>}
        </FormControl>
        <FormControl className="mt-3 rtl-input p-relative">
          <InputLabel htmlFor="phone">ایمیل</InputLabel>
          <Input
            id="phone"
            aria-describedby="my-helper-text"
            type="email"
            inputRef={emailRef}
            onFocus={() => setEmailError(undefined)}
          />
          {emailError && <Error>{emailError}</Error>}
        </FormControl>
        <FormControl className="mt-3 rtl-input p-relative">
          <InputLabel htmlFor="password">رمز عبور</InputLabel>
          <Input
            id="password"
            aria-describedby="my-helper-text"
            inputRef={passwordRef}
            onFocus={() => setPasswordError(undefined)}
            type="password"
          />
          {passwordError && <Error>{passwordError}</Error>}
        </FormControl>
        <FormControl className="mt-3 rtl-input p-relative">
          <InputLabel htmlFor="password-re">تکرار رمز عبور</InputLabel>
          <Input
            id="password-re"
            aria-describedby="my-helper-text"
            inputRef={passwordReRef}
            onFocus={() => setPasswordReError(undefined)}
            type="password"
          />
          {passwordReError && <Error>{passwordReError}</Error>}
        </FormControl>
        <FormControl className="mt-3 rtl-input p-relative">
          <span htmlFor="password-re">نوع استفاده</span>

          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item className="text-h6 weight-500">
              شخصی
            </Grid>
            <Grid item>
              <DoupleActiveSwitch
                onChange={(val) => {
                  console.log("111111111", val);
                }}
                value={1}
                style="two-active"
              />
            </Grid>
            <Grid item className="text-h6 weight-500">
              سازمانی
            </Grid>
          </Grid>
        </FormControl>
        <FormControl className="mt-3 rtl-input p-relative">
          <span
            htmlFor="password-re"
            onClick={() => setReferalCode((state) => !state)}
            className="color-primary"
            style={{ cursor: "pointer" }}>
            کد معرف دارید؟
          </span>

          {referalCode && (
            <Input
              id="referalCode"
              aria-describedby="my-helper-text"
              inputRef={referalCodeRef}
              placeholder="کد معرف..."
            />
          )}
        </FormControl>

        <ContainedPrimary
          onClick={submitRegisterForm}
          className="mt-3 justify-center"
          size="large">
          ثبت نام
        </ContainedPrimary>
      </div>
      <div className="mt-2">
        حساب کاربری دارید؟
        <TexedPrimary className="mr-1" onClick={() => setFormStatus("login")}>
          ورود
        </TexedPrimary>
      </div>
    </>
  );
}
