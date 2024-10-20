import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import multer from "multer";
import authMiddleware from "../middleware/Authenticate.js";
import LandOwnerController from "../controllers/LandOwnerController.js";

const router = Router();

const upload = multer({ dest: "uploads/" });

router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);
router.post(
  "/upload-csv",
  authMiddleware,
  upload.single("file"),
  LandOwnerController.uploadCSV
);
router.get("/landowners", authMiddleware, LandOwnerController.getCsvsResults);
router.get(
  "/landowners/:id",
  authMiddleware,
  LandOwnerController.getLandOwnersByid
);

export default router;
