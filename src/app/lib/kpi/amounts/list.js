import requests from "../../request";

const getAmounts = async (kpiId) => {
    const url = `kpis/${kpiId}/amounts`;

    const items = await requests.get(url)

    return items
}

export default getAmounts