import React, { useState, useRef, useContext } from "react";
import { FormControl, InputLabel, Input } from "@mui/material";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import Error from "@/app/components/Shared/Error";
import TexedError from "@/app/components/Button/TextedError";
import TexedPrimary from "@/app/components/Button/TexedPrimary";
import addUserToWorkspace from "@/app/lib/workspaces/users/add";

import workspaceContext from "@/app/context/workspaceContext";

export default function AddUserToWorkspace({
  modalClose,
  modalLoading,
  setRealoadList,
}) {
  const router = useRouter();
  const { theWorkspace } = useContext(workspaceContext);

  const emailRef = useRef();

  const [emailError, setEmailError] = useState();

  const formValidate = () => {
    let hasError = false;

    if (emailRef.current.value === "") {
      hasError = true;
      setEmailError("فیلد اجباری");
    } else if (
      !emailRef.current.value.match(
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
      )
    ) {
      setEmailError("فرمت ایمیل اشتباه میباشد");
      hasError = true;
    }

    return hasError;
  };

  const submitRegisterForm = async () => {
    const hasError = formValidate();

    if (!hasError) {
      modalLoading(true);

      const user = await addUserToWorkspace({
        workspaceId: theWorkspace,
        email: emailRef.current.value,
      });

      modalLoading(false);

      if (!user.error) {
        toast.success("کاربر به فضای کاری جاری افزوده شد");
        modalClose();
        setRealoadList((state) => !state);
      }
    }
  };

  return (
    <div className={`d-flex justify-between w-100 align-center`}>
      <FormControl className="mt-3 rtl-input p-relative w-100">
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

      {
        <div className="w-100 d-flex mt-3 justify-end">
          <TexedError onClick={() => modalClose?.()} className="ml-1">
            منصرف شدن
          </TexedError>
          <TexedPrimary onClick={submitRegisterForm}>ثبت</TexedPrimary>
        </div>
      }
    </div>
  );
}
