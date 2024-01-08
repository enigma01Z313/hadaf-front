import requests from "../request";

const getTask = async (taskId) => {
    const task = await requests.get(`tasks/${taskId}`)

    return task
}

export default getTask
