import requests from "../../request";

const createAmount = async (kpiId, data) => {
  const amountUrl = `kpis/${kpiId}/amounts`;

  const newAmount = await requests.post(amountUrl, data);

  return newAmount;
};

export default createAmount;
