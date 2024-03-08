import requests from "../request";

const getPlans = async () => {
  const url = `plans`;

  const items = await requests.get(url);

  return items;
};

export default getPlans;
