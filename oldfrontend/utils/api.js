import axios from "axios";

const getCookie = () => {};

export function getUrl() {
  return import.meta.env.VITE_BACKEND_URL;
}

// Create a reusable axios instance with default settings
const apiClient = axios.create({
  baseURL: getUrl(),
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.access_token;

  if (token) {
    return { headers: { Authorization: token } };
  }
  return null;
};

export async function makeGetRequest(url, config = {}, withToken = false) {
  try {
    const tokenHeaders = withToken ? getAuthToken() : {};
    const response = await apiClient.get(url, {
      ...config,
      ...tokenHeaders,
    });
    return response;
  } catch (error) {
    return error.response || Promise.reject(error);
  }
}

export async function makePostRequest(
  url,
  bodyFormData,
  config = {},
  withToken = false
) {
  try {
    const tokenHeaders = withToken ? getAuthToken() : {};

    const response = await apiClient.post(url, bodyFormData, {
      ...config,
      headers: {
        ...tokenHeaders?.headers,
        ...config.headers,
      },
    });

    return response;
  } catch (error) {
    return error.response || Promise.reject(error);
  }
}