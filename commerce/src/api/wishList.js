import { supabase } from "../js/main";
// Getting all items in the wishlist for a user
export async function getWishList(user_id) {
  const { data, error } = await supabase
    .from("wish_list")
    .select("*")
    .eq("user_id", user_id);
  if (error) throw new Error(error.message);
  return data;
}
// Adding Item to wishlist
export async function addToWishList(user_id, product_id) {
  const { data, error } = await supabase
    .from("wish_list")
    .insert([{ user_id, product_id }]);
  if (error) throw new Error(error.message);
  return data;
}

// Removing Item from wishlist
export async function removeFromWishList(user_id, product_id) {
  const { data, error } = await supabase
    .from("wish_list")
    .delete()
    .eq("user_id", user_id)
    .eq("product_id", product_id);
  if (error) throw new Error(error.message);
  return data;
}

//Clearing the wishlist

export async function clearWishList(user_id) {
  const { data, error } = await supabase
    .from("wish_list")
    .delete()
    .eq("user_id", user_id);
  if (error) throw new Error(error.message);
  return data;
}
