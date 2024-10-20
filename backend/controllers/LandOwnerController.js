import prisma from "../DB/db.config.js";
import fs from "fs";
import FormData from "form-data";
import {
  makeGetRequest,
  makeGetRequestForSingleData,
  makePostRequest,
} from "../services/makeRequest.js";

class LandOwnerController {
  static async uploadCSV(req, res) {
    try {
      const file = req.file;
      const userId = req.user.id;
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

      const formData = new FormData();
      formData.append("address_column", "Address");
      formData.append("city_column", "Home City");
      formData.append("state_column", "State");
      formData.append("first_name_column", "First Name");
      formData.append("last_name_column", "Last Name");
      formData.append("mail_address_column", "Owner Mailing Address");
      formData.append("mail_city_column", "Owner Mailing City");
      formData.append("mail_state_column", "Owner Mailing State");
      formData.append("csv_file", fs.createReadStream(file.path), {
        filename: file.filename,
        contentType: file.mimetype,
      });

      const response = await makePostRequest(formData);
      if (response.status === 200) {
        const { queue_id, status, created_at, message } = response.data;
        await prisma.uploadedCsvs.create({
          data: {
            queue_id,
            status,
            created_at: new Date(created_at),
            message,
            userId: userId,
          },
        });

        // Optionally, remove the uploaded file from the server
        fs.unlinkSync(file.path);

        return res.json({
          message: "CSV processed successfully",
          data: response.data,
        });
      }
    } catch (error) {
      console.error("Error uploading CSV:", error);
      return res.status(500).json({
        status: 500,
        message: "Something went wrong. Please try again.",
      });
    }
  }

  static async getCsvsResults(req, res) {
    try {
      const userId = req.user.id;
      const response = await makeGetRequest();
      const apiResults = response.data;

      const uploadedCsvs = await prisma.uploadedCsvs.findMany({
        where: { userId: parseInt(userId) },
        select: { queue_id: true },
      });

      const queueIds = uploadedCsvs.map((csv) => csv.queue_id);

      const matchingResults = apiResults.filter((result) =>
        queueIds.includes(result.id)
      );

      for (const result of matchingResults) {
        const detailedResponse = await makeGetRequestForSingleData(result.id);
        const detailedData = detailedResponse.data;
        const existingResult = await prisma.csvsResults.findFirst({
          where: { userId: parseInt(userId), id: result.id },
        });
        const resultDataToSave = {
          id: result.id || null,
          download_url: result.download_url || null,
          rows_uploaded: result.rows_uploaded || null,
          credits_deducted: result.credits_deducted || null,
          pending: result.pending || false,
          results: detailedData,
          userId: parseInt(userId),
        };

        if (!existingResult) {
          await prisma.csvsResults.create({
            data: resultDataToSave,
          });
        } else {
          // If found, check if any of the fields are missing or need updating
          const updates = {};

          if (!existingResult.download_url && result.download_url) {
            updates.download_url = result.download_url;
          }
          if (!existingResult.rows_uploaded && result.rows_uploaded) {
            updates.rows_uploaded = result.rows_uploaded;
          }
          if (!existingResult.credits_deducted && result.credits_deducted) {
            updates.credits_deducted = result.credits_deducted;
          }
          if (existingResult.pending !== result.pending) {
            updates.pending = result.pending;
          }
          if (!existingResult.results.length) {
            updates.results = detailedData;
          }
          // Only update if there are changes
          if (Object.keys(updates).length > 0) {
            await prisma.csvsResults.update({
              where: { id: existingResult.id },
              data: updates,
            });
          }
        }
      }

      // After processing, fetch the saved results from the database
      const savedResults = await prisma.csvsResults.findMany({
        where: { userId: parseInt(userId) },
      });
      const resultsToSend = savedResults.map(
        ({ download_url, ...rest }) => rest
      );
      return res.json({
        message: "CSV results processed successfully",
        data: resultsToSend,
      });
    } catch (error) {
      console.error("Error fetching CSV results:", error);
      return res.status(500).json({
        status: 500,
        message: "Something went wrong while processing CSV results.",
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
