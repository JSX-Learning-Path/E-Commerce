export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
}
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { useAuth } from "../context/AuthContext";

const OrderContext = createContext();
const ORDERS_STORAGE_KEY = "commerce_orders";

function readStoreOrders() {
  try {
    const rawValue = window.localStorage.getItem(ORDERS_STORAGE_KEY);
    return rawValue ? JSON.parse(rawValue) : {};
  } catch {
    return {};
  }
}

function createOrderNumber() {
  return `Order-${Date.now().toString(36).toUpperCase()}`;
}

export function OrderProvider({ children }) {
  const { user } = useAuth();
  const [ordersByUser, setOrdersByUser] = useState(() => readStoreOrders());

  useEffect(() => {
    try {
      window.localStorage.setItem(
        ORDERS_STORAGE_KEY,
        JSON.stringify(ordersByUser),
      );
    } catch {
      console.error("Failed to save orders to localStorage");
    }
  }, [ordersByUser]);

  const orders = useMemo(() => {
    if (!user?.id) return [];
    return ordersByUser[user.id] || [];
  }, [user?.id, ordersByUser]);

  const createOrder = (items, checkoutData, totals) => {
    if (!user?.id) return;
    const nextOrder = {
      id: `${user.id}-${Date.now()}`,
      orderNumber: createOrderNumber(),
      status: "Processing",
      paymentMethod: checkoutData.paymentMethod,
      customer: {
        fullName: checkoutData.fullName,
        phone: checkoutData.phone,
      },
      shippingAddress: {
        city: checkoutData.city,
        address: checkoutData.address,
        postalCode: checkoutData.postalCode,
      },
      items: items.map((item) => ({
        id: item.id,
        title: item.title,
        thumbnail: item.thumbnail,
        quantity: item.quantity,
        price: Number(item.price),
        brand: item.brand,
      })),
      total: {
        itemsCount: Number(totals.itemsCount || 0),
        subTotal: Number(totals.subTotal || 0),
        shipping: Number(totals.shipping || 0),
        total: Number(totals.total || 0),
      },
    };
    setOrdersByUser((currentOrdersByUser) => {
      const userOrders = currentOrdersByUser[user.id] || [];
      return {
        ...currentOrdersByUser,
        [user.id]: [...userOrders, nextOrder],
      };
    });
    return nextOrder;
  };

  const value = useMemo(
    () => ({
      orders,
      ordersCount: orders.length,
      createOrder,
    }),
    [orders],
  );
  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}

export const userOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("userOrders must be used within an OrderProvider");
  }
  return context.orders;
};

export default OrderProvider;
