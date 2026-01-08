import { ShopContext } from "./ShopContext";
import { products } from "../assets/assets";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"; 



const ShopContextProvider = (props) => {

    const currency = "KES";
    const deliveryFee = 10;
    const taxes = 0.1;
    const [search,setSearch] = useState("");
    const [showSearch,setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();
    
    const addToCart =async (itemId,size) => {

        if (!size) {
            toast.error("Please select a size");
            return;
        }
            
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
        toast.success("Product added to cart!");
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for(const item in cartItems[items]) {
                try{
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                }
                catch {
                    // Ignore errors
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId,size,quantity) => {

        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData);
    }

    useEffect(() => {

    },[cartItems]);

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product)=> product._id === items);
            for (const item in cartItems[items]) {
                try{
                    if (cartItems[items][item] > 0) {
                        totalAmount += cartItems[items][item] * itemInfo.price;
                    }
                } catch {
                    // Ignore errors
                }
            }
        }
        return totalAmount;
    };

    
    const value ={
        products,
        currency,
        deliveryFee,
        taxes,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,

    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;