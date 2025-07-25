"use client";
import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { api } from "@/data/api";

const ServerContext = createContext();

export const useService = () => {
  return useContext(ServerContext);
};

export const ServerProvider = ({ children }) => {
  const [merchantId, setMerchantId] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("merchantId") || null;
    }
    return null;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("merchantid");

    if (id) {
      setMerchantId(id);
      localStorage.setItem("merchantId", id);
    } else if (!merchantId) {
      const storedId = localStorage.getItem("merchantId");
      if (storedId) {
        setMerchantId(storedId);
      }
    }
  }, [merchantId]);

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [sliders, setSliders] = useState([]);
  const [systemInfo, setSystemInfo] = useState({});
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState(null);

  // wishlist
  const [wishlist, setWishlist] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(true);
  const [wishlistError, setWishlistError] = useState(null);

  // order history
  const [orderHistory, setOrderHistory] = useState([]);
  const [orderHistoryLoading, setOrderHistoryLoading] = useState(true);

  //order details
  const [orderDetails, setOrderDetails] = useState({});
  const [orderDetailsLoading, setOrderDetailsLoading] = useState(true);

  useEffect(() => {
    if (isLoading && merchantId) {
      Promise.all([
        axios.get(`${api.url}/categories?merchant=${merchantId}`),
        axios.get(`${api.url}/products?merchant=${merchantId}`),
        axios.get(`${api.url}/sliders?merchant=${merchantId}`),
        axios.get(`${api.url}/systeminfo/merchant/${merchantId}`),
      ])
        .then(([categories, products, sliders, systemInfo, orderHistory]) => {
          setCategories(categories.data.data);
          setProducts(products.data.data);
          setSliders(sliders.data.data);
          setSystemInfo(systemInfo.data.data);
          setOrderHistory(orderHistory.data.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch initial data:", err);
          setError(err.response?.data?.message || "Failed to fetch data");
          setIsLoading(false);
        });
    }
  }, [isLoading, merchantId]);

  const fetchOrderHistory = async () => {
    if (orderHistoryLoading) {
      if (user) {
        const response = await axios.get(
          `${api.url}/orders/user?userid=${user._id}&merchantid=${merchantId}`
        );
        setOrderHistory(response.data.data);
        setOrderHistoryLoading(false);
      }
    }
  };

  const fetchOrderDetails = async (orderId) => {
    const response = await axios.get(`${api.url}/orders/${orderId}`);
    setOrderDetails(response.data.data);
    setOrderDetailsLoading(false);
  };

  const login = async (email, password) => {
    try {
      setAuthLoading(true);
      setAuthError(null);
      const response = await axios.post(`${api.url}/user/login`, {
        emailphone: email,
        password,
      });
      console.log(response.data);
      setUser(response.data.user);
      // Persist user info to localStorage for future sessions
      localStorage.setItem("user", JSON.stringify(response.data.user));

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
      }
      return response.data;
    } catch (err) {
      setAuthError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setAuthLoading(true);
      setAuthError(null);
      const response = await axios.post(`${api.url}/user/register`, {
        ...userData,
        merchant: merchantId,
      });
    
      setUser(response.data.data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
      }
      return response.data;
    } catch (err) {
      setAuthError(err.response?.data?.message || "Registration failed");
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    // Also clear cached user data
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];

    // Clear wishlist state on logout
    setWishlist([]);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    // Restore user info from localStorage if available
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (_) {
        // Ignore JSON parsing errors
      }
    }
  }, []);

  // Fetch wishlist omnoh wishlist
  // useEffect(() => {
  //   const fetchWishlist = async () => {
  //     if (!user) return;
  //     try {
  //       // setWishlistLoading(true);
  //       const response = await axios.get(
  //         `${api.url}/wishlist?user=${
  //           user?._id || user?.id
  //         }&merchant=${merchantId}`
  //       );

  //       const items = response.data.data || [];

  //       const ids = items.map((it) =>
  //         typeof it === "object" ? it.product || it._id || it.id : it
  //       );
  //       setWishlist(ids);
  //     } catch (err) {   
  //       console.error("Failed to fetch wishlist", err);
  //       setWishlistError(
  //         err.response?.data?.message || "Failed to fetch wishlist"
  //       );
  //     } finally {
  //       setWishlistLoading(false);
  //     }
  //   };
  //   if (wishlistLoading) {
  //     fetchWishlist();
  //   }
  // }, [wishlistLoading]);
   
  //minii oorchilson wishlist
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) {
        setWishlistLoading(false);
        return;
      }
      
      try {
        setWishlistLoading(true); // Set loading at the start
        const response = await axios.get(
          `${api.url}/wishlist?user=${
            user?._id || user?.id
          }&merchant=${merchantId}`
        );
  
        const items = response.data.data || [];
        const ids = items.map((it) =>
          typeof it === "object" ? it.product || it._id || it.id : it
        );
        setWishlist(ids);
      } catch (err) {   
        console.error("Failed to fetch wishlist", err);
        setWishlistError(
          err.response?.data?.message || "Failed to fetch wishlist"
        );
      } finally {
        setWishlistLoading(false);
      }
    };
  
    fetchWishlist();
  }, [user, merchantId]); // Depend on user and merchantId instead

  const addToWishlist = async (productId) => {
    if (!user) {
      const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
      if (!stored.includes(productId)) {
        const next = [...stored, productId];
        localStorage.setItem("wishlist", JSON.stringify(next));
        setWishlist(next);
      }
      return;
    }

    try {
      await axios.post(`${api.url}/wishlist`, {
        product: productId,
        user: user?._id || user?.id,
        merchant: merchantId,
      });
      setWishlist((prev) =>
        prev.includes(productId) ? prev : [...prev, productId]
      );
    } catch (err) {
      console.error("Failed to add to wishlist", err);
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!user) {
      const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
      const next = stored.filter((id) => id !== productId);
      localStorage.setItem("wishlist", JSON.stringify(next));
      setWishlist(next);
      return;
    }

    try {
      await axios.delete(`${api.url}/wishlist/${productId}`);
      setWishlist((prev) => prev.filter((id) => id !== productId));
    } catch (err) {
      console.error("Failed to remove from wishlist", err);
    }
  };

  // Create new order
  const createOrder = async (orderData) => {
    try {
      setOrderLoading(true);
      setOrderError(null);

      const payload = {
        ...orderData,
        merchant: merchantId,
        user: user?._id || user?.id,
      };
      const response = await axios.post(`${api.url}/orders`, payload);
      return response.data;
    } catch (err) {
      setOrderError(err.response?.data?.message || "Failed to create order");
      throw err;
    } finally {
      setOrderLoading(false);
    }
  };

  return (
    <ServerContext.Provider
      value={{
        merchantId,
        categories,
        products,
        sliders,
        systemInfo,
        isLoading,
        error,
        user,
        authLoading,
        authError,
        login,
        register,
        logout,
        // wishlist
        wishlist,
        wishlistLoading,
        wishlistError,
        addToWishlist,
        removeFromWishlist,
        orderLoading,
        orderError,
        orderHistory,
        createOrder,
        fetchOrderHistory,
        orderHistoryLoading,
        orderDetails,
        orderDetailsLoading,
        fetchOrderDetails,
        refresh: () => setIsLoading(true),
      }}
    >
      {children}
    </ServerContext.Provider>
  );
};