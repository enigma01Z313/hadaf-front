import requests from "../request";

const getKpi = async (workspaceId, okrId) => {
    const url = `/workspaces/${workspaceId}/kpis/${okrId}`

    const data = await requests.get(url)

    return data
}

export default getKpi