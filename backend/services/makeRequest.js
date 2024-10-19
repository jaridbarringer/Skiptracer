import axios from "axios";

const apiEndpoint = `${process.env.TRACERFY_BASE_URL}/trace/`;
const bearerToken = process.env.TRACERFY_API_KEY;

export async function makePostRequest(formData) {
  console.log("bearerToken", bearerToken);
  console.log("apiEndpoint", apiEndpoint);
  try {
    const response = await axios.post(apiEndpoint, formData, {
      headers: {
        ...formData.getHeaders(),
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    console.log("Response:", response.status, response.data);
    return response;
  } catch (error) {
    console.log("Error:", error.response ? error.response.data : error.message);
    throw error;
  }
}
