import requests from "../request";

const updateAdmiration = async (workspaceId, admirationId, data) => {
  const url = `workspaces/${workspaceId}/admirations/${admirationId}`;

  const uppedData = await requests.put(url, data);

  return uppedData;
};

export default updateAdmiration;
