import requests from "../request";

const updatePlan = async (id, data) => {
  const url = `plans/${id}`;

  const items = await requests.put(url, data);

  return items;
};

export default updatePlan;
