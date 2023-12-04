import requests from "../request";

const updateUser = async (id, body) => {
  const res = await requests.put(`users/${id}`, body);

  return res;
};

export default updateUser;
