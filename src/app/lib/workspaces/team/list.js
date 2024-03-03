import requests from "../../request";

const getTeams = async (workspaceId) => {
  const url = `workspaces/${workspaceId}/teams`;

  const items = await requests.get(url);

  console.log('1-------------------');
  console.log(items);

  return items;
};

export default getTeams;
