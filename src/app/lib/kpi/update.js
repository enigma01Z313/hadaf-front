import requests from "../request";

const updateKpi = async (workspaceId, kpiId, data) => {
  const url = `workspaces/${workspaceId}/kpis/${kpiId}`;

  const uppedData = await requests.put(url, data);

  return uppedData;
};

export default updateKpi;
