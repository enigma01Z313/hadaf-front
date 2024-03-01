import requests from "../request";

const getKpisList = async (workspaceId, filteredUser, status) => {
  let queryParamFlag = false;
  let url = `workspaces/${workspaceId}/kpis`;

  const statusQuery = `?status=${status}`;
  url += statusQuery;

  if (filteredUser && filteredUser !== "all") {
    let queryText = "&";
    queryText += `userId=${filteredUser}`;
    url += queryText;
    queryParamFlag = true;
  }

  const items = await requests.get(url);

  return items;
};

export default getKpisList;
