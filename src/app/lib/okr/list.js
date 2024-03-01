import requests from "../request";

const getOkrsList = async (workspaceId, activeTimeframe, filteredUser) => {
  let queryParamFlag = false;
  let url = `workspaces/${workspaceId}/okrs`;

  if (activeTimeframe) {
    let queryText = !queryParamFlag ? "?" : "&";
    queryText += `timeFrameId=${activeTimeframe}`;
    url += queryText;
    queryParamFlag = true;
  }

  if (filteredUser && filteredUser!=='all') {
    let queryText = !queryParamFlag ? "?" : "&";
    queryText += `userId=${filteredUser}`;
    url += queryText;
    queryParamFlag = true;
  }

  const okrs = await requests.get(url);

  return okrs;
};

export default getOkrsList;
