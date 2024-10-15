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
    // Try to find the email in the nested divs first
    let email = $(".col > div").first().text().trim();

    // If not found, try the single div
    if (!email) {
      email = $("div")
        .filter(function () {
          return $(this).text().trim().includes("@");
        })
        .first()
        .text()
        .trim();
    }

    return email || "No email found";
  } catch (error) {
    console.error("Error extracting email:", error);
    return "Error extracting email";
  }
};
