import requests from "../request";

const resendActivationCode = async (email) => {
  const activateCode = await requests.post("auth/resendActivateCode", {
    email,
    skipCaptcha: true,
  });

  return activateCode
};

export default resendActivationCode;
