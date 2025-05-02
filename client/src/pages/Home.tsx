import { useEffect, useRef, useState } from "react";
import logo from "../assets/hey.png";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
import emailjs from "emailjs-com";
import api from "../lib/axios";
import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import PartnersSection from "./Partner";

interface Events {
  _id: number;
  title: string;
  description: string;
  image: {
    url: string;
  };
}

interface Images {
  _id: string;
  image: {
    url: string;
  };
}
interface SliderImage {
  _id: string;
  image: {
    url: string;
  };
}

const Home = () => {
  const aboutRef = useRef(null);
  const galleryRef = useRef(null);
  const getInTouchRef = useRef(null);
  // all state
  const [index, setIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(
    window.innerWidth < 768 ? 1 : 5
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);
  const [events, setEvents] = useState<Events[]>([]);
  const [images, setImages] = useState<Images[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderImage, setSliderImage] = useState<SliderImage[]>([]);

  // all functions
  const fetchSliderImage = async () => {
    try {
      const response = await api.get("/admin/sliderImage/allHomeSliderImage");
      // console.log("Fetched Data:", response.data.data);

      // Check if images exist
      if (!response.data.data || response.data.data.length === 0) {
        // console.error("No slider images found!");
        return;
      }

      // Ensure image URLs exist
      // response.data.data.forEach((img: any, index: number) => {
      //   console.log(`Image ${index + 1}:`, img.image?.url);
      // });

      setSliderImage(response.data.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const scrollToSection = (ref: any) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        (response: any) => {
          console.log("SUCCESS!", response.status, response.text);
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 10000);
          setFormData({ name: "", email: "", message: "" });
        },
        (error: any) => {
          console.log("FAILED...", error);
        }
      );
  };

  const fetchEvents = async () => {
    try {
      const response = await api.get("/admin/events/allevents");
      // console.log(response.data.data);
      setEvents(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGalleryImages = async () => {
    try {
      const response = await api.get("/admin/gallery/allgalleryphotos");
      // console.log(response.data, "////////");
      setImages(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const nextSlide = () => {
    if (sliderImage.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % sliderImage.length);
  };

  const prevSlide = () => {
    if (sliderImage.length === 0) return;
    setCurrentSlide(
      (prev) => (prev - 1 + sliderImage.length) % sliderImage.length
    );
  };

  // all useEffects
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3000);

    return () => clearInterval(interval);
  }, [nextImage]);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(window.innerWidth < 768 ? 1 : 3);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchEvents();
    fetchGalleryImages();
    fetchSliderImage();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [index, sliderImage]);

  return (
    <div className="bg-white text-gray-100 text-[15px] ">
      <div
        className="relative min-h-screen before:absolute before:inset-0 before:w-full before:bg-black before:opacity-60 -mt-3"
        style={{
          backgroundImage: "url(https://readymadeui.com/dark-bg-image.webp)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 w-full h-full">
          {sliderImage.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: currentSlide === index ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 cursor-pointer"
              style={{
                backgroundImage: `url("${img.image?.url}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              onClick={() =>
                (window.location.href = "https://greet.fydo.in/rang-de-indore")
              }
            />
          ))}

          {/* Left Button - Hidden on small screens */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors hidden md:block"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Right Button - Hidden on small screens */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors hidden md:block"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {sliderImage.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentSlide === index ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        <header className="px-4 sm:px-10 z-50 relative mt-3">
          <div className="flex items-center justify-between md:px-8">
            <div className="flex items-center justify-center">
              <a href="/">
                {/* Responsive Logo */}
                <img
                  src={logo}
                  alt="logo"
                  className="w-32 md:w-40 lg:w-45 h-auto"
                />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Navigation Links */}
            <nav
              className={`${
                isMenuOpen
                  ? "absolute top-full left-0 right-0 bg-gray-100 py-8 text-gray-800 bg-opacity-95"
                  : "hidden"
              } lg:block lg:static lg:bg-transparent`}
            >
              <ul className="lg:flex lg:gap-x-8 lg:items-center text-center">
                <li className="py-2 lg:py-0">
                  <button
                    onClick={() => (window.location.href = "aboutus")}
                    className="hover:text-blue-600 transition-all w-full cursor-pointer md:font-semibold md:text-xl"
                  >
                    About Us
                  </button>
                </li>
                <li className="py-2 lg:py-0">
                  <button
                    onClick={() => scrollToSection(galleryRef)}
                    className="hover:text-blue-600 transition-all w-full cursor-pointer md:font-semibold md:text-xl"
                  >
                    Our Gallery
                  </button>
                </li>
                <li className="py-2 lg:py-0">
                  <a
                    href="/events"
                    className="hover:text-blue-600 transition-all block w-full cursor-pointer md:font-semibold md:text-xl"
                  >
                    Events
                  </a>
                </li>
                <li className="py-2 lg:py-0">
                  <a
                    href="/event-form"
                    className="hover:text-blue-600 block transition-all cursor-pointer md:font-semibold md:text-xl"
                  >
                    Book Event
                  </a>
                </li>
                <li className="py-2 lg:py-0">
                  <button
                    onClick={() => scrollToSection(getInTouchRef)}
                    className="hover:text-blue-600 transition-all w-full cursor-pointer md:font-semibold md:text-xl"
                  >
                    Contact Us
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </header>
      </div>
      <div className="px-4 sm:px-10">
        <div className="mt-32 max-w-7xl mx-auto">
          <div className="max-w-5xl mx-auto text-center relative px-4 sm:px-10 mt-16">
            <h1 className="lg:text-7xl md:text-6xl text-4xl font-semibold mb-6 md:!leading-[80px] text-gray-900">
              Turning Moments into Memories🎉
            </h1>
            <p className="text-base text-gray-800">
              From grand weddings to corporate events, we make every occasion
              extraordinary.
              <br /> Plan Your Event Today – Let’s Make It Unforgettable!
            </p>
          </div>
          <div className="mb-16 max-w-2xl text-center mx-auto mt-25">
            <h2 className="md:text-4xl text-3xl font-semibold md:!leading-[50px] mb-6 text-gray-900">
              Our Events
            </h2>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-12 mt-16">
            {events.slice(0, 3).map((event) => (
              <div
                className="text-center bg-gray-100 px-6 py-8 rounded-2xl"
                key={event._id}
              >
                <img
                  src={event.image.url}
                  alt="event pics"
                  className="h-[60vh] object-cover mb-2"
                />
                <h3 className="text-xl mb-4 font-semibold text-gray-800">
                  {event.title}
                </h3>
                <p className="text-gray-800">{event.description}</p>
                <a
                  href="/event-form"
                  className="text-blue-600 inline-block mt-4 hover:underline"
                >
                  Book Now
                </a>
              </div>
            ))}
          </div>
          <div className="fixed bottom-4 left-4 flex flex-col gap-3">
            {/* Phone Call Icon */}
            <a
              href="tel:7772029539"
              className="bg-yellow-500 text-white p-3 rounded-full shadow-lg transition-transform transform hover:scale-110"
            >
              <FaPhone size={30} />
            </a>

            {/* WhatsApp Icon */}
            <a
              href="https://web.whatsapp.com/send?phone=7772029539&text=hello i have a query"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white p-3 rounded-full shadow-lg transition-transform transform hover:scale-110"
            >
              <FaWhatsapp size={30} />
            </a>
          </div>
          <div className="w-full flex justify-center">
            <button
              className="px-6 py-3.5 rounded-md text-gray-100 bg-blue-700 hover:bg-blue-800 transition-all mt-10 hover:cursor-pointer"
              onClick={() => (window.location.href = "/events")}
            >
              Explore More Events
            </button>
          </div>
        </div>
        <div ref={aboutRef} className="mt-32 rounded-md px-4 py-12">
          <div className="grid md:grid-cols-2 justify-center items-center gap-12 max-w-7xl mx-auto">
            <div>
              <img
                src="https://images.unsplash.com/photo-1599943821034-8cb5c7526922?q=80&w=1959&h=1300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Premium Benefits"
                className="w-full mx-auto"
              />
            </div>
            <div className="max-md:text-center">
              <h2 className="md:text-4xl text-3xl font-semibold md:!leading-[50px] mb-6 text-gray-900">
                Why We Are Different
              </h2>
              <p className="text-gray-800">
                We don’t just plan events—we craft unforgettable experiences.
                Our approach is rooted in creativity, precision, and a deep
                understanding of your vision. From concept to execution, we
                focus on every detail, ensuring seamless coordination and
                flawless delivery. What sets us apart is our personalized
                service, innovative ideas, and commitment to excellence. Whether
                it's an intimate gathering or a grand celebration, we bring
                passion, professionalism, and a touch of magic to make your
                event truly extraordinary.
              </p>
              <button
                type="button"
                className="px-6 py-3.5 rounded-md text-gray-100 bg-blue-700 hover:bg-blue-800 transition-all mt-10 cursor-pointer"
                onClick={() => (window.location.href = "/event-form")}
              >
                Book Event Now
              </button>
            </div>
          </div>
        </div>
        <div className="mt-32 rounded-md px-4 py-12">
          <div className="grid md:grid-cols-2 justify-center items-center gap-12 max-w-7xl mx-auto">
            <div className="max-md:text-center">
              <h2 className="md:text-4xl text-3xl font-semibold md:!leading-[50px] mb-6 text-gray-900">
                Bringing Your Events to Life
              </h2>
              <p className="text-gray-800">
                We specialize in seamless event planning and management, turning
                your ideas into unforgettable experiences. From corporate
                gatherings to grand celebrations, our expert team handles
                everything—venue selection, decor, entertainment, logistics, and
                more. Let us make your event stress-free and spectacular!
              </p>
              <button
                type="button"
                className="px-6 py-3.5 rounded-md text-gray-100 bg-blue-700 hover:bg-blue-800 transition-all mt-10 cursor-pointer"
                onClick={() => (window.location.href = "/event-form")}
              >
                Book Event Now
              </button>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1671036112705-12df83edf4d3?q=80&w=1887&h=1300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Premium Benefits"
                className="w-full mx-auto"
              />
            </div>
          </div>
        </div>

        <div ref={galleryRef} className="mt-32 max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-gray-900">
            Our Gallery
          </h2>

          <div className="mt-16 relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg">
            <div className="flex items-center justify-center">
              <button
                onClick={prevImage}
                className="absolute left-2 z-10 p-2 bg-black/50 rounded-full text-white cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>

              <motion.div
                className="flex gap-4"
                initial={{ x: 0 }}
                animate={{ x: `-${index * (100 / itemsPerView)}%` }}
                transition={{ type: "tween", duration: 0.5 }}
                style={{ width: `${(images.length * 100) / itemsPerView}%` }}
              >
                {images.map((img, i) => (
                  <motion.img
                    key={img._id}
                    src={img.image.url}
                    alt={`Gallery image ${i + 1}`}
                    className={`w-full md:w-1/3 h-64 object-cover flex-shrink-0`}
                  />
                ))}
              </motion.div>

              <button
                onClick={nextImage}
                className="absolute right-2 z-10 p-2 bg-black/50 rounded-full text-white cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            <div className="flex justify-center items-center mt-12">
              <button
                type="submit"
                className=" p-3 rounded-md bg-blue-700 hover:bg-blue-800 transition-colors cursor-pointer"
                onClick={() => (window.location.href = "/ourgallery")}
              >
                View Entire Gallery
              </button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-32 max-w-7xl ">
          <h2 className="md:text-4xl text-3xl font-semibold md:!leading-[50px] mb-6 text-gray-900 text-center">
            Our YouTube Videos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            <iframe
              src="https://www.youtube.com/embed/9M2mbP585WM?autoplay=1&mute=1&loop=1"
              title="🤩STAY TUNED🤩 ✨COMING SOON EVENTS ✨💫THE ROX EVENT ORGANISERS 💫.@theroxeventorganisers"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-[200px] sm:h-[250px] md:h-[280px] lg:h-[315px]"
            ></iframe>
            <iframe
              src="https://www.youtube.com/embed/Az0eQWSIeio?autoplay=1&mute=1&loop=1"
              title="💫THE ROX EVENT ORGANISERS 💫✨INDORE&#39;S BIGGEST EVENT 2025 ✨....@theroxeventorganisers"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-[200px] sm:h-[250px] md:h-[280px] lg:h-[315px]"
            ></iframe>
            <iframe
              src="https://www.youtube.com/embed/73q_mVysQKU?autoplay=1&mute=1&loop=1"
              title="THE ROX EVENT ORGANISERS @theroxeventorganisers #PERFECTLY PLANNED EVENTS EVERY TIME"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-[200px] sm:h-[250px] md:h-[280px] lg:h-[315px]"
            ></iframe>
            <iframe
              width="341"
              height="606"
              src="https://www.youtube.com/embed/Nd8QoRr4FA8?autoplay=1&mute=1&loop=1"
              title="Indore, get ready for the most premium Holi celebration of the year #event #eventorganizer #rox #big"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-[200px] sm:h-[250px] md:h-[280px] lg:h-[315px]"
            ></iframe>
            <iframe
              width="341"
              height="606"
              src="https://www.youtube.com/embed/vKauKE_ZxnM?autoplay=1&mute=1&loop=1"
              title="Indore, get ready for the most premium Holi celebration you’ve ever seen!The Rox Event Organizers ✨"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-[200px] sm:h-[250px] md:h-[280px] lg:h-[315px]"
            ></iframe>
          </div>
        </div>

        <div className="mt-32 max-w-7xl mx-auto">
          <div className="mb-16 max-w-2xl text-center mx-auto">
            <h2 className="md:text-4xl text-3xl font-semibold md:!leading-[50px] mb-6 text-gray-900">
              What our happy client say
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 max-md:justify-center text-center mt-16">
            <div>
              <div className="flex flex-col items-center">
                <div className="mt-4">
                  <p className="text-gray-800">
                    The Attention to Detail is Unmatched From the first
                    consultation to the final guest’s goodbye, The Rox Event
                    Organisers impressed us with their unmatched attention to
                    detail. No request was too big or too small — every flower
                    arrangement, lighting choice, and schedule was flawlessly
                    executed. They truly care about making your event perfect.
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="text-base text-gray-800"> — Priyansh Gupta</h4>
              </div>
            </div>

            <div>
              <div className="flex flex-col items-center">
                <div className="mt-4">
                  <p className="text-gray-800">
                    Beyond Our Wildest Dreams The Rox Event Organisers didn’t
                    just plan our wedding — they crafted an unforgettable
                    experience. Every detail, from the breathtaking décor to the
                    seamless coordination, was beyond what we imagined. Their
                    passion and creativity turned our special day into pure
                    magic. We’re still receiving compliments from our guests!
                    Truly a dream team.
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="text-base text-gray-800">— Rishi & Sakshi</h4>
              </div>
            </div>
            <div>
              <div className="flex flex-col items-center">
                <div className="mt-4">
                  <p className="text-gray-800">
                    Flawless Corporate Event Execution We entrusted The Rox with
                    our annual corporate gala, and they delivered perfection.
                    Their professionalism, strategic planning, and eye for
                    detail ensured the event ran like clockwork. The ambiance,
                    entertainment, and hospitality were world-class. Looking
                    forward to many more collaborations !
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="text-base text-gray-800">— Shubhangi Mishra</h4>
              </div>
            </div>
            <div>
              <div className="flex flex-col items-center">
                <div className="mt-4">
                  <p className="text-gray-800">
                    A Masterpiece of Elegance and Charm "What sets The Rox apart
                    is their ability to transform ideas into stunning realities.
                    Our anniversary celebration was a masterpiece — elegant yet
                    personal, grand yet intimate. They listened to our vision
                    and elevated it to a level we didn’t think possible. Highly
                    recommended for those seeking something extraordinary.
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="text-base text-gray-800">
                  — Rohit & Netu Bhardwaj
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PartnersSection />
      <footer ref={getInTouchRef} className="bg-white mt-32 px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Contact Form */}
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-semibold mb-6 text-gray-900">
                Get in Touch
              </h2>
              <p className="text-gray-800 mb-6">
                We'd love to hear from you! Fill out the form below and we’ll
                get back to you as soon as possible.
              </p>

              {success && (
                <div className="bg-green-500/10 text-green-500 p-4 rounded-lg mb-6">
                  Your message has been sent successfully!
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="w-full p-3 rounded-md bg-gray-50 text-black outline-none border border-gray-400 focus:border-gray-900"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full p-3 rounded-md bg-gray-50 text-black outline-none border border-gray-400 focus:border-gray-900"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={4}
                  className="w-full p-3 rounded-md bg-gray-50 text-black outline-none border border-gray-400 focus:border-gray-900"
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                <button
                  type="submit"
                  className="w-full p-3 rounded-md bg-blue-700 hover:bg-blue-800 transition-colors cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Google Map */}
            <div className="w-full md:w-1/2 h-[400px] rounded-lg overflow-hidden">
              <iframe
                className="w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3680.0980187519594!2d75.82061387530494!3d22.724597879383733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjLCsDQzJzI4LjYiTiA3NcKwNDknMjMuNSJF!5e0!3m2!1sen!2sin!4v1739422431381!5m2!1sen!2sin"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center p-6">
              <Mail className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                Email Us
              </h3>
              <p className="text-gray-600">pandeyamit9340@gmail.com</p>
            </div>
            <div className="text-center p-6">
              <Phone className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                Call Us
              </h3>
              <p className="text-gray-600 mb-2">
                +917772029539
                <br />
                +917697755793
              </p>
            </div>
            <div className="text-center p-6">
              <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                Visit Us
              </h3>
              <p className="text-gray-600">
                33 Kalani Nagar, Airport Road, Behind Bank of Baroda, Indore,
                Madhya Pradesh
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-12 border-t border-gray-400">
          <div className="flex justify-center gap-4 items-center">
            <a
              href="https://www.instagram.com/theroxeventorganisers/"
              target="_blank"
              className=" cursor-pointer"
            >
              {" "}
              <Instagram size={24} className="text-pink-500" />
            </a>
            <a
              href="https://www.facebook.com/people/Theroxevent-Organizers/61572570866985/?rdid=BryaOIfoHRGEHfi9&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1HKfmAL2Tt%2F"
              target="_blank"
              className=" cursor-pointer"
            >
              <Facebook size={24} className="text-blue-600" />
            </a>
            <a
              href="https://www.youtube.com/@theroxeventorganisers"
              target="_blank"
              className=" cursor-pointer"
            >
              <Youtube size={24} className="text-blue-700 " />
            </a>
          </div>
        </div>
      </footer>
      <div className=" text-center py-6 border-t border-gray-400">
        <p className="text-gray-800">
          All Rights Reserved © 2024 TheRox. Created by Amit pandey
        </p>
      </div>
    </div>
  );
};

export default Home;
