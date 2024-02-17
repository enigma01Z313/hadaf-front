import requests from "../request";

const createTag = async (workspaceId, data) => {
  const tasksUrl = `workspaces/${workspaceId}/tags`;

  const newTag = await requests.post(tasksUrl, data);

  return newTag;
};

export default createTag;
