import requests from "../request";

const getKpisList = async (workspaceId) => {
  const items = await requests.get(`workspaces/${workspaceId}/kpis`);

  return items;
};

export default getKpisList;
