"use client";

import React, { useEffect, useState, useRef, useContext } from "react";
import { FormControl, InputLabel, Input } from "@mui/material";

import Error from "@/app/components/Shared/Error";
import ContainedPrimary from "@/app/components/Button/ContainedPrimary";

import getUser from "@/app/lib/users/get";
import getUsersList from "@/app/lib/users/list";
import updateUser from "@/app/lib/users/update";

import workspaceContext from "@/app/context/workspaceContext";

import {toast} from 'react-toastify'

import styles from "../page.module.css";

export default function User({ params }) {
  const passwordRef = useRef();
  const passwordReRef = useRef();

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [passwordError, setPasswordError] = useState();
  const [passwordReError, setPasswordReError] = useState();
  const [usage, setUsage] = useState(0);
  const { theUser, setTheUser } = useContext(workspaceContext);

  useEffect(() => {
    (async function () {
      const userData = await getUser(params.id);

      if (userData.imageId !== null) setImageId(userData.imageId);
      setUser(userData);
      setLoading(false);
    })();
  }, [params.id]);

  const formValidate = () => {
    let hasError = false;

    if( passwordRef.current.value === "" ) {
      hasError=true
      setPasswordError("فیلد اجباری");
    }

    if( passwordReRef.current.value === "" ) {
      hasError=true
      setPasswordReError("فیلد اجباری");
    }

    if (
      passwordRef.current.value !== "" &&
      !passwordRef.current.value.match(
        /^(?=.*?[a-z])((?=.*?[A-Z])(?=.*?[0-9])|(?=.*?[#?!@$ %^&*-])).{8,}$/
      )
    ) {
      hasError=true
      setPasswordError("حداقل 8 کارکتر و استفاده از حروف انگلیسی کوچک و بزرگ");
    }

    if (
      passwordRef.current.value !== "" &&
      passwordRef.current.value !== passwordReRef.current.value
    ) {
      hasError=true
      setPasswordReError("عدم تطابق با رمز عبور");
    }

    return hasError;
  };

  const submitRegisterForm = async () => {
    const hasError = formValidate();
    const usageType = usage === 0 ? 1 : 0;

    if (!hasError) {
      setLoading(true);

      const uppedUser = await updateUser(user.id, {
        passowrd: passwordRef.current.value,
      });

      if (user.id === theUser.id) {
        setTheUser(uppedUser);
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, fullName: uppedUser.fullName })
        );
      }

      toast.success('به روزرسانی با موفقیت انجام شد.')

      passwordRef.current.value = ''
      passwordReRef.current.value = ''
      setLoading(false);
    }
  };

  return (
    <div
      className={`
        d-flex justify-between py-3 px-2 wrapper-box align-center
        ${loading ? "loading" : ""}`}>
      <FormControl className="mt-3 rtl-input p-relative w-50">
        <InputLabel htmlFor="password">رمز عبور حدید</InputLabel>
        <Input
          id="password"
          aria-describedby="my-helper-text"
          inputRef={passwordRef}
          onFocus={() => setPasswordError(undefined)}
          type="password"
        />
        {passwordError && <Error>{passwordError}</Error>}
      </FormControl>
      <FormControl className="mt-3 rtl-input p-relative w-50">
        <InputLabel htmlFor="password-re">تکرار رمز عبور جدید</InputLabel>
        <Input
          id="password-re"
          aria-describedby="my-helper-text"
          inputRef={passwordReRef}
          onFocus={() => setPasswordReError(undefined)}
          type="password"
        />
        {passwordReError && <Error>{passwordReError}</Error>}
      </FormControl>

      <ContainedPrimary
        onClick={submitRegisterForm}
        className="mt-3 justify-center"
        size="large">
        ذخیره
      </ContainedPrimary>
    </div>
  );
}
