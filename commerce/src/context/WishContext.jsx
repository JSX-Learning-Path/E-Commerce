import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";

const WishListContext = createContext();

const WISHLIST_STORAGE_KEY = "commerce-wishlist";

export function WhishListProvider({ children }) {
  const [wishListItems, setWishListItems] = useState(() => {
    try {
      const storedItems = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
      return storedItems ? JSON.parse(storedItems) : [];
    } catch (error) {
      console.error("Failed to load wishlist items:", error);
      return [];
    }
  });
  useEffect(() => {
    try {
      window.localStorage.setItem(
        WISHLIST_STORAGE_KEY,
        JSON.stringify(wishListItems),
      );
    } catch (error) {
      console.error("Failed to save wishlist items:", error);
    }
  }, [wishListItems]);

  const addToWishList = (product) => {
    setWishListItems((currentItems) => {
      const exists = currentItems.some(
        (item) => String(item.id) === String(product.id),
      );
      if (exists) return currentItems;
      return [
        {
          id: product.id,
          title: product.title,
          price: Number(product.price) || 0,
          thumbnail: product.thumbnail || "",
          category: product.category || "",
          brand: product.brand || "",
          rating: product.rating || 0,
        },
        ...currentItems,
      ];
    });
  };
  const removeFromWishList = (productId) => {
    setWishListItems((currentItems) =>
      currentItems.filter((item) => String(item.id) !== String(productId)),
    );
  };

  const clearWishList = () => setWishListItems([]);

  const toggleWishList = (product) => {
    setWishListItems((currentItems) => {
      const exists = currentItems.some(
        (item) => String(item.id) === String(product.id),
      );
      if (exists) {
        return currentItems.filter(
          (item) => String(item.id) !== String(product.id),
        );
      }
      return [
        {
          id: product.id,
          title: product.title,
          price: Number(product.price) || 0,
          thumbnail: product.thumbnail || "",
          category: product.category || "",
          brand: product.brand || "",
          rating: product.rating || 0,
        },
        ...currentItems,
      ];
    });
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
        wishListItems.some((item) => String(item.id) === String(productId)),
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
    throw new Error("useWishlist must be used within a WishListProvider");
  }
  return context;
}
