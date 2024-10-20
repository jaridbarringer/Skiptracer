import prisma from "../DB/db.config.js";
import fs from "fs";
import csv from "csv-parser";
import { makePostRequest1 } from "../utils/api.js";
import FormData from "form-data";
import { makePostRequest } from "../services/makeRequest.js";
import { Readable } from "stream";

class LandOwnerController {
  // static async uploadCSV(req, res) {
  //   try {
  //     const file = req.file;
  //     const user = req.user;

  //     if (!file) {
  //       return res.status(400).json({ message: "No file uploaded" });
  //     }

  //     const landOwnersData = [];

  //     // Wrap CSV parsing in a promise to await its completion
  //     const parseCSV = () => {
  //       return new Promise((resolve, reject) => {
  //         fs.createReadStream(file.path)
  //           .pipe(csv())
  //           .on("data", (row) => {
  //             landOwnersData.push({
  //               name: row.name || null,
  //               address: row.address || null,
  //               cityState: row.cityState || null,
  //               email: row.email || null,
  //               phone: row.phone || null,
  //             });
  //           })
  //           .on("end", () => resolve())
  //           .on("error", (err) => reject(err));
  //       });
  //     };

  //     await parseCSV();

  //     // After parsing CSV, update the user's LandOwners array
  //     const userId = user.id;

  //     // Fetch current user from DB
  //     const findUser = await prisma.users.findUnique({
  //       where: { id: userId },
  //       include: { LandOwners: true },
  //     });

  //     if (!findUser) {
  //       return res.status(404).json({ message: "User not found" });
  //     }

  //     // Save the updated landowners array in the DB
  //     await Promise.all(
  //       landOwnersData.map((owner) => {
  //         return prisma.LandOwners.create({
  //           data: {
  //             name: owner.name,
  //             address: owner.address,
  //             cityState: owner.cityState,
  //             email: owner.email,
  //             phone: owner.phone,
  //             user: {
  //               connect: { id: userId }, // Assuming user with id 1 exists
  //             },
  //           },
  //         });
  //       })
  //     );

  //     // Optionally, you could remove the uploaded file from the server
  //     fs.unlinkSync(file.path);

  //     return res.json({ message: "Landowners added successfully" });
  //   } catch (error) {
  //     return res.status(500).json({
  //       status: 500,
  //       message: "Something went wrong. Please try again.",
  //     });
  //   }
  // }
  // static async uploadCSV(req, res) {
  //   try {
  //     const file = req.file;
  //     const user = req.user;

  //     if (!file) {
  //       return res.status(400).json({ message: "No file uploaded" });
  //     }

  //     const landOwnersData = [];

  //     // Parse CSV
  //     const parseCSV = () => {
  //       return new Promise((resolve, reject) => {
  //         fs.createReadStream(file.path)
  //           .pipe(csv())
  //           .on("data", (row) => {
  //             landOwnersData.push({
  //               name: row.name || null,
  //               address: row.address || null,
  //               cityState: row.cityState || null,
  //               email: row.email || null,
  //               phone: row.phone || null,
  //             });
  //           })
  //           .on("end", () => resolve())
  //           .on("error", (err) => reject(err));
  //       });
  //     };

  //     await parseCSV();

  //     // Fetch user ID
  //     const userId = user.id;

  //     // Scraper function to fetch phone and email

  //     const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  //     // Save landowners
  //     await Promise.all(
  //       landOwnersData.map(async (owner, index) => {
  //         const searchUrl = `${
  //           process.env.TRUE_PEOPLE_SEARCH_URL
  //         }/results?name=${encodeURIComponent(
  //           owner.name
  //         )}&citystatezip=${encodeURIComponent(owner.cityState)}`;
  //         await delay(2 * 15000);
  //         const searchPageData = await makeScraperRequest(searchUrl);
  //         // console.log("Search Page Data:", searchPageData);
  //         const detailPageUrl = extractDetailPageUrl(searchPageData);
  //         // console.log("detailPageUrl", detailPageUrl);
  //         // If email or phone is missing, fetch from scraper
  //         if ((!owner.email || !owner.phone) && detailPageUrl) {
  //           await delay(1 * 15000);
  //           const detailPageData = await makeScraperRequest(detailPageUrl);
  //           // console.log("Detail Page Data:", detailPageData);

  //           // Extract phone and email
  //           const phone = extractPhone(detailPageData);
  //           const emails = extractEmail(detailPageData);
  //           const email = Array.isArray(emails) ? emails[0] : emails;
  //           owner.phone = phone || owner.phone;
  //           owner.email = email || owner.email;
  //         }

  //         // Save landowner data to database
  //         return prisma.LandOwners.create({
  //           data: {
  //             name: owner.name,
  //             address: owner.address,
  //             cityState: owner.cityState,
  //             email: owner.email,
  //             phone: owner.phone,
  //             user: {
  //               connect: { id: userId }, // Assuming user with id exists
  //             },
  //           },
  //         });
  //       })
  //     );

  //     // Optionally, remove the uploaded file from the server
  //     fs.unlinkSync(file.path);

  //     return res.json({ message: "Landowners added successfully" });
  //   } catch (error) {
  //     console.log("Error uploading CSV:", error);
  //     return res.status(500).json({
  //       status: 500,
  //       message: "Something went wrong. Please try again.",
  //     });
  //   }
  // }
  // static async uploadCSV(req, res) {
  //   try {
  //     const file = req.file;
  //     const user = req.user;

  //     if (!file) {
  //       return res.status(400).json({ message: "No file uploaded" });
  //     }

  //     const landOwnersData = [];

  //     // Parse CSV
  //     const parseCSV = () => {
  //       return new Promise((resolve, reject) => {
  //         fs.createReadStream(file.path)
  //           .pipe(csv())
  //           .on("data", (row) => {
  //             landOwnersData.push({
  //               name: row.name || null,
  //               address: row.address || null,
  //               cityState: row.cityState || null,
  //               email: row.email || null,
  //               phone: row.phone || null,
  //             });
  //           })
  //           .on("end", () => resolve())
  //           .on("error", (err) => reject(err));
  //       });
  //     };

  //     await parseCSV();

  //     // Fetch user ID
  //     const userId = user.id;

  //     const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  //     // Process each landowner sequentially with 7-second delay between requests
  //     for (const owner of landOwnersData) {
  //       const searchUrl = `${
  //         process.env.TRUE_PEOPLE_SEARCH_URL
  //       }/results?name=${encodeURIComponent(
  //         owner.name
  //       )}&citystatezip=${encodeURIComponent(owner.cityState)}`;

  //       // Wait for 7 seconds before each request
  //       await delay(7 * 1000);

  //       const searchPageData = await makeScraperRequest(searchUrl);

  //       const detailPageUrl = extractDetailPageUrl(searchPageData);
  //       console.log("detailPageUrl", detailPageUrl);
  //       // If email or phone is missing, fetch from scraper
  //       if ((!owner.email || !owner.phone) && detailPageUrl) {
  //         await delay(7 * 1000);
  //         const detailPageData = await makeScraperRequest(detailPageUrl);

  //         // Extract phone and email
  //         const phone = extractPhone(detailPageData);
  //         const emails = extractEmail(detailPageData);
  //         const email = Array.isArray(emails) ? emails[0] : emails;

  //         owner.phone = phone || owner.phone;
  //         owner.email = email || owner.email;
  //       }

  //       // Save landowner data to database
  //       await prisma.LandOwners.create({
  //         data: {
  //           name: owner.name,
  //           address: owner.address,
  //           cityState: owner.cityState,
  //           email: owner.email,
  //           phone: owner.phone,
  //           user: {
  //             connect: { id: userId }, // Assuming user with id exists
  //           },
  //         },
  //       });
  //     }

  //     // Optionally, remove the uploaded file from the server
  //     fs.unlinkSync(file.path);

  //     return res.json({ message: "Landowners added successfully" });
  //   } catch (error) {
  //     console.log("Error uploading CSV:", error);
  //     return res.status(500).json({
  //       status: 500,
  //       message: "Something went wrong. Please try again.",
  //     });
  //   }
  // }

  static async uploadCSV(req, res) {
    try {
      const file = req.file;

      if (!file) {
        return res.status(400).json({
          status: 400,
          message: "No file uploaded",
        });
      }

      if (file.mimetype !== "text/csv") {
        return res.status(400).json({
          status: 400,
          message: "Uploaded file is not in CSV format",
        });
      }

      const landOwnersData = [];

      const parseCSV = () => {
        return new Promise((resolve, reject) => {
          // Convert file buffer to a readable stream
          const readableFile = new Readable();
          readableFile.push(file.buffer);
          readableFile.push(null);

          readableFile
            .pipe(csv())
            .on("data", (row) => {
              console.log("row", row);
              landOwnersData.push({
                address: row.Address || null,
                city: row["Home City"] || null,
                state: row.State || null,
                firstName: row["First Name"] || null,
                lastName: row["Last Name"] || null,
              });
            })
            .on("end", () => resolve(landOwnersData))
            .on("error", (err) => reject(err));
        });
      };

      // Wait for CSV parsing
      await parseCSV();

      console.log("landOwnersData", landOwnersData);
      for (const owner of landOwnersData) {
        const formData = new FormData();
        formData.append("address_column", owner.address);
        formData.append("city_column", owner.city);
        formData.append("state_column", owner.state);
        formData.append("first_name_column", owner.firstName);
        formData.append("last_name_column", owner.lastName);
        formData.append("mail_address_column", owner.address);
        formData.append("mail_city_column", owner.city);
        formData.append("mail_state_column", owner.state);
        // formData.append("csv_file", file);
        // console.log("inside body", body);
        // console.log("file.buffer", file.buffer);
        // const fileStream = fs.createReadStream(file.path);
        // formData.append("csv_file", fileStream);
        formData.append("csv_file", file.buffer);
        const response = await makePostRequest(formData);
        // const config = {
        //   headers: { "Content-Type": "multipart/form-data" },
        // };
        const config = {
          headers: formData.getHeaders(), // Include FormData headers
        };
        const url = `${process.env.TRACERFY_BASE_URL}/trace/`;

        // const response = await makePostRequest1(url, formData, config);

        console.log("API response:", response);
      }

      // Optionally, remove the uploaded file from the server
      fs.unlinkSync(file.path);

      return res.json({ message: "CSV processed successfully" });
    } catch (error) {
      console.log("Error uploading CSV:", error);
      return res.status(500).json({
        status: 500,
        message: "Something went wrong. Please try again.",
      });
    }
  }

  static async getLandOwnersByUserId(req, res) {
    try {
      const userId = req.user.id;
      // Fetch landowners for the specific user from the database
      const landOwners = await prisma.LandOwners.findMany({
        where: { userId: userId }, // Assuming 'userId' is the foreign key in LandOwners table
      });

      if (!landOwners || landOwners.length === 0) {
        return res
          .status(404)
          .json({ message: "No landowners found for this user" });
      }

      // Return the list of landowners
      return res.json(landOwners);
    } catch (error) {
      console.log("Error fetching landowners:", error);
      return res.status(500).json({
        status: 500,
        message: "Something went wrong. Please try again.",
      });
    }
  }
}

export default LandOwnerController;
