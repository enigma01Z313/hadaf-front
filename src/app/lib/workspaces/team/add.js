import requests from "../../request";

const createTeam = async (workspaceId, data) => {
  const user = await requests.post(`workspaces/${workspaceId}/teams`, data);

  return user;
};

export default createTeam;
