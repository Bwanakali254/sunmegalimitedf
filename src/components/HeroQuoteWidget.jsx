import React, { useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const HeroQuoteWidget = () => {
  const { backendUrl } = useContext(ShopContext);

  const [serviceType, setServiceType] = useState("Residential");
  const [location, setLocation] = useState("");
  const [systemSize, setSystemSize] = useState("");
  const [date, setDate] = useState("");
  const [contact, setContact] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLoading) return;

    try {
      setIsLoading(true);

      const serviceTypeMap = {
        Residential: "Solar Panel Installation",
        Commercial: "System Design & Consultation",
        Industrial: "Battery & Energy Storage Solutions",
        Consultation: "System Design & Consultation",
      };
      const mappedServiceType = serviceTypeMap[serviceType] || serviceType;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmail = emailRegex.test(contact.trim());

      let email, phone, name;
      if (isEmail) {
        email = contact.trim();
        phone = "+254000000000";
        name = contact.split("@")[0] || "Quote Requester";
      } else {
        email = contact.trim() || "quote@sunmega.co.ke";
        phone = "+254000000000";
        name = "Quote Requester";
      }

      let message = "";
      if (systemSize) message += `System Size: ${systemSize}\n`;
      if (date) message += `Preferred Date: ${date}\n`;
      if (message) message = message.trim();

      const response = await axios.post(backendUrl + "/api/quote", {
        name: name || "Quote Requester",
        email,
        phone,
        serviceType: mappedServiceType,
        location,
        message,
      });

      if (response.data.success) {
        toast.success(response.data.message || "Quote request submitted!");
        setLocation("");
        setSystemSize("");
        setDate("");
        setContact("");
      } else {
        toast.error(response.data.message || "Failed to submit quote");
      }
      setIsLoading(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to submit quote"
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center px-4">
      <div className="bg-white border border-green-600 shadow-xl rounded-2xl w-full max-w-6xl mt-6 p-6 space-y-6">
        {/* Tabs */}
        <div className="flex flex-wrap gap-3 border-b pb-3">
          {["Residential", "Commercial", "Industrial", "Consultation"].map(
            (tab) => (
              <button
                key={tab}
                type="button"
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  serviceType === tab
                    ? "bg-green-600 text-white shadow"
                    : "bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-700"
                }`}
                onClick={() => setServiceType(tab)}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          {/* Location */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Location
            </label>
            <input
              type="text"
              placeholder="Your location"
              className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          {/* System Size */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              System Size
            </label>
            <input
              type="text"
              placeholder="5 kW"
              className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
              value={systemSize}
              onChange={(e) => setSystemSize(e.target.value)}
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Installation Date
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>
        </form>

        {/* Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-green-600 hover:bg-amber-500 transition text-white px-8 py-3 rounded-xl text-sm font-semibold shadow disabled:opacity-50"
          >
            {isLoading ? "Submitting..." : "Get Quote"}
          </button>
        </div>

        {/* Hint */}
        <div className="text-xs text-gray-500 flex items-center gap-2">
          <span>Last searching</span>
          <span className="text-lg">›</span>
        </div>
      </div>
    </div>
  );
};

export default HeroQuoteWidget;
