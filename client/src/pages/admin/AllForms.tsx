import { useEffect, useState } from "react";
import api from "../../lib/axios";
import { toast } from "react-toastify";

function AllForms() {
  const [eventForm, setEventForms] = useState<any>([]);

  const fetchEventForms = async () => {
    try {
      const response = await api.get("/admin/forms/allForms");
      setEventForms(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEventForms();
  }, []);

  const handleFormDelete = async (id: string) => {
    try {
      await api.delete(`/admin/forms/deleteForm/${id}`);
      setEventForms(eventForm.filter((form: any) => form._id !== id));
      toast.success("Form deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await api.patch(`/admin/forms/updateForm/${id}`, {
        status: newStatus,
      });

      setEventForms(
        eventForm.map((form: any) =>
          form._id === id
            ? { ...form, status: response.data.data.status }
            : form
        )
      );
      toast.success("Status updated successfully");
    } catch (error) {
      toast.error("Failed to update status. Please try again.");
      console.error(error);
    }
  };

  return (
    <section className="main-content w-full overflow-auto p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 whitespace-nowrap">
            <tr>
              <th className="p-4 text-left text-sm font-medium text-white">
                S.No.
              </th>
              <th className="p-4 text-left text-sm font-medium text-white">
                Name
              </th>
              <th className="p-4 text-left text-sm font-medium text-white">
                Email
              </th>
              <th className="p-4 text-left text-sm font-medium text-white">
                Phone
              </th>
              <th className="p-4 text-left text-sm font-medium text-white">
                Event Type
              </th>
              <th className="p-4 text-left text-sm font-medium text-white">
                Location
              </th>
              <th className="p-4 text-left text-sm font-medium text-white">
                Budget
              </th>
              <th className="p-4 text-left text-sm font-medium text-white">
                Guest Count
              </th>
              <th className="p-4 text-left text-sm font-medium text-white">
                Additional Requests
              </th>
              <th className="p-4 text-left text-sm font-medium text-white">
                Date
              </th>
              <th className="p-4 text-left text-sm font-medium text-white">
                Status
              </th>
              <th className="p-4 text-left text-sm font-medium text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="whitespace-nowrap">
            {eventForm.map((data: any, index: any) => (
              <tr className="even:bg-blue-50" key={index}>
                <td className="p-4 text-sm text-black">{index + 1}.</td>
                <td className="p-4 text-sm text-black">{data.name}</td>
                <td className="p-4 text-sm text-black">{data.email}</td>
                <td className="p-4 text-sm text-black">{data.phone}</td>
                <td className="p-4 text-sm text-black">{data.eventType}</td>
                <td className="p-4 text-sm text-black">{data.location}</td>
                <td className="p-4 text-sm text-black">{data.budget}</td>
                <td className="p-4 text-sm text-black">{data.guestCount}</td>
                <td className="p-4 text-sm text-black text-nowrap">
                  {data.additionalRequests}
                </td>
                <td className="p-4 text-sm text-black">
                  {new Date(data.date).toLocaleDateString("en", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td className="p-4 text-sm text-black">
                  <select
                    value={data.status}
                    onChange={(e) =>
                      handleStatusChange(data._id, e.target.value)
                    }
                    className="border rounded p-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>

                <td className="p-4">
                  <button
                    className="mr-4 cursor-pointer"
                    title="Delete"
                    onClick={() => handleFormDelete(data._id)}
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
    </section>
  );
}

export default AllForms;
