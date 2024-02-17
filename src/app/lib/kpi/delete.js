import requests from "../request";

const deleteKpi = async (workspaceId, okrId) => {
  const url = `/workspaces/${workspaceId}/kpis/${okrId}`;

  await requests.remove(url);
};

export default deleteKpi;
