import requests from "../request";

const getOkr = async (workspaceId, okrId) => {
    const url = `/workspaces/${workspaceId}/okrs/${okrId}`

    const data = await requests.get(url)

    return data
}

export default getOkr