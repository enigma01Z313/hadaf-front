import requests from "../request";

const createKPI = async (workspaceId, data) => {
  const tasksUrl = `workspaces/${workspaceId}/kpis`;

  const newTask = await requests.post(tasksUrl, data);

  return newTask;
};

export default createKPI;
