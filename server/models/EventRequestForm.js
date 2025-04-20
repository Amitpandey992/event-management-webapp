import mongoose from "mongoose";

const eventRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  eventType: {
    type: String,
    required: true,
    enum: [
      "Wedding",
      "Birthday",
      "Corporate",
      "Concert",
      "Festival",
      "FashionShow",
      "BrandPromotion",
      "SocialEvent",
      "Other",
    ],
  },
  date: {
    type: Date,
    required: true,
  },
  timeOfDay: {
    type: String,
    enum: ["morning", "afternoon", "night"],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  guestCount: {
    type: Number,
    required: true,
  },
  additionalRequests: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const EventRequestForm = mongoose.model("EventRequest", eventRequestSchema);

export default EventRequestForm;
