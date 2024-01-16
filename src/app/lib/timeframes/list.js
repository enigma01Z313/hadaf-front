import requests from "../request";

const listTimeframes = async (workspaceId) => {
    console.log('1----------------------------');
    console.log(workspaceId);
    const data = await requests.get(`workspaces/${workspaceId}/timeFrames`)

    return data

    return 1222222222
}

export default listTimeframes