import requests from "../request";

const oneTimeLogin = async (username) => {
  const body = {
    userName: username,
    skipCaptcha: true,
  };

  const res = await requests.post("auth", body);

  return res;
};

export default oneTimeLogin;
