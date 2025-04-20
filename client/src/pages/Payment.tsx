import { QrCode, CreditCard } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

function Payment() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
      <button
        className="px-4 mt-4 text-blue-600 hover:text-blue-800 cursor-pointer hover:underline sm:mb-5 lg:mb-0 mb-6"
        onClick={() => (window.location.href = "/")}
      >
        ← Back to Home
      </button>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-indigo-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-semibold">Payment Scanner</h1>
              <CreditCard className="w-8 h-8" />
            </div>
            <p className="mt-4 opacity-80">Scan barcode to make your payment</p>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-indigo-500 transition-colors">
                <div className="text-center">
                  <QrCode className="mx-auto h-[40vh] w-12 text-gray-400" />
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center mt-4">
              <p className="text-center opacity-80 capitalize text-gray-700">
                After Successfully making your payment, you can connect with us
                through WhatsApp✅
              </p>
            </div>
          </div>
        </div>
      </div>
      <a
        href="https://web.whatsapp.com/send?phone=7772029539&text=hello i have a query"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 left-4 bg-green-500 text-white p-3 rounded-full shadow-lg transition-transform transform hover:scale-110"
      >
        <FaWhatsapp size={30} />
      </a>
    </div>
  );
}

export default Payment;
