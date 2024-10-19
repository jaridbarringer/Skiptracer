import axios from "axios";

// Make HTTP request to the scraper API
export const makeScraperRequest = async (url) => {
  console.log("url", url);
  try {
    const response = await axios.get(process.env.SCRAPER_API_URL, {
      params: {
        api_key: process.env.SCRAPER_API_KEY,
        url: url,
        ultra_premium: true,
        country_code: "us",
      },
    });
    return response.data;
  } catch (error) {
    // console.error("Error during scraping:", error.response);
    throw error;
  }
};
