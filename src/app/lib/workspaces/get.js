import requests from "../request";

const getWorkspace = async (id) => {
  const users = await requests.get(`workspaces/${id}`);

  return users;
};

export default getWorkspace;
