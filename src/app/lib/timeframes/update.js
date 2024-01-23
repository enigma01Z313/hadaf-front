import requests from "../request";

const updateTimeframe = async (timeframeId, data, workspaceId) => {
  const uppedTimeframe = await requests.put(
    `/workspaces/${workspaceId}/timeframes/${timeframeId}`,
    data
  );

  return uppedTimeframe
};

export default updateTimeframe;
