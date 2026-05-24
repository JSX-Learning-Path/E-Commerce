import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  addToCart as apiAddToCart,
  getCartItems as apiGetCartItems,
  removeFromCart as apiRemoveFromCart,
  updateCartItem as apiUpdateCartItem,
  clearCart as apiClearCart,
} from "../api/cartApi";
import { useAuth } from "./AuthContext";
import { fetchProducts } from "../api/FakeApi";

const CartContext = createContext();
const CART_STORAGE_KEY = "commerce-cart";

function toCartItem(product) {
  return {
    id: product.id,
    product_id: product.id,
    title: product.title,
    thumbnail: product.thumbnail,
    price: Number(product.price) || 0,
    category: product.category || "",
    brand: product.brand || "",
    quantity: 1,
  };
}

function getProductId(cartItem) {
  return cartItem.product_id ?? cartItem.id;
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
    fetchProducts()
      .then(setProducts)
      .catch(() => setProducts([]));
  }, []);

  const addToCartLocally = (product) => {
    const cartItem = toCartItem(product);

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => String(getProductId(item)) === String(cartItem.product_id),
      );

      if (existingItem) {
        return currentItems.map((item) =>
          String(getProductId(item)) === String(cartItem.product_id)
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [cartItem, ...currentItems];
    });
  };

  const removeFromCartLocally = (productId) => {
    setCartItems((currentItems) => {
      return currentItems.filter(
        (item) => String(getProductId(item)) !== String(productId),
      );
    });
  };

  const updateCartItemQuantityLocally = (productId, nextQuantity) => {
    if (nextQuantity <= 0) {
      removeFromCartLocally(productId);
      return;
    }

    setCartItems((currentItems) => {
      return currentItems.map((item) =>
        String(getProductId(item)) === String(productId)
          ? { ...item, quantity: nextQuantity }
          : item,
      );
    });
  };
  const clearCart = () => setCartItems([]);

  const mergedCartItems = useMemo(() => {
    return cartItems.map((cartItem) => {
      const productId = getProductId(cartItem);
      const product = products.find((p) => String(p.id) === String(productId));

      return {
        ...product,
        ...cartItem,
        id: productId,
        product_id: productId,
        cart_item_id: cartItem.cart_item_id ?? cartItem.id,
        title: cartItem.title || product?.title || "",
        thumbnail: cartItem.thumbnail || product?.thumbnail || "",
        price: Number(cartItem.price ?? product?.price ?? 0),
        category: cartItem.category || product?.category || "",
        brand: cartItem.brand || product?.brand || "",
        quantity: Number(cartItem.quantity) || 1,
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
    addToCartLocally(product);

    try {
      await apiAddToCart(user.id, product);
      const updated = await apiGetCartItems(user.id);
      setCartItems(updated);
    } catch (error) {
      console.error("Failed to add cart item:", error);
      const updated = await apiGetCartItems(user.id).catch(() => []);
      setCartItems(updated);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    if (!user) return;
    const previousItems = cartItems;
    removeFromCartLocally(productId);

    const item = previousItems.find(
      (currentItem) => String(getProductId(currentItem)) === String(productId),
    );
    if (!item) return;

    try {
      await apiRemoveFromCart(item.id);
    } catch (error) {
      console.error("Failed to remove cart item:", error);
      setCartItems(previousItems);
    }
  };

  const handleUpdateCartItemQuantity = async (productId, nextQuantity) => {
    if (!user) return;
    const previousItems = cartItems;
    updateCartItemQuantityLocally(productId, nextQuantity);

    const item = previousItems.find(
      (currentItem) => String(getProductId(currentItem)) === String(productId),
    );
    if (!item) return;

    try {
      if (nextQuantity <= 0) {
        await apiRemoveFromCart(item.id);
        return;
      }

      await apiUpdateCartItem(item.id, nextQuantity);
    } catch (error) {
      console.error("Failed to update cart quantity:", error);
      setCartItems(previousItems);
    }
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
