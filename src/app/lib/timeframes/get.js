import requests from "../request";

const getTimeframe = async (workspaceId, timeframeId) => {
  const theTimeframe = await requests.get(
    `workspaces/${workspaceId}/timeframes/${timeframeId}`
  );

  return theTimeframe;
};

export default getTimeframe;
