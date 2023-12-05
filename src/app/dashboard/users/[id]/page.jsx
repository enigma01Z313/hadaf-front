"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Grid,
  Switch,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import DoupleActiveSwitch from "@/app/components/DoupleActiveSwitch";
import Error from "@/app/components/Shared/Error";
import ContainedPrimary from "@/app/components/Button/ContainedPrimary";

import getUser from "@/app/lib/users/get";
import getUsersList from "@/app/lib/users/list";
import uploadImage from "@/app/lib/file/uploadImage";
import updateUser from "@/app/lib/users/update";

import styles from "./page.module.css";

export default function User({ params }) {
  const passwordRef = useRef();
  const passwordReRef = useRef();
  const referalCodeRef = useRef();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [imageId, setImageId] = useState();
  const [uploadLoading, setUploadLoading] = useState(false);

  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fullNameError, setFullNameError] = useState();
  const [phoneError, setPhoneError] = useState();
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [passwordReError, setPasswordReError] = useState();
  const [superviser, setSupervser] = useState();
  const [usage, setUsage] = useState(0);

  useEffect(() => {
    (async function () {
      const userData = await getUser(params.id);
      const usersList = await getUsersList();

      if (userData.imageId !== null) setImageId(userData.imageId);
      setUsers(usersList);
      setUser(userData);
      setFullName(userData.fullName);
      setPhone(userData.phone);
      setEmail(userData.email);
      setLoading(false);
    })();
  }, []);

  const formValidate = () => {
    let hasError = false;

    if (fullName === "") {
      hasError = true;
      setFullNameError("فیلد اجباری");
    }

    if (phone === "") {
      hasError = true;
      setPhoneError("فیلد اجباری");
    } else if (!phone.match(/^\+?[0-9]\d{1,10}$/)) {
      setPhoneError("فرمت شماره تماس اشتباه میباشد");
    }

    if (email === "") {
      hasError = true;
      setEmailError("فیلد اجباری");
    } else if (
      !email.match(
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
      )
    ) {
      setEmailError("فرمت ایمیل اشتباه میباشد");
    }

    if (
      passwordRef.current.value !== "" &&
      !passwordRef.current.value.match(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/
      )
    ) {
      setPasswordError("حداقل 8 کارکتر و استفاده از حروف انگلیسی کوچک و بزرگ");
    }

    if (
      passwordRef.current.value !== "" &&
      passwordRef.current.value !== passwordReRef.current.value
    ) {
      setPasswordReError("عدم تطابق با رمز عبور");
    }

    return hasError;
  };

  const submitRegisterForm = async () => {
    const hasError = formValidate();
    const usageType = usage === 0 ? 1 : 0;
    if (!hasError) {
      setLoading(true);

      const { uppedUser } = await updateUser(user.id, {
        fullName,
        phone,
        email,
      });
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    setUploadLoading(true);

    const file = e.target.files?.[0];
    const formData = new FormData();
    formData.append("file", file);

    const imageId = await uploadImage(formData);
  };

  // console.log("1111111111111111111111111111");
  // console.log(uploadLoading);

  return (
    <div
      className={`
    d-flex justify-between w-100 py-3 px-2 wrapper-box align-center
    ${loading ? "loading" : ""}`}
    >
      <div className="w-50">
        <Button
          className={`p-0 d-flex justify-between
            ${uploadLoading ? styles["loading"] : ""}`}
          color="inherit"
          component="label"
        >
          <input type="file" onChange={(e) => handleImageUpload(e)} hidden />
          {(user.imageId && "aaaa") || (
            <AccountCircleIcon style={{ fontSize: 50, opacity: 0.5 }} />
          )}
        </Button>
      </div>

      <FormControl className="rtl-input p-relative w-50">
        <InputLabel htmlFor="full-name">نام و نام خانوادگی</InputLabel>
        <Input
          id="full-name"
          aria-describedby="my-helper-text"
          onFocus={() => setFullNameError(undefined)}
          onChange={(e) => setFullName(e.target.value)}
          value={fullName}
        />
        {fullNameError && <Error>{fullNameError}</Error>}
      </FormControl>
      <FormControl className="rtl-input p-relative w-50">
        <InputLabel htmlFor="mobile">شماره موبایل</InputLabel>
        <Input
          id="mobile"
          aria-describedby="my-helper-text"
          onFocus={() => setPhoneError(undefined)}
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
        />
        {phoneError && <Error>{phoneError}</Error>}
      </FormControl>
      <FormControl className="mt-3 rtl-input p-relative w-50">
        <InputLabel htmlFor="phone">ایمیل</InputLabel>
        <Input
          id="phone"
          aria-describedby="my-helper-text"
          type="email"
          onFocus={() => setEmailError(undefined)}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          style={{ direction: "ltr" }}
        />
        {emailError && <Error>{emailError}</Error>}
      </FormControl>
      <FormControl className="mt-3 rtl-input p-relative w-50">
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
      <FormControl className="mt-3 rtl-input p-relative w-50">
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
      <FormControl className="mt-3 rtl-input p-relative w-50">
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
      <FormControl className="mt-3 rtl-input p-relative w-50">
        <InputLabel htmlFor="password-re">کد معرف</InputLabel>
        <Input
          id="password-re"
          aria-describedby="my-helper-text"
          inputRef={referalCodeRef}
        />
      </FormControl>
      <FormControl
        className="mt-3 rtl-input p-relative w-50"
        variant="standard"
      >
        <InputLabel htmlFor="password-re">ناظر</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={superviser}
          onChange={(e) => setSupervser(e.target.value)}
          label="ناظر"
        >
          <MenuItem value="">
            <em>-</em>
          </MenuItem>
          {users.length !== 0 &&
            users
              .filter((item) => item.id !== params.id)
              .map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.fullName}
                </MenuItem>
              ))}
        </Select>
      </FormControl>

      <ContainedPrimary
        onClick={submitRegisterForm}
        className="mt-3 justify-center"
        size="large"
      >
        ذخیره
      </ContainedPrimary>
    </div>
  );
}
