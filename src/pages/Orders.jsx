import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);

  const [OrderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });

        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      // Error handled silently
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"My"} text2={"Orders"} />
      </div>

      <div>
        {OrderData.map((item, index) => (
          <div
            key={index}
            className="py-4 bprder-t border-b text-gray-700 flex flex-col md:flex-row md:items-center gap-4"
          >
            {/* Left side - Image and Info */}
            <div className="flex items-start gap-6 text-sm flex-1">
              <img className="w-16 sm:w-20" src={item.image[0]} alt="" />
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">{item.name}</p>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Total: {item.total}</p>
                </div>
                <p className="mt-1 text-sm">
                  Date: <span className="text-gray-400"></span>
                  {new Date(item.date).toDateString()}
                </p>
                <p className="mt-1 text-sm">
                  Payment: <span className="text-gray-400"></span>
                  {item.paymentMethod}
                </p>
              </div>
            </div>

            {/* Middle - Green circle for order placed */}
            <div className="flex items-center justify-center gap-2 pr-80">
              <div
                className={`w-3 h-3 rounded-full ${
                  item.status === "Order Placed"
                    ? "bg-blue-500"
                    : item.status === "Packing"
                    ? "bg-orange-500"
                    : item.status === "Shipped"
                    ? "bg-purple-500"
                    : item.status === "Delivered"
                    ? "bg-green-500"
                    : "bg-gray-500"
                }`}
              ></div>
              <p className="text-sm text-gray-700">{item.status}</p>
            </div>

            {/* Right side - Track order button */}
            <div className="flex items-center">
              <button
                onClick={() => loadOrderData()}
                className="bg-green-500 hover:bg-amber-500 cursor-pointer text-white px-4 py-2 rounded text-sm"
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
