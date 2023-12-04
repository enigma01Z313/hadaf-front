import requests from "../request";

const createWorkspace = async (name, membersNumber, usageType, description) => {
  const body = { name, membersNumber, usageType, description };
  const workspace = await requests.post("workspaces", body);

  return workspace;
};

export default createWorkspace;
