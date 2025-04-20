import express from "express";
import Event from "../../models/Event.js";
import ImageKit from "imagekit";
var imagekit = new ImageKit({
  publicKey: "public_E1gulLPW2Y+GnhfOY2fgVpa5E4c=",
  privateKey: "private_lPOr94BnX/3oSsvad3chDX27EXA=",
  urlEndpoint: "https://ik.imagekit.io/fhbne9pox/",
});

const router = express.Router();

// gett all events
router.get("/allevents", async (req, res) => {
  try {
    const events = await Event.find();
    if (!events) return res.json({ message: "No events found" });
    res.status(200).json({ data: events, message: "Event get successful" });
  } catch (error) {
    res.json({ message: error.message });
  }
});
// get a single event
router.get("/event/:id", async (req, res) => {
  try {
    if (!req.params.id) return res.json({ message: "No event found" });
    const event = await Event.findById(req.params.id);
    if (!event) return res.json({ message: "No event found" });
    res.status(200).json({ data: event, message: "Event get successful" });
  } catch (error) {
    res.json({ message: error.message });
  }
});
// create new event
router.post("/event/create", async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: "Image is required" });
    }
    const { title, description } = req.body;
    const image = req.files.image;

    if (!title || !description)
      return res.status(400).json({ message: "All input is required" });

    const { fileId, url } = await imagekit.upload({
      file: image.data,
      fileName: image.name,
    });
    const newEvent = new Event({ title, description, image: { url, fileId } });
    await newEvent.save();
    res.json(newEvent);
  } catch (error) {
    res.json({ message: error.message });
  }
});
// update an event
router.patch("/event/update/:id", async (req, res) => {
  try {
    if (!req.params.id)
      return res.status(400).json({ message: "No event found" });
    const { fileId, url } = await imagekit.upload({
      file: req.files.image.data,
      fileName: req.files.image.name,
    });

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { ...req.body, image: { url, fileId } },
      { new: true }
    );
    if (!updatedEvent) return res.json({ message: "No event found" });
    res
      .status(200)
      .json({ data: updatedEvent, message: "Event updated successfully" });
  } catch (error) {
    res.json({ message: error.message });
  }
});
// delete event
router.delete("/event/delete/:id", async (req, res) => {
  try {
    if (!req.params.id)
      return res.status(400).json({ message: "No event found" });

    const oldEvent = await Event.findById(req.params.id);
    if (oldEvent.image.fileId != "") {
      await imagekit.deleteFile(oldEvent.image.fileId);
    }

    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) return res.json({ message: "No event found" });
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

export default router;
