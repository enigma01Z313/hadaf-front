import requests from "../../request";

const getWorkspaceUsersList = async (workspaceId) => {
  const usersGetUrl = `workspaces/${workspaceId}/users`;

  if (!workspaceId) return [];

  const users = await requests.get(usersGetUrl);

  return users;
};

export default getWorkspaceUsersList;
