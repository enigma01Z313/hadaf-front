import requests from "../request";

const createPlan = async (data) => {
  const url = `plans`;

  const items = await requests.post(url, data);

  return items;
};

export default createPlan;
