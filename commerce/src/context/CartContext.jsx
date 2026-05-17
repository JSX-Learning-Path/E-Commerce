import { createContext, useContext, useEffect, useMemo, useState } from "react";

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
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    try {
      const storedCart = window.localStorage.getItem(CART_STORAGE_KEY); // connect with supabase ...
      setCartItems(storedCart ? JSON.parse(storedCart) : []);
    } catch (error) {
      console.error("Failed to load cart:", error);
      setCartItems([]);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [cartItems]);

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

  const removeFromCart = (productId)=>{
    setCartItems((currentItems)=>{
        return currentItems.filter((item) => item.id !== productId);
    })
  }

  const updateCartItemQuantity = (productId, nextQuantity)=>{
    if(nextQuantity <=0){
        removeFromCart(productId)
        return;
    }
    setCartItems((currentItems)=>{
        return currentItems.map((item)=>(
            item.id === productId ? {...item , quantity: nextQuantity} : item
        ));
    })
  }
  const clearCart = () => setCartItems([])

  const totals = useMemo(()=>{
    const itemsCount = cartItems.reduce((sum , item)=> sum + item.quantity , 0)
    const subTotal = cartItems.reduce((sum , item)=> sum + item.price * item.quantity , 0)
    const shipping = cartItems.length > 0 && subTotal <200 ? 9.99 :0
    const total = subTotal + shipping;
    return {itemsCount , subTotal , shipping , total}
  }, [cartItems])


  return (
    <CartContext.Provider value={{cartItems, addToCart , removeFromCart , updateCartItemQuantity , clearCart , ...totals}}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(){
    const context = useContext(CartContext);
    if(!context){
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}