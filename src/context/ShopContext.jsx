import { ShopContext } from "./ShopContext";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"; 
import axios from "axios";



const ShopContextProvider = (props) => {

    const currency = "KES";
    const deliveryFee = 10;
    const taxes = 0.1;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search,setSearch] = useState("");
    const [showSearch,setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token,setToken] = useState('');
    const [user, setUser] = useState(null);
    const [isCartLoading, setIsCartLoading] = useState(false);
    const navigate = useNavigate();
    
    const addToCart =async (itemId,quantity) => {

        if (!quantity) {
            toast.error("Please select a quantity");
            return;
        }
            
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][quantity]) {
                cartData[itemId][quantity] += 1;
            }
            else {
                cartData[itemId][quantity] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][quantity] = 1;
        }
        setCartItems(cartData);
        toast.success("Product added to cart!");
        
        if (token) {
            try {

                await axios.post(backendUrl + "/api/cart/add", {itemId, quantity}, {headers:{token}})
                

            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }

            
            
        }

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

    const updateQuantity = async (itemId, sizeKey, newQuantity) => {

        let cartData = structuredClone(cartItems);

        if (newQuantity === 0) {
            if (cartData[itemId] && cartData[itemId][sizeKey]) {
                delete cartData[itemId][sizeKey];
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId];
                }
            }
        } else {
            if (!cartData[itemId]) {
                cartData[itemId] = {};
            }
            cartData[itemId][sizeKey] = newQuantity;
        }

        setCartItems(cartData);

        if (token) {
            try {

                await axios.post(backendUrl + '/api/cart/update', {itemId, sizeKey, newQuantity}, {headers:{token}})
                
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
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


    const getProductsData = async () => {
        try {

             const response = await axios.get(backendUrl + "/api/product/list");
             if(response.data.success){
                setProducts(response.data.products);
             } else {
                toast.error(response.data.message);
             }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserCart = async (token) => {
        try {

            const response = await axios.post(backendUrl +'/api/cart/get',{},{headers:{token}})
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const fetchUserProfile = async (token) => {
        try {
            const response = await axios.get(backendUrl + '/api/user/profile', { headers: { token } });
            if (response.data.success) {
                setUser(response.data.user);
            } else {
                // If user not found, clear token and user state
                if (response.data.message === "User not found") {
                    localStorage.removeItem('token');
                    setToken('');
                    setUser(null);
                }
                throw new Error(response.data.message || 'Failed to fetch profile');
            }
        } catch (error) {
            console.log(error);
            // Re-throw so Profile page can handle it
            throw error;
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // Intentionally empty deps: getProductsData should run once on mount
    useEffect(() => {
        getProductsData();
    },[]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // Intentionally empty deps: should run once on mount to restore token and cart from localStorage
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
           if (!token) {
               setToken(storedToken); 
           }
           getUserCart(storedToken);
           fetchUserProfile(storedToken);
        }
    },[])
    
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
        setCartItems,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken,
        token,
        user,
        setUser,
        fetchUserProfile,
        isCartLoading

    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
