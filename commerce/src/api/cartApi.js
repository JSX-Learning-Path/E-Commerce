import { supabase } from "../js/main";

//Adding a product to the cart
export async function addToCart(user_id, product) {
  const { data: existingItem, error: existingItemError } = await supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("user_id", user_id)
    .eq("product_id", product.id)
    .maybeSingle();

  if (existingItemError) {
    throw new Error(existingItemError.message);
  }

  if (existingItem) {
    return updateCartItem(existingItem.id, existingItem.quantity + 1);
  }

  const { data, error } = await supabase
    .from("cart_items")
    .insert([{ user_id, product_id: product.id, quantity: 1 }])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
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

//Removing a cart item
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

//Updating the quantity of a cart item
export async function updateCartItem(id, quantity) {
  const { data, error } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

//Clearing the cart for a user

export async function clearCart(user_id) {
  const { data, error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", user_id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
