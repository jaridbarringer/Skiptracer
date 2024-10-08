import prisma from "../DB/db.config.js";
import fs from "fs";
import csv from "csv-parser"; // To parse CSV files

class LandOwnerController {
  static async uploadCSV(req, res) {
    try {
      const file = req.file; // CSV file from multer middleware
      const user = req.user; // User data from the token

      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const landOwnersData = [];

      // Wrap CSV parsing in a promise to await its completion
      const parseCSV = () => {
        return new Promise((resolve, reject) => {
          fs.createReadStream(file.path)
            .pipe(csv())
            .on("data", (row) => {
              landOwnersData.push({
                name: row.name || null,
                address: row.address || null,
                cityState: row.cityState || null,
                email: row.email || null,
                phone: row.phone || null,
              });
            })
            .on("end", () => resolve())
            .on("error", (err) => reject(err));
        });
      };

      await parseCSV();

      // After parsing CSV, update the user's LandOwners array
      const userId = user.id;

      // Fetch current user from DB
      const findUser = await prisma.users.findUnique({
        where: { id: userId },
        include: { LandOwners: true },
      });

      if (!findUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Save the updated landowners array in the DB
      await Promise.all(
        landOwnersData.map((owner) => {
          return prisma.LandOwners.create({
            data: {
              name: owner.name,
              address: owner.address,
              cityState: owner.cityState,
              email: owner.email,
              phone: owner.phone,
              user: {
                connect: { id: userId }, // Assuming user with id 1 exists
              },
            },
          });
        })
      );

      // Optionally, you could remove the uploaded file from the server
      fs.unlinkSync(file.path);

      return res.json({ message: "Landowners added successfully" });
    } catch (error) {
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
