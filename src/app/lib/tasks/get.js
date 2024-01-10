import requests from "../request";

const getTask = async (taskId, workspaceId) => {
    const reqUrl = `workspaces/${workspaceId}/tasks/${taskId}`
  const task = await requests.get(reqUrl);

  return task;
};

export default getTask;
