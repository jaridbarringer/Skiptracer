import prisma from "../DB/db.config.js";
import fs from "fs";
import FormData from "form-data";
import {
  makeGetRequest,
  makeGetRequestForSingleData,
  makePostRequest,
} from "../services/makeRequest.js";
import { format } from "fast-csv";

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
        const existingResult = await prisma.csvsResults.findFirst({
          where: { userId: parseInt(userId), id: result.id },
        });

        // Check if existing result is found and if the results field is already populated
        let detailedData;
        if (
          !existingResult ||
          !existingResult.results ||
          existingResult.results.length === 0
        ) {
          const detailedResponse = await makeGetRequestForSingleData(result.id);
          detailedData = detailedResponse.data;
        } else {
          // Use existing results if available
          detailedData = existingResult.results;
        }

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
        ({ download_url, credits_deducted, ...rest }) => rest
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
  static async getLandOwnersByid(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      // Find the entry in csvsResults where id and userId match
      const landOwnerResult = await prisma.csvsResults.findFirst({
        where: {
          id: parseInt(id),
          userId: parseInt(userId),
        },
      });

      // Check if the result is found
      if (!landOwnerResult) {
        return res.status(404).json({
          status: 404,
          message: "Landowners with the provided ID not found for this user.",
        });
      }

      return res.json({
        status: 200,
        message: "Landowner data retrieved successfully.",
        data: landOwnerResult,
      });
    } catch (error) {
      console.log("Error fetching landowners:", error);
      return res.status(500).json({
        status: 500,
        message: "Error fetching landowners:",
      });
    }
  }

  static async downloadCsvById(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      // Fetch the data from csvsResults based on userId and id
      const data = await prisma.csvsResults.findMany({
        where: {
          userId: parseInt(userId),
          id: parseInt(id),
        },
      });

      const results = data[0]?.results;
      if (results.length === 0) {
        return res.status(404).json({ message: "No results found." });
      }

      // Set the response headers for file download
      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="results_${id}.csv"`
      );

      // Use fast-csv to convert the data to CSV format
      const csvStream = format({ headers: true });
      const readableStream = csvStream.pipe(res);

      // Push each result into the stream
      results.forEach((result) => {
        csvStream.write(result);
      });

      // End the stream
      csvStream.end();

      // Handle any errors during the streaming
      readableStream.on("error", (err) => {
        console.error("Error streaming CSV:", err);
        res.status(500).json({ message: "Error generating CSV." });
      });
    } catch (error) {
      console.error("Error downloading CSV:", error);
      return res.status(500).json({
        status: 500,
        message: "Something went wrong while generating the CSV.",
      });
    }
  }
}

export default LandOwnerController;
