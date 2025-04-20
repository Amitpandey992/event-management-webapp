import express from "express";
import {
  deleteForm,
  getAllForms,
  getForm,
  updateForm,
} from "../../controllers/adminController/adminEventForms.controller.js";
const router = express.Router();
import EventRequestForm from "../../models/EventRequestForm.js";
// fetch all forms
router.get("/allForms", getAllForms);

router.post("/createform", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      eventType,
      date,
      timeOfDay,
      location,
      guestCount,
      budget,
      additionalRequests,
      status,
    } = req.body;
    if (
      !name ||
      !email ||
      !phone ||
      !timeOfDay ||
      !eventType ||
      !date ||
      !location ||
      !budget ||
      !guestCount
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const form = await EventRequestForm.create(req.body);
    res.status(201).json({ form });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// fetch a form
router.get("/:id", getForm);
// update a form
router.patch("/updateForm/:id", updateForm);
// delete a form
router.delete("/deleteForm/:id", deleteForm);
export default router;
