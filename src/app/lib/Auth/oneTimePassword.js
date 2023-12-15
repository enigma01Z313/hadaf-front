import requests from "../request";

const oneTimePassword = async (id, password) => {
  const user = await requests.post(`auth/${id}`, {
    confirmCode: password,
    skipCaptcha: true,
  });

  return user;
};

export default oneTimePassword;
