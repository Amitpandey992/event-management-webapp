import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Save,
  Clipboard,
  DollarSign,
} from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import api from "../../lib/axios";

interface EventForm {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  date: string;
  timeOfDay: string;
  location: string;
  guestCount: string;
  budget: string;
  additionalRequests: string;
}

function EventForm() {
  const [formData, setFormData] = useState<EventForm>({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    date: "",
    timeOfDay: "",
    location: "",
    budget: "",
    guestCount: "",
    additionalRequests: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    let { name, value } = e.target;
    if (name === "phone") {
      const phoneNumber = value.replace(/\D/g, "");
      if (phoneNumber.length > 10) return;
      value = phoneNumber;
    }

    if (name === "timeOfDay") {
      value = value.toLowerCase();
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) {
      toast.error("Please fill out all required fields.");
      return;
    }
    try {
      const response = await api.post("/admin/forms/createform", formData);
      console.log(response);
      setFormData({
        name: "",
        email: "",
        phone: "",
        eventType: "",
        date: "",
        timeOfDay: "",
        location: "",
        budget: "",
        guestCount: "",
        additionalRequests: "",
      });
      toast.success("Event Form submitted, we'll contact you soon!");
      setTimeout(() => {
        window.location.href = "/payment";
      }, 3000);
    } catch (error) {
      toast.error("Failed to submit form. Please try again.");
      console.error("error during form submission", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-bfrom-white via-gray-100 to-white text-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden ">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl transform rotate-12 animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-3xl transform -rotate-12 animate-pulse"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative max-w-3xl mx-auto"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.history.back()}
          className="mb-8 px-6 py-2 bg-white rounded-full text-gray-800 hover:bg-gray-100  transition-all duration-300 flex items-center gap-2 backdrop-blur-sm border border-gray-400 cursor-pointer"
        >
          ← Back to Home
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-400"
        >
          <div className="text-center mb-12">
            <h1 className=" mb-4  bg-clip-text lg:text-5xl md:text-4xl font-semibold md:!leading-[80px] text-gray-900 text-center">
              {/* Book Your Pass <br /> And <br /> */}
              Organize An Event With Us
            </h1>
            <p className="text-gray-800 text-lg mt-5">
              Fill in the details to book your event
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-800">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-100 border border-gray-400 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all duration-300  placeholder-gray-500 outline-hidden text-gray-800"
                  placeholder="Enter your name"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-100 border border-gray-400 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all duration-300  placeholder-gray-500 outline-hidden text-gray-800"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-800">
                    +91
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className=" pl-12 pr-4 w-full bg-gray-100 border border-gray-400 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all duration-300  placeholder-gray-500 outline-hidden text-gray-800"
                    placeholder="XXXXXXXXXX"
                    required
                  />
                </div>
              </div>

              {/* Event Type */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Event Type
                </label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full bg-gray-100 border border-gray-400 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all duration-300  placeholder-gray-500 outline-hidden text-gray-800"
                  required
                >
                  <option value="" disabled>
                    Select Event Type
                  </option>
                  <option value="Wedding">Wedding</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Concert">Concert</option>
                  <option value="Festivel">Festivel</option>
                  <option value="FashionShow">Fashion Show</option>
                  <option value="BrandPromotion">Brand Promotion</option>
                  <option value="SocialEvent">Social Event</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Date and Time Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-700" />
                    <span>Date</span>
                  </div>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-gray-100 border border-gray-400 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all duration-300  placeholder-gray-500 outline-hidden text-gray-800"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-700" />
                    <span>Time of Day</span>
                  </div>
                </label>
                <select
                  name="timeOfDay"
                  value={formData.timeOfDay}
                  onChange={handleChange}
                  className="w-full bg-gray-100 border border-gray-400 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all duration-300  placeholder-gray-500 outline-hidden text-gray-800"
                  required
                >
                  <option value="" disabled>
                    Select Time
                  </option>
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Night">Night</option>
                </select>
              </div>
            </div>
            {/* Location */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-700" />
                  <span>Location</span>
                </div>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full bg-gray-100 border border-gray-400 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all duration-300  placeholder-gray-500 outline-hidden text-gray-800"
                placeholder="Enter event location"
                required
              />
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-700" />
                  <span>Budget (INR)</span>
                </div>
              </label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full bg-gray-100 border border-gray-400 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all duration-300  placeholder-gray-500 outline-hidden text-gray-800"
                placeholder="Enter your budget"
                required
              />
            </div>

            {/* Expected Attendees */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-700" />
                  <span>Expected Attendees</span>
                </div>
              </label>
              <input
                type="number"
                name="guestCount"
                value={formData.guestCount}
                onChange={handleChange}
                className="w-full bg-gray-100 border border-gray-400 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all duration-300  placeholder-gray-500 outline-hidden text-gray-800"
                placeholder="Enter number of attendees"
                required
              />
            </div>

            {/* Additional Requests */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center gap-2">
                  <Clipboard className="w-4 h-4 text-gray-700" />
                  <span>Additional Requests</span>
                </div>
              </label>
              <textarea
                name="additionalRequests"
                value={formData.additionalRequests}
                onChange={handleChange}
                className="w-full bg-gray-100 border border-gray-400 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all duration-300  placeholder-gray-500 outline-hidden text-gray-800"
                placeholder="Any special requirements or requests"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-6 py-3 bg-white rounded-full text-gray-700 hover:bg-gray-100 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm border border-gray-400 cursor-pointer"
              >
                <span className=" text-gray-700">
                  <Save className="w-4 h-4 text-gray-700" />
                </span>
                Submit Booking
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default EventForm;
