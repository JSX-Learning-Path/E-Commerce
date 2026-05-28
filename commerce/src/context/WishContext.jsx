import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import {
  addToWishList as apiAddToWishList,
  getWishList as apiGetWishList,
  removeFromWishList as apiRemoveFromWishList,
  clearWishList as apiClearWishList,
} from "../api/wishList";
import { useAuth } from "./AuthContext";
import { fetchProducts } from "../api/FakeApi";

const WishListContext = createContext();

export function WishListProvider({ children }) {
  const { user } = useAuth();
  // console.log("User from useAuth:", user);
  const [wishListItemsRaw, setWishListItemsRaw] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        // console.log("Products from API:", data);
        setProducts(data);
      })
      .catch(() => setProducts([]));
  }, []);

  useEffect(() => {
    console.log("Current user id:", user?.id);
    if (user) {
      apiGetWishList(user.id).then((data) => {
        console.log("Wish list items from Supabase:", data);
        setWishListItemsRaw(data);
      });
    } else {
      setWishListItemsRaw([]);
    }
  }, [user]);

  useMemo(() => {
    const merged = wishListItemsRaw.map((item) => {
      const product = products.find(
        (p) => String(p.id) === String(item.product_id),
      );
      if (!product) {
        console.log("No product found for wishlist item:", item);
      }
      return { ...item, ...product };
    });
    // console.log("Merged wish list items:", merged);
    return merged;
  }, [wishListItemsRaw, products]);

  const wishListItems = useMemo(() => {
    return wishListItemsRaw.map((item) => {
      const product = products.find(
        (p) => String(p.id) === String(item.product_id),
      );
      return { ...item, ...product };
    });
  }, [wishListItemsRaw, products]);

  const addToWishList = async (product) => {
    await apiAddToWishList(user.id, product.id);
    const updated = await apiGetWishList(user.id);
    setWishListItemsRaw(updated);
  };

  const removeFromWishList = async (productId) => {
    await apiRemoveFromWishList(user.id, productId);
    const updated = await apiGetWishList(user.id);
    setWishListItemsRaw(updated);
  };

  const clearWishList = async () => {
    await apiClearWishList(user.id);
    setWishListItemsRaw([]);
  };

  const toggleWishList = async (product) => {
    if (
      wishListItems.some(
        (item) => String(item.product_id) === String(product.id),
      )
    ) {
      await removeFromWishList(product.id);
    } else {
      await addToWishList(product);
    }
  };

  const value = useMemo(
    () => ({
      wishListItems,
      wishListCount: wishListItems.length,
      addToWishList,
      removeFromWishList,
      clearWishList,
      toggleWishList,
      isInWishList: (productId) =>
        wishListItems.some(
          (item) => String(item.product_id) === String(productId),
        ),
    }),
    [wishListItems],
  );

  return (
    <WishListContext.Provider value={value}>
      {children}
    </WishListContext.Provider>
  );
}

export function useWishList() {
  const context = useContext(WishListContext);
  if (!context) {
    throw new Error("useWishList must be used within a WishListProvider");
  }
  return context;
}
