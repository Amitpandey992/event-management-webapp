import express from "express";
import adminLoginRoute from "./adminLogin.routes.js";
import adminEventRoute from "./adminEvent.routes.js";
import adminPhotoGalleryRoute from "./adminPhotoGallery.routes.js";
import adminEventFormsRoute from "./adminEventForms.routes.js";
import homeSliderImageRoute from "./homeSliderImage.routes.js";

const router = express.Router();

router.use("/login", adminLoginRoute);
router.use("/events", adminEventRoute);
router.use("/gallery", adminPhotoGalleryRoute);
router.use("/forms", adminEventFormsRoute);
router.use("/sliderImage", homeSliderImageRoute);

export default router;
