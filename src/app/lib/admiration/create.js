import requests from "../request";

const createAdmiration = async (workspaceId, newAdmirationData) => {
  const url = `workspaces/${workspaceId}/admirations`;
  const newAdmiration = await requests.post(url, newAdmirationData);

  return newAdmiration;
};

export default createAdmiration;
