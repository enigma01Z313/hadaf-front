import requests from "../request";

const getDashboardData = async ({ workspaceId, target }) => {
  const url = `/workspaces/${workspaceId}/dashboard/${target}`;

  const data = await requests.get(url);

  return data
};

export default getDashboardData;
