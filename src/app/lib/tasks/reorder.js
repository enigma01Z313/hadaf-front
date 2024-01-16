import requests from "../request";

const reorderTasks = async ({ workspaceId, data }) => {
  const reqUrl = `workspaces/${workspaceId}/tasks`;
  const tasks = await requests.put(reqUrl, { action: "reorder", data });

  return tasks;
};

export default reorderTasks;
