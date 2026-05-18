import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  addToCart as apiAddToCart,
  getCartItems as apiGetCartItems,
  removeFromCart as apiRemoveFromCart,
  clearCart as apiClearCart,
} from "../api/cartApi";
import { useAuth } from "./AuthContext";
import { fetchProducts } from "../api/FakeApi";

const CartContext = createContext();
const CART_STORAGE_KEY = "commerce-cart";

function toCartItem(product) {
  return {
    id: product.id,
    title: product.title,
    thumbnail: product.thumbnail,
    price: Number(product.price) || 0,
    category: product.category || "",
    brand: product.brand || "",
    quantity: 1,
  };
}

export function CartProvider({ children }) {
  const { user } = useAuth(); // вземи user от контекста
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (user) {
      apiGetCartItems(user.id)
        .then(setCartItems)
        .catch(() => setCartItems([]));
    } else {
      setCartItems([]);
    }
  }, [user]);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [cartItems]);

  useEffect(() => {
    fetchProducts().then(setProducts).catch(() => setProducts([]));
  }, []);

  const addToCart = (product) => {
    const cartItem = toCartItem(product);

    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === cartItem.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === cartItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [cartItem, ...currentItems];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.id !== productId);
    });
  };

  const updateCartItemQuantity = (productId, nextQuantity) => {
    if (nextQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((currentItems) => {
      return currentItems.map((item) =>
        item.id === productId ? { ...item, quantity: nextQuantity } : item,
      );
    });
  };
  const clearCart = () => setCartItems([]);

  const mergedCartItems = useMemo(() => {
    return cartItems.map((cartItem) => {
      // Ако cartItem има само product_id и quantity
      const product = products.find(
        (p) => String(p.id) === String(cartItem.product_id),
      );
      return {
        ...cartItem,
        ...product, // добавя title, price, thumbnail и т.н.
      };
    });
  }, [cartItems, products]);

  const totals = useMemo(() => {
    const itemsCount = mergedCartItems.reduce(
      (sum, item) => sum + (item.quantity || 0),
      0,
    );
    const subTotal = mergedCartItems.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
      0,
    );
    const shipping = mergedCartItems.length > 0 && subTotal < 200 ? 9.99 : 0;
    const total = subTotal + shipping;
    return { itemsCount, subTotal, shipping, total };
  }, [mergedCartItems]);

  const handleAddToCart = async (product) => {
    if (!user) return;
    await apiAddToCart(user.id, product);
    const updated = await apiGetCartItems(user.id);
    setCartItems(updated);
  };

  const handleRemoveFromCart = async (productId) => {
    if (!user) return;
    // намери cartItem по productId
    const item = cartItems.find((i) => i.product_id === productId);
    if (!item) return;
    await apiRemoveFromCart(item.id);
    const updated = await apiGetCartItems(user.id);
    setCartItems(updated);
  };

  const handleUpdateCartItemQuantity = async (productId, nextQuantity) => {
    if (!user) return;
    const item = cartItems.find((i) => i.product_id === productId);
    if (!item) return;
    if (nextQuantity <= 0) {
      await apiRemoveFromCart(item.id);
    } else {
      await updateCartItem(item.id, nextQuantity);
    }
    const updated = await apiGetCartItems(user.id);
    setCartItems(updated);
  };

  const handleClearCart = async () => {
    if (!user) return;
    await apiClearCart(user.id);
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: mergedCartItems,
        addToCart: handleAddToCart,
        removeFromCart: handleRemoveFromCart,
        updateCartItemQuantity: handleUpdateCartItemQuantity,
        clearCart: handleClearCart,
        ...totals,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
