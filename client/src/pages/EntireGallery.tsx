import { useEffect, useState } from "react";
import api from "../lib/axios";
interface Images {
  _id: string;
  image: {
    fileId: string;
    url: string;
  };
}
const EntireGallery = () => {
  const [images, setImages] = useState<Images[]>([]);
  const fetchImages = async () => {
    const response = await api.get("/admin/gallery/allgalleryphotos");
    // console.log(response.data.data);
    setImages(response.data.data);
  };
  useEffect(() => {
    fetchImages();
  }, []);
  // const images = [
  //   {
  //     id: 1,
  //     url: "https://images.unsplash.com/photo-1738762390141-6b2fcd93f92e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     title: "Mountain Landscape",
  //     photographer: "John Doe",
  //   },
  //   {
  //     id: 4,
  //     url: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2070&auto=format&fit=crop",
  //     title: "City Lights",
  //     photographer: "Sarah Wilson",
  //   },
  //   {
  //     id: 5,
  //     url: "https://images.unsplash.com/photo-1712068907555-007806d33714?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     title: "Desert Dunes",
  //     photographer: "Alex Brown",
  //   },
  //   {
  //     id: 6,
  //     url: "https://plus.unsplash.com/premium_photo-1738090992292-877836f39759?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     title: "Autumn Colors",
  //     photographer: "Emily Davis",
  //   },
  //   {
  //     id: 8,
  //     url: "https://images.unsplash.com/photo-1738253145927-c385871168d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     title: "Tropical Beach",
  //     photographer: "Lisa Taylor",
  //   },
  //   {
  //     id: 9,
  //     url: "https://images.unsplash.com/photo-1738770106850-9df0f7bf02a5?q=80&w=2018&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     title: "Snow Mountains",
  //     photographer: "David Miller",
  //   },
  //   {
  //     id: 10,
  //     url: "https://images.unsplash.com/photo-1738447429433-69e3ecd0bdd0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     title: "Waterfall",
  //     photographer: "Rachel Green",
  //   },
  // ];

  return (
    <div className="min-h-screen bg-white">
      <button
        className="px-4 mt-4 text-blue-600 hover:text-blue-800 cursor-pointer hover:underline sm:mb-5 lg:mb-0"
        onClick={() => (window.location.href = "/")}
      >
        ← Back to Home
      </button>
      <div className="max-w-5xl mx-auto text-center relative px-4 sm:px-10 mt-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 leading-tight text-center text-gray-900">
          Image Gallery
        </h1>
        <p className="text-base text-gray-600">
          From grand weddings to corporate events, we make every occasion
          extraordinary.
          <br /> Plan Your Event Today – Let’s Make It Unforgettable!
        </p>
      </div>

      {/* Responsive Image Grid */}
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {images.map((image) => (
            <div
              key={image._id}
              className="group relative overflow-hidden rounded-lg bg-gray-800 cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              <img
                src={image.image.url || ""}
                alt="Gallery Image"
                className="w-full object-cover aspect-[4/6]"
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default EntireGallery;
