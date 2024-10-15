import * as cheerio from "cheerio";

export const extractDetailPageUrl = (searchPageData) => {
  try {
    const $ = cheerio.load(searchPageData);
    const detailLink = $("a.btn.btn-success.btn-lg.detail-link").attr("href");
    return detailLink ? `https://www.truepeoplesearch.com${detailLink}` : "";
  } catch (error) {
    console.error("Error extracting detail page URL:", error);
    return "";
  }
};

export const extractPhone = (detailPageData) => {
  try {
    const $ = cheerio.load(detailPageData);
    const phone = $('span[itemprop="telephone"]').first().text().trim();
    return phone || "No phone number found";
  } catch (error) {
    console.error("Error extracting phone:", error);
    return "Error extracting phone number";
  }
};

export const extractEmail = (detailPageData) => {
  try {
    const $ = cheerio.load(detailPageData);

    const emailAddresses = [];
    $("body")
      .find("*")
      .each(function (i, element) {
        const text = $(element).text().trim();
        const emails = text.match(
          /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/g
        );
        if (emails) {
          emailAddresses.push(...emails);
        }
      });

    return emailAddresses.length > 0 ? emailAddresses : "No email found";
  } catch (error) {
    console.error("Error extracting email:", error);
    return "Error extracting email";
  }
};
