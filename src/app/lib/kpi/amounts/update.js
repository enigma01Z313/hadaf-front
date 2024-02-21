import requests from "../../request";

const updateAmount = async (kpiId, amountId, data) => {
  const url = `kpis/${kpiId}/amounts/${amountId}`;

  const uppedData = await requests.put(url, data);

  return uppedData;
};

export default updateAmount;
