import { supabase } from "../js/main";

//Adding a product to the cart
export async function addToCart(user_id, product) {
  const { data, error } = await supabase
    .from("cart_items")
    .insert([{ user_id, product_id: product.id, quantity: 1 }]);
  if (error) {
    console.error("Error adding:", error);
  } else {
    console.log("Added:", data);
  }
  return data;
}

//Getting the cart items for user
export async function getCartItems(user_id) {
  const { data, error } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", user_id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

//Updating the quantity of a cart item
export async function removeFromCart(id) {
  const { data, error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

//Clearing the cart for a user

export async function clearCart(user_id) {
  const { data, error } = await supabase
    .delete()
    .from("cart_items")
    .eq("user_id", user_id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
