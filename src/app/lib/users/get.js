import requests from "../request";

const getUser = async (id) => {
  const users = await requests.get(`users/${id}`);

  return users;
};

export default getUser;
