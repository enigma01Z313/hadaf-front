import requests from "../request";

const loginForm = async (username, password) => {
  const body = {
    userName: username,
    password,
    skipCaptcha: true,
  };

  const res = await requests.post("auth/login", body);

  return res;
};

export default loginForm;
