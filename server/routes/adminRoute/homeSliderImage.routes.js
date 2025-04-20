import express from "express";
import {
  deleteHomeSliderImage,
  homeSliderImage,
  uploadHomeSliderImage,
} from "../../controllers/adminController/adminHomeSliderImage.controller.js";

const router = express.Router();

router.get("/allHomeSliderImage", homeSliderImage);

router.post("/uploadHomeSliderImage", uploadHomeSliderImage);

router.delete("/delete/:id", deleteHomeSliderImage);

export default router;
