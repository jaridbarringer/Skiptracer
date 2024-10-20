import prisma from "../DB/db.config.js";
import fs from "fs";
import FormData from "form-data";
import { makePostRequest } from "../services/makeRequest.js";

class LandOwnerController {
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
      console.log("Third party response", response);

      // Optionally, remove the uploaded file from the server
      fs.unlinkSync(file.path);

      return res.json({ message: "CSV processed successfully" });
    } catch (error) {
      console.error("Error uploading CSV:", error);
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
