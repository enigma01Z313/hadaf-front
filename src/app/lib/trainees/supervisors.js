import requests from "../request";

const getUsersSup = async () => {
  const users = await requests.get('users');

  return users;
};

export default getUsersSup;
