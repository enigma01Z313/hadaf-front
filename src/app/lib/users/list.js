import requests from "../request";

const getUsersList = async () => {
  const users = await requests.get("users");

  return users;
};

export default getUsersList;
