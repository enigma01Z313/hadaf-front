import requests from "../request";

const getWorkspacesList = async () => {
  const users = await requests.get("workspaces");

  return users;
};

export default getWorkspacesList;
