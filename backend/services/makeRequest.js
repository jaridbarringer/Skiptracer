import axios from "axios";

const apiEndpoint = process.env.BASE_URL;
const bearerToken = process.env.API_KEY;

export async function makePostRequest(formData) {
  let url = `${apiEndpoint}/trace/`;
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: url,
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

export async function makeGetRequest() {
  let url = `${apiEndpoint}/queues/`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    return response;
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}
