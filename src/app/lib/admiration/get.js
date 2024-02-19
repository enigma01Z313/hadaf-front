import requests from "../request";

const getAdmiration = async (workspaceId, admirationId) => {
  const url = `/workspaces/${workspaceId}/admirations/${admirationId}`;

  const data = await requests.get(url);

  return data;
};

export default getAdmiration;
