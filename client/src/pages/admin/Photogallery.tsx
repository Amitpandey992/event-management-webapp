import { useEffect, useRef, useState } from "react";
import api from "../../lib/axios";
import { toast } from "react-toastify";

function Photogallery() {
  const [gallery, setGallery] = useState<any>([]);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch Gallery Photos
  const fetchGallery = async () => {
    try {
      const response = await api.get("/admin/gallery/allgalleryphotos");
      setGallery(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // Handle File Selection
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const onSubmit = async () => {
    if (!file) {
      toast.error("Please select a photo to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      const response = await api.post("/admin/gallery/uploadphoto", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Photo uploaded successfully!");
      setGallery([...gallery, response.data.data]);
      setFile(null);
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

  const handlePhotoDelete = async (id: string) => {
    try {
      await api.delete(`/admin/gallery/delete/${id}`);
      setGallery(gallery.filter((photo: any) => photo._id !== id));
      toast.success("Photo deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete photo.");
      console.error(error);
    }
  };

  return (
    <section className="main-content w-full overflow-auto p-6">
      {gallery.length <= 0 ? (
        <div className="w-full flex items-center justify-center">
          <p className="text-3xl mt-4">No Images Found, Upload New One.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 whitespace-nowrap">
              <tr>
                <th className="p-4 text-left text-sm font-medium text-white">
                  S.No.
                </th>
                <th className="p-4 text-left text-sm font-medium text-white">
                  Photos
                </th>
                <th className="p-4 text-left text-sm font-medium text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="whitespace-nowrap">
              {gallery.map((data: any, index: number) => (
                <tr key={index} className="even:bg-blue-50">
                  <td className="p-4 text-sm text-black">{index + 1}.</td>
                  <td className="p-4 text-sm text-blue-700 hover:underline">
                    <a href={data.image.url} target="_blank">
                      {" "}
                      {data.image.url}
                    </a>
                  </td>
                  <td className="p-4">
                    <button
                      className="mr-4 cursor-pointer"
                      title="Delete"
                      onClick={() => handlePhotoDelete(data._id)}
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
      )}

      {loading && (
        <div className="flex justify-center items-center w-full mt-4">
          Loading.....
        </div>
      )}

      {/* Upload Section */}
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-lg mx-auto mt-20">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b pb-2">
          Upload New Image In Gallery
        </h2>
        <div className="flex flex-col items-center space-y-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="w-full text-gray-600 font-medium text-base bg-gray-100 file:cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-blue-600 file:hover:bg-blue-700 file:text-white rounded-lg shadow-sm"
          />

          <button
            onClick={onSubmit}
            className="mt-2 w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg shadow-md hover:bg-blue-700 transition-all cursor-pointer"
          >
            Upload Photo
          </button>
        </div>
      </div>
    </section>
  );
}

export default Photogallery;
