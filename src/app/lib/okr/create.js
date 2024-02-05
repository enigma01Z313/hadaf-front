import requests from "../request";

const createOkr = async (workspaceId, newOkrData) => {
  const tasksUrl = `workspaces/${workspaceId}/okrs`;
  const newTask = await requests.post(tasksUrl, {
    ...newOkrData,
    keyResult: newOkrData.keyResults,
  });

  return newTask;
};

export default createOkr;
