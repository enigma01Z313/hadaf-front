import { toast } from "react-toastify";
import axios from "axios";

const request = (payload) =>
  new Promise(async (resolve, reject) => {
    const BASE_HOST = "https://hadafsanjapi.farzinahmadi.com";
    // const BASE_HOST = "http://67.43.234.92:50001";
    const BASE_URL = `${BASE_HOST}/api`;
    const USER_TOKEN = "f8b874cf9ad70805465c6d93ab1231b";

    const path = `${BASE_URL}/${payload.path}` ?? BASE_URL;
    const method = payload.method ?? "GET";
    const authed = payload.authed ?? true;
    const body = payload.body ?? {};
    let bodyStr;

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
    };

    if (authed) {
      const accessToken = localStorage.getItem("accessToken");
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const options = { method, headers };

    if (["POST", "PUT", "PATCH"].includes(method)) {
      bodyStr = JSON.stringify(body);
      options.body = bodyStr;
    }

    const res = await fetch(path, options);
    const data = await res.json();

    if (!res.ok) return reject(data.error);

    return resolve(data);
  });

const get = async (path, authed = true) => {
  try {
    const data = await request({ path, authed });

    return data;
  } catch (err) {
    // console.log('err', err);
    throw new Error(err.message);
  }
};

const post = async (path, body, authed = true) => {
  try {
    const data = await request({
      path,
      body,
      method: "POST",
      authed,
    });

    return data;
  } catch (err) {
    // console.log('err', err);
    toast.error(err.text);

    return { error: true, ...err };
  }
};

const put = async (path, body, authed = true) => {
  try {
    const data = await request({ path, body, method: "PUT", authed });

    return data;
  } catch (err) {
    // console.log('err', err);
    toast.error(err.text);

    return { error: true, ...err };
  }
};

const patch = async (path, body, authed = true) => {
  try {
    const data = await request({ path, body, method: "PATCH", authed });

    return data;
  } catch (err) {
    // console.log('err', err);
    toast.error(err.text);

    return { error: true, ...err };
  }
};

const remove = async (path, authed = true) => {
  const data = await request({ path, method: "DELETE", authed });

  return data;
};

const requests = { get, post, put, patch, remove };
export default requests;
