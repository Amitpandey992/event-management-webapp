import { useEffect, useState } from "react";
import api from "../lib/axios";

interface Event {
  _id: number;
  title: string;
  description: string;
  image: {
    url: string;
  };
}

function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const fetchEvents = async () => {
    try {
      const response = await api.get("/admin/events/allevents");

      // console.log(response.data.data);
      setEvents(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-white to-gray-300 pl-6 pt-2">
        <a
          href="/"
          className="text-blue-600 inline-block hover:underline cursor-pointer "
        >
          ← back to home
        </a>
      </div>
      <header className="bg-gradient-to-r from-white to-gray-300 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-semibold mb-4 text-gray-900">
            Our Events
          </h1>
          <p className="text-gray-700 text-xl">
            Discover amazing Events and experiences waiting for you!
          </p>
        </div>
      </header>
      {/* Events Grid */}
      <main className="max-w-7xl mx-auto px-4 py-12 ">
        <div className="grid gap-12">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-gradient-to-t from-white to-gray-300 rounded-xl overflow-hidden shadow-2xl transform hover:scale-[1.01] transition-transform duration-300"
            >
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={event.image.url}
                    alt={event.title}
                    className="h-[400px] w-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8 -mt-4">
                  <h2 className="text-4xl mb-4 font-semibold text-gray-800">
                    {event.title}
                  </h2>

                  <p className="text-gray-700 mb-8 leading-relaxed mt-14">
                    {event.description}
                  </p>

                  <button
                    className="px-6 py-3.5 rounded-md text-gray-100 bg-blue-700 hover:bg-blue-800 transition-all mt-10 hover:cursor-pointer"
                    onClick={() => (window.location.href = "/Event-form")}
                  >
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Events;
