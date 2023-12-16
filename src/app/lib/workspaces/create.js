import requests from "../request";

const createWorkspace = async (
  name,
  membersNumber,
  usageType,
  description,
  ownerId
) => {
  const body = { name, membersNumber, usageType, description, ownerId };
  const workspace = await requests.post("workspaces", body);

  return workspace;
};

export default createWorkspace;
