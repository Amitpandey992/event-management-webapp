import { useState } from "react";
import { Home, User, Settings, Menu } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex">
      {/* Sidebar */}

      <div
        className={`h-screen bg-black text-white p-5 transition-all duration-300 ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mb-4 p-2 rounded bg-gray-800 hover:bg-gray-700 transition"
        >
          <Menu size={24} />
        </button>
        {/* Sidebar Items */}
        <ul className="space-y-4 mt-10">
          <li className="flex items-center gap-4 p-2 rounded hover:bg-gray-700 cursor-pointer transition">
            <Home size={24} />
            {isOpen && <span>All Forms</span>}
          </li>
          <li className="flex items-center gap-4 p-2 rounded hover:bg-gray-700 cursor-pointer transition">
            <User size={24} />
            {isOpen && <span>Manage Events</span>}
          </li>
          <li className="flex items-center gap-4 p-2 rounded hover:bg-gray-700 cursor-pointer transition">
            <Settings size={24} />
            {isOpen && <span>Photo Gallery</span>}
          </li>
          <li className="flex items-center gap-4 p-2 rounded hover:bg-gray-700 cursor-pointer transition">
            <Settings size={24} />
            {isOpen && <span>Videos</span>}
          </li>
          <li className="flex items-center gap-4 p-2 rounded hover:bg-gray-700 cursor-pointer transition">
            <Settings size={24} />
            {isOpen && <span>Slider Image</span>}
          </li>
        </ul>
      </div>

      <div className="bg-white border"></div>
    </div>
  );
};

export default Sidebar;
