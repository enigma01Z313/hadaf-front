import requests from "../request";

const createTask = async (params) => {
  const {
    newTaskTitle,
    statusId,
    theWorkspace: workspaceId,
    order,
    okr,
    keyResult,
    assignee,
    description,
    dueDate,
    tags,
    colleages,
    progress,
  } = params;
  const tasksUrl = `workspaces/${workspaceId}/tasks`;

  const data = {};

  data.title = newTaskTitle;
  data.status = statusId;
  data.order = order;

  if (okr) data.okr = okr;
  if (keyResult) data.keyResult = keyResult;
  if (assignee) data.assignee = assignee;
  if (description) data.description = description;
  if (dueDate) data.dueDate = dueDate;
  if (tags) data.tags = tags;
  if (colleages) data.colleagues = colleages;
  if (progress) data.progress = progress;

  const newTask = await requests.post(tasksUrl, data);

  return newTask;
};

export default createTask;
