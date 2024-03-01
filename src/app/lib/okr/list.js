import requests from "../request";

const getOkrsList = async (workspaceId, activeTimeframe) => {
  let queryParamFlag = false;

  let url = `workspaces/${workspaceId}/okrs`;

  if (activeTimeframe) {
    let queryText = !queryParamFlag ? "?" : "&";
    queryText += `timeFrameId=${activeTimeframe}`;
    url += queryText;
    queryParamFlag = true;
  }

  const okrs = await requests.get(url);

  return okrs;
};

export default getOkrsList;
