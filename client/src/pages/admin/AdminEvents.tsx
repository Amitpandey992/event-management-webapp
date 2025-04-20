import { useEffect, useRef, useState } from "react";
import api from "../../lib/axios";
import { toast } from "react-toastify";

function AdminEvents() {
  const [events, setEvents] = useState<any>([]);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");

  const fetchEvents = async () => {
    try {
      const response = await api.get("/admin/events/allevents");
      setEvents(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a photo to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("description", description);
    formData.append("title", title);

    try {
      setLoading(true);
      const response = await api.post("/admin/events/event/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Event uploaded successfully!");
      setEvents((prevEvents: any) => [...prevEvents, response.data]);

      setFile(null);
      setDescription("");
      setTitle("");
      setLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Upload failed.");
    }
  };

  const handleEventDelete = async (id: string) => {
    try {
      await api.delete(`/admin/events/event/delete/${id}`);
      setEvents(events.filter((event: any) => event._id !== id));
      toast.success("Event deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete event.");
      console.error(error);
    }
  };

  return (
    <section className="main-content w-full overflow-auto p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-4 text-left text-sm font-medium text-white">
                S.No.
              </th>
              <th className="p-4 text-left text-sm font-medium text-white">
                Event Title
              </th>
              <th className="p-4 text-left text-sm font-medium text-white">
                Description
              </th>
              <th className="p-4 text-left text-sm font-medium text-white">
                Event Picture
              </th>
              <th className="p-4 text-left text-sm font-medium text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {events?.map((data: any, index: number) => (
              <tr key={index} className="even:bg-blue-50">
                <td className="p-4 text-sm text-black">{index + 1}.</td>
                <td className="p-4 text-sm text-black">{data?.title}</td>
                <td className="p-4 text-sm text-black">{data?.description}</td>
                <td className="p-4 text-sm text-blue-700 hover:underline">
                  <a
                    href={data?.image?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {data?.image?.url}
                  </a>
                </td>
                <td className="p-4">
                <button
                    className="mr-4 cursor-pointer"
                    title="Delete"
                    onClick={() => handleEventDelete(data._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 fill-red-500 hover:fill-red-700"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                        data-original="#000000"
                      />
                      <path
                        d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                        data-original="#000000"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {loading && (
        <div className="flex justify-center items-center w-full mt-4">
          Loading...
        </div>
      )}

      {/* Upload Section */}
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-lg mx-auto mt-20">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b pb-2">
          Upload New Event
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Enter event title..."
          />
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Write a description..."
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <div className="flex flex-col items-center space-y-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="w-full text-gray-600 font-medium text-base bg-gray-100 file:cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-blue-600 file:hover:bg-blue-700 file:text-white rounded-lg shadow-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg shadow-md hover:bg-blue-700 transition-all cursor-pointer"
          >
            Submit Event
          </button>
        </form>
      </div>
    </section>
  );
}

export default AdminEvents;
