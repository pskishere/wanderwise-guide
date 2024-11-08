import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/types/product";

export const fetchProducts = async (
  category?: string,
  cursor = 0,
  limit = 10
): Promise<{ items: Product[]; nextCursor?: number }> => {
  let query = supabase
    .from("products")
    .select(`
      *,
      favorites (count)
    `)
    .range(cursor, cursor + limit - 1)
    .order("created_at", { ascending: false });

  if (category) {
    query = query.contains("tags", [category]);
  }

  const { data: products, error } = await query;

  if (error) throw error;

  if (!products) return { items: [] };

  const items = products.map((product): Product => ({
    id: product.id,
    title: product.title,
    price: product.price.toString(),
    originalPrice: product.original_price?.toString(),
    description: product.description || "",
    images: product.images,
    specs: [],
    tags: [],
    shop: {
      id: 1,
      name: "Official Store",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=shop"
    }
  }));

  const nextCursor = products.length === limit ? cursor + limit : undefined;

  return {
    items,
    nextCursor
  };
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
  const { data: product, error } = await supabase
    .from("products")
    .select(`
      *,
      favorites (count)
    `)
    .eq("id", id)
    .single();

  if (error || !product) return null;

  return {
    id: product.id,
    title: product.title,
    price: product.price.toString(),
    originalPrice: product.original_price?.toString(),
    description: product.description || "",
    images: product.images,
    specs: [],
    tags: [],
    shop: {
      id: 1,
      name: "Official Store",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=shop"
    }
  };
};