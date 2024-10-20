import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import multer from "multer";
import authMiddleware from "../middleware/Authenticate.js";
import LandOwnerController from "../controllers/LandOwnerController.js";

const router = Router();

const upload = multer({ dest: "uploads/" });
// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
//   dest: "uploads/",
// });

router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);
router.post(
  "/upload-csv",
  authMiddleware,
  upload.single("file"),
  LandOwnerController.uploadCSV
);
router.get(
  "/landowners",
  authMiddleware,
  LandOwnerController.getLandOwnersByUserId
);

export default router;
