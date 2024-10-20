import prisma from "../DB/db.config.js";
import fs from "fs";
import FormData from "form-data";
import { makeGetRequest, makePostRequest } from "../services/makeRequest.js";

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
      // Fetch all queue_ids from UploadedCsvs for the given userId
      const uploadedCsvs = await prisma.uploadedCsvs.findMany({
        where: { userId: parseInt(userId) },
        select: { queue_id: true },
      });
      // Extract queue_ids from UploadedCsvs
      const queueIds = uploadedCsvs.map((csv) => csv.queue_id);

      // Filter API results where queue_id matches with UploadedCsvs
      const matchingResults = apiResults.filter((result) =>
        queueIds.includes(result.id)
      );
      // Loop through matching results and save in CsvsResults if not already there
      let newResults = [];
      for (const result of matchingResults) {
        const existingResult = await prisma.csvsResults.findFirst({
          where: { userId: parseInt(userId), id: result.id },
        });
        if (!existingResult) {
          // Save new result in CsvsResults
          const newResult = await prisma.csvsResults.create({
            data: {
              id: result.id || null,
              download_url: result.download_url || null,
              rows_uploaded: result.rows_uploaded || null,
              credits_deducted: result.credits_deducted || null,
              pending: result.pending || false,
              userId: parseInt(userId),
            },
          });

          newResults.push(newResult);
        }
      }

      // Return the newly added results and any that already existed
      return res.json({
        message: "CSV results processed successfully",
        newResults,
        matchingResults, // All results that matched, including already existing ones
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
