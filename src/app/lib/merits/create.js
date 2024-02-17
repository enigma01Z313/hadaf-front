import requests from "../request";

const createMerit = async (workspaceId, data) => {
  const tasksUrl = `workspaces/${workspaceId}/merits`;

  const newTag = await requests.post(tasksUrl, data);

  return newTag;
};

export default createMerit;
