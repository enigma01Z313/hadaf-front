import requests from "../request";

const activateAccount = async (userId, activeCode) => {
  const body = {
    userId,
    activeCode,
    skipCaptcha: true
  };
  const data = await requests.post(`auth/activateAccount`, body);
  
  return data
};

export default activateAccount;
