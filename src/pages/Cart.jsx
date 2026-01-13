import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate, isCartLoading } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  // Filter out items where product doesn't exist (safety check)
  const validCartData = cartData.filter((item) => {
    const ProductData = products.find((product) => product._id === item.id);
    if (!ProductData) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Product with id ${item.id} not found in products list`);
      }
      return false;
    }
    return true;
  });

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"Your"} text2={"Cart"} />
      </div>

      {isCartLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-gray-500 text-lg">Loading cart...</p>
        </div>
      ) : validCartData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-24 h-24 mb-6 flex items-center justify-center">
            <svg className="w-full h-full text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-2xl font-medium text-gray-700 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 text-sm mb-8">Looks like you haven't added anything yet</p>
          <button
            onClick={() => navigate('/collection')}
            className="bg-green-500 hover:bg-amber-500 text-white px-8 py-3 rounded cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div>
            {validCartData.map((item, index) => {
              const ProductData = products.find(
                (product) => product._id === item.id
              );

              // Safety check (should not happen after filter, but extra safety)
              if (!ProductData) {
                return null;
              }

              return (
                <div
                  key={index}
                  className="py-4 bprder-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                >
                  <div className="flex items-start gap-6">
                    <img
                      src={ProductData.image[0]}
                      alt=""
                      className="w-16 sm:w-20"
                    />
                    <div>
                      <p className="text-xs sm:text-lg font-medium ">
                        {ProductData.name}
                      </p>
                      <div className="flex items-center gap-5 mt-2">
                        <p className="">
                          {currency}
                          {ProductData.price}
                        </p>
                        <p className="px-2 sm:px-3 sm:py-1 border border-amber-50">
                          {item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>

                  <input
                    onChange={(e) =>
                      e.target.value === "" || e.target.value === "0"
                        ? null
                        : updateQuantity(item.id, item.size, Number(e.target.value))
                    }
                    className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 "
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                  />
                  <img
                    onClick={() => updateQuantity(item.id, item.size, 0)}
                    className="w-4 mr-4 sm:w-5 cursor-pointer"
                    src={assets.binIcon}
                    alt=""
                  />
                </div>
              );
            })}
          </div>

          <div className="flex justify-end my-20">
            <div className="w-full sm:w-112.5">
              <CartTotal />
              <div className="w-full text-end">
                <button
                  onClick={() => navigate("/place-order")}
                  className="bg-green-500 text-white hover:bg-amber-500 px-8 text-sm my-8 py-3 cursor-pointer"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
