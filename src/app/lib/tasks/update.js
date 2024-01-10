import requests from "../request";

const updateTask = async (taskId, data, workspaceId) => {
  const reqUrl = `workspaces/${workspaceId}/tasks/${taskId}`;
  const task = await requests.put(reqUrl, data);

  return task;
};

export default updateTask;
