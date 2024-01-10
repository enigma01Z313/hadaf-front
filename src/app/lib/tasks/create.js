import requests from "../request";

const createTask = async ({
  newTaskTitle,
  statusId,
  theWorkspace: workspaceId,
}) => {
  const tasksUrl = `workspaces/${workspaceId}/tasks`;
  const newTask = await requests.post(tasksUrl, {
    title: newTaskTitle,
    status: statusId,
  });

  return newTask;
};

export default createTask;
