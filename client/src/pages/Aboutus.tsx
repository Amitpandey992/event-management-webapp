import {
  Users,
  Award,
  Calendar,
  Heart,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import imageTwo from "../assets/IMG_9758.png";
import imageOne from "../assets/IMG_1387.png";

interface Achievement {
  count: string;
  label: string;
  icon: JSX.Element;
}
// interface TeamMember {
//   name: string;
//   role: string;
//   image: string;
//   bio: string;
// }

function Aboutus() {
  const achievements: Achievement[] = [
    {
      count: "10+",
      label: "Years Experience",
      icon: <Calendar className="w-6 h-6" />,
    },
    {
      count: "500+",
      label: "Events Completed",
      icon: <Award className="w-6 h-6" />,
    },
    {
      count: "50+",
      label: "Team Members",
      icon: <Users className="w-6 h-6" />,
    },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <button
        className="px-4 mt-4 text-blue-600 hover:text-blue-800 cursor-pointer hover:underline sm:mb-5 lg:mb-0"
        onClick={() => (window.location.href = "/")}
      >
        ← Back to Home
      </button>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-pink-50 opacity-30"></div>
        <div className="relative max-w-5xl mx-auto px-4">
          <div className="flex justify-center mb-6">
            <Heart className="w-12 h-12 text-blue-600 animate-pulse" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 text-center leading-tight">
            Crafting Moments That
            <br />
            Last Forever
          </h1>
          <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto">
            Creating extraordinary events and unforgettable moments. We
            transform visions into remarkable experiences.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-20">
        {/* Story Section */}
        <div className="mb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 relative inline-block">
              Our Story
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-blue-600 rounded-full"></div>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed text-justify">
              Welcome to <strong>The Rox Event Organisers </strong>— where
              creativity meets precision, and every event is a masterpiece in
              the making. We are a full-service event planning company dedicated
              to crafting memorable experiences that capture your unique vision.
              Whether it’s a corporate conference, a lavish wedding, or an
              intimate gathering, our team works tirelessly to bring your ideas
              to life with style, sophistication, and flawless execution. <br />{" "}
              <strong>Our Approach </strong>
              At The Rox, we embrace a collaborative approach to event planning.
              We believe that every client is unique, and so is every event. Our
              process involves understanding your goals, preferences, and
              personality, ensuring that every aspect of your event reflects
              your story. From concept development to on-site management, we
              handle everything with creativity, strategy, and professionalism.
              <br /> <strong> Our Values </strong> Creativity: We design events
              that inspire and impress, pushing the boundaries of imagination.
              Integrity: Transparency and honesty are at the core of our client
              relationships. Excellence: We pursue perfection in planning,
              coordination, and execution. Client-Centric Focus: Your vision
              drives our work — we listen, adapt, and deliver. <br />{" "}
              <strong>Our Vision </strong>
              Our vision is to become a trusted name in the event planning
              industry, known for our innovation, dedication, and ability to
              turn ordinary events into extraordinary experiences. We aim to
              create moments that not only impress but leave lasting memories.
              <br /> <strong> Founder’s Message </strong>"At The Rox Event
              Organisers, we don't just plan events — we curate experiences.
              Each event is a canvas, and every detail adds a brushstroke to a
              larger masterpiece. Our team is passionate about turning your
              dreams into reality, ensuring every moment is both meaningful and
              memorable. Let’s create something remarkable together."
              <br /> <strong> Why Choose Us </strong>Bespoke Experiences: We
              tailor every event to your specific desires and goals. Expertise &
              Innovation: Our team brings creativity and strategic thinking to
              every project. End-to-End Planning: From ideation to execution, we
              handle all aspects seamlessly. Strong Vendor Partnerships: We
              collaborate with top-tier vendors to deliver exceptional quality.
              Budget-Conscious Planning: Luxury doesn’t have to be expensive —
              we offer solutions for every budget. Personalized Approach We
              believe personalization is the heart of great event planning. At
              The Rox, we take the time to understand your story, preferences,
              and expectations. Every element — from décor and entertainment to
              menus and guest experiences — is designed specifically for you.
              Our goal is to create events that feel authentic and
              unforgettable. Vendor Relations Our success is built on strong
              relationships with reliable and high-quality vendors. Over the
              years, we’ve curated a network of trusted partners — caterers,
              decorators, photographers, entertainers, and more — ensuring you
              get the best services at competitive prices. We negotiate
              contracts, coordinate logistics, and manage vendor communications,
              so you don’t have to. <br /> <strong> Terms & Conditions</strong>{" "}
              At The Rox Event Organisers, we value transparency and clear
              communication. Our Terms & Conditions outline the scope of our
              services, payment schedules, cancellation policies, and client
              responsibilities. By working with us, you agree to these terms,
              ensuring a smooth, professional collaboration. A detailed T&C
              document will be provided upon booking. <br />{" "}
              <strong> Privacy Policy </strong> Your privacy is important to us.
              The Rox Event Organisers is committed to protecting your personal
              information. Any data collected — including names, contact
              details, and event specifics — is used solely for event planning
              purposes. We do not share your information with third parties
              without your consent. Our full Privacy Policy will be shared at
              the time of booking. <br /> <strong>Attention to Detail </strong>{" "}
              Details make the difference between a good event and a great one.
              Our team meticulously plans every element — from the ambiance and
              flow of the event to the tiniest design touches. Whether it’s
              ensuring the lighting is perfect, the floral arrangements are
              flawless, or the timing is seamless, we pride ourselves on
              delivering events where no detail goes unnoticed. Let The Rox
              Event Organisers elevate your special moments into extraordinary
              experiences. Contact us today to start planning your next
              unforgettable event!
            </p>
          </div>
        </div>

        {/* Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex justify-center mb-6">
                <div className="bg-blue-50 p-4 rounded-xl group-hover:bg-blue-100 transition-colors duration-300">
                  {achievement.icon}
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-3 text-center">
                {achievement.count}
              </div>
              <div className="text-gray-600 text-center">
                {achievement.label}
              </div>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          {/* <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
              alt="Our Team"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
          <div className="p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h3>
            <p className="text-gray-600 mb-6">
              Our dedicated team of professionals working together to create
              exceptional experiences.
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
              Join Our Team
              <ArrowRight className="w-4 h-4" />
            </button>
          </div> */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-semibold mb-4 text-gray-800">
                  Meet Our Team
                </h2>
                <p className="text-gray-700 max-w-2xl mx-auto">
                  Our diverse team of experienced professionals is dedicated to
                  making your events exceptional. Each member brings unique
                  skills and creativity to the table.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {/* {teamMembers.map((member, index) => ( */}
                <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:-translate-y-1">
                  <img
                    src={imageOne}
                    alt={imageOne}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-700">
                      Sachin Dixit
                    </h3>
                    <p className="text-blue-600 mb-4">Founder and CEO</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:-translate-y-1">
                  <img
                    src={imageTwo}
                    alt={imageTwo}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-700">
                      Ritesh Patil
                    </h3>
                    <p className="text-blue-600 mb-4">Co-Founder</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center p-6">
              <Mail className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                Email Us
              </h3>
              <p className="text-gray-600">theroxeventorgainsers@gmail.com</p>
            </div>
            <div className="text-center p-6">
              <Phone className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                Call Us
              </h3>
              <p className="text-gray-600">+917772029539</p>
              <p className="text-gray-600 mt-2">+917697755793</p>
            </div>
            <div className="text-center p-6">
              <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                Visit Us
              </h3>
              <p className="text-gray-600">
                33 Kalani Nagar, Airport Road, Behind Bank of Baroda,
                <br />
                Indore, Madhya Pradesh
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Aboutus;
