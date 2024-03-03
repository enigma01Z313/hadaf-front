import requests from "../../request";

const getTeam = async (workspaceId, teamId) => {
  const users = await requests.get(`workspaces/${workspaceId}/teams/${teamId}`);

  return users;
};

export default getTeam;
