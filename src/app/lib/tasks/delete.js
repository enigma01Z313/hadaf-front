import requests from "../request";

const deleteTask = async (taskId, workspaceId) => {
  const reqUrl = `workspaces/${workspaceId}/tasks/${taskId}`
  await requests.remove(reqUrl);

  return { status: "Success" };
};

export default deleteTask;
