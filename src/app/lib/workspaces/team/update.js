import requests from "../../request";

const updateTeam = async (workspaceId, teamId, body) => {
  const res = await requests.put(
    `workspaces/${workspaceId}/teams/${teamId}`,
    body
  );

  return res;
};

export default updateTeam;
