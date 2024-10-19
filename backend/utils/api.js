import axios from "axios";

export function getUrl() {
  return `${process.env.TRACERFY_BASE_URL}/trace/`;
}

const apiClient = axios.create({
  baseURL: getUrl(),
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const getAuthToken = () => {
  const token = process.env.TRACERFY_API_KEY;
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

export async function makePostRequest1(url, bodyFormData, config = {}) {
  try {
    const tokenHeaders = getAuthToken();

    const response = await apiClient.post(url, bodyFormData, {
      ...config,
      headers: {
        ...tokenHeaders,
        ...config.headers,
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.log("error", error);
    return error.response || Promise.reject(error);
  }
}
