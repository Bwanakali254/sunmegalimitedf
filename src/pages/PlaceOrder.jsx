import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    setCartItems,
    getCartItems,
    getCartAmount,
    deliveryFee,
    products,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to place an order");
      navigate("/login");
      return;
    }
    
    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let OrderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + deliveryFee,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/place`,
        OrderData,
        {
          headers: {
            token: token,
          },
        }
      );

      if (res.data.success && res.data.redirect_url) {
        window.location.href = res.data.redirect_url;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* Left Side */}
      <div className="flex flex-col gap-4 sm:max-w-120">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"Delivery"} text2={"Information"} />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="border border-green-300 rounded py-1.5 px-3.5 w-full "
            type="text"
            placeholder="First Name"
            required
          />
          <input
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="border border-green-300 rounded py-1.5 px-3.5 w-full "
            type="text"
            placeholder="Last Name"
            required
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="border border-green-300 rounded py-1.5 px-3.5 w-full "
          type="email"
          placeholder="Email Address"
          required
        />
        <input
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          className="border border-green-300 rounded py-1.5 px-3.5 w-full "
          type="text"
          placeholder="Street"
          required
        />
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="border border-green-300 rounded py-1.5 px-3.5 w-full "
            type="text"
            placeholder="City"
            required
          />
          <input
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className="border border-green-300 rounded py-1.5 px-3.5 w-full "
            type="text"
            placeholder="State"
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            className="border border-green-300 rounded py-1.5 px-3.5 w-full "
            type="text"
            placeholder="Zip Code"
            required
          />
          <input
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="border border-green-300 rounded py-1.5 px-3.5 w-full "
            type="text"
            placeholder="Country"
            required
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className="border border-green-300 rounded py-1.5 px-3.5 w-full "
          type="text"
          placeholder="Phone Number"
          required
        />
        <div className="w-full text-end">
          <button
            type="submit"
            className="bg-green-500 text-white hover:bg-amber-500 px-16 text-sm my-8 py-3 cursor-pointer"
          >
            Place Order
          </button>
        </div>
      </div>

      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12 max-w-112.5">
          <div className="flex justify-between items-center mb-4">
            <Title text1={"Payment"} text2={"Method"} />
            <div className="flex items-center gap-2 text-gray-500">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <p>Secure Payment</p>
            </div>
          </div>
          {/* Payment Methods */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 border border-green-300 p-2 px-3 cursor-pointer">
              <img className="w-full mx-4" src={assets.pesapalLogo} alt="" />
            </div>

            <div className="border border-green-400 rounded p-4">
              <div className="flex items-center justify-between">
                <h1 className="text-black text-lg font-semibold">
                  Your payment is secure with Pesapal
                </h1>
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-gray-700 mt-2 text-sm">
                All transactions are processed securely through Pesapal's
                encrypted payment gateway. You'll be redirected to Pesapal's
                secure payment page to complete your transaction. We never store
                your payment details.
              </p>
            </div>
            <p className="border border-green-400 rounded p-4 text-sm">
              <span className="text-black font-semibold">NOTE:</span>
              <span className="text-gray-700">
                {" "}
                After clicking "Place Order", you'll be redirected to Pesapal's
                secure payment page where you can choose your preferred payment
                method (M-Pesa, Airtel Money, Card, etc.).
              </span>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
