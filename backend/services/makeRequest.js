import axios from "axios";

const apiEndpoint = `${process.env.TRACERFY_BASE_URL}/trace/`;
const bearerToken = process.env.TRACERFY_API_KEY;

export async function makePostRequest(formData) {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: apiEndpoint,
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      ...formData.getHeaders(),
    },
    data: formData,
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}
