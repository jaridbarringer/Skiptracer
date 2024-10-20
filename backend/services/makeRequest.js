import axios from "axios";

const apiEndpoint = `${process.env.TRACERFY_BASE_URL}/trace/`;
const bearerToken = process.env.TRACERFY_API_KEY;

export async function makePostRequest(formData) {
  // console.log("bearerToken", bearerToken);
  // console.log("apiEndpoint", apiEndpoint);

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
    console.log("Response:", response.status, response.data);
    return response;
  } catch (error) {
    // console.log("Error:", error.response ? error.response.data : error.message);
    console.log("error", error);
    throw error;
  }
}

// import axios from 'axios';
// import FormData from 'form-data';
// import fs from 'fs';

// const data = new FormData();
// data.append('address_column', 'Address');
// data.append('city_column', 'City');
// data.append('state_column', 'State');
// data.append('first_name_column', 'Owner 1 First Name');
// data.append('last_name_column', 'Owner 1 Last Name');
// data.append('mail_address_column', 'Address');
// data.append('mail_city_column', 'City');
// data.append('mail_state_column', 'State');

// // Append CSV file
// data.append('csv_file', fs.createReadStream('/Users/reaper/Documents/desktop clone/Propwire Export - 601 Properties - Apr 29_ 2024.csv'));

// // Axios config
// const config = {
//   method: 'post',
//   maxBodyLength: Infinity,
//   url: `${process.env.TRACERFY_BASE_URL}/trace/`,
//   headers: {
//     ...data.getHeaders(),
//   },
//   data: data,
// };

// // Send request using axios
// axios(config)
//   .then((response) => {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch((error) => {
//     console.log(error);
//   });
