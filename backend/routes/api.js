import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import multer from "multer";
import authMiddleware from "../middleware/Authenticate.js";
import LandOwnerController from "../controllers/LandOwnerController.js";

const router = Router();

// Multer setup for handling CSV uploads
const upload = multer({ dest: "uploads/" }); // Specify the folder for uploads

router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);
router.post(
  "/upload-csv",
  authMiddleware,
  upload.single("file"),
  LandOwnerController.uploadCSV
); // New CSV upload route
router.get(
  "/landowners",
  authMiddleware,
  LandOwnerController.getLandOwnersByUserId
);

export default router;
