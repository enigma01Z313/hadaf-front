import requests from "../request";

const registerForm = async (
  fullName,
  phone,
  email,
  password,
  confirmPassword,
  usageType
) => {
  const body = {
    fullName,
    phone,
    email,
    password,
    confirmPassword,
    usageType,
    skipCaptcha: true,
  };
  const res = await requests.post("auth/register", body);

  return res;
};

export default registerForm;
