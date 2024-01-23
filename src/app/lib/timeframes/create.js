import requests from "../request";

const createTimeframe = async (theWorkspace, data) => {
  const newTf = await requests.post(
    `workspaces/${theWorkspace}/timeframes`,
    data
  );

  return newTf;
};

export default createTimeframe;
