import { PAGE_LIMIT } from "@/constants/constants";
import { Enums } from "@/constants/database.types";
import supabase, { SUPABASE_URL } from "./supabase";
import { InsertTables } from "@/constants/types";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";

type getProductsParams = {
  type?: Enums<"product_type_enum"> | "";
  filter?: string;
  search?: string;
  page?: number;
};
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getProducts({
  type,
  filter,
  search,
  page = 1,
}: getProductsParams) {
  const from = (page - 1) * PAGE_LIMIT;
  const to = from + PAGE_LIMIT - 1;

  const query = supabase
    .from("products")
    .select(`*, prices(size, price)`)
    .range(from, to)
    .order("created_at", { ascending: false });

  if (type) {
    query.eq("type", type);
  }

  if (filter) {
    query.eq("name", filter);
  }
  if (search) {
    query.ilike("name", `%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Products could not be loaded");
  }

  return data;
}

export async function getProduct(productId: number) {
  // Fetch product data
  const { data, error } = await supabase
    .from("products")
    .select("*, prices(*)")
    .eq("id", productId)
    .single();

  // Handle product fetch error
  if (error) {
    console.error(error);
    throw new Error("Product not found");
  }
  return data;
}

export async function deleteProduct(productId: number) {
  // Delete product
  const { data, error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);

  // Handle product delete error
  if (error) {
    console.error(error);
    throw new Error("Product could not be deleted");
  }
  return data;
}

// Helper function to upload images to Supabase
async function uploadImage(
  type: string,
  imageName: string,
  imageData: string,
  productId: number
) {
  if (!imageData.startsWith("file")) return;
  const base64 = await FileSystem.readAsStringAsync(imageData, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const { error } = await supabase.storage
    .from("product-images")
    .upload(`${type}/${imageName}`, decode(base64), {
      contentType: "image/*",
    });

  if (error) {
    await supabase.from("products").delete().eq("id", productId);
    throw new Error(`Failed to upload ${type} image`);
  }
}

// Helper function to update an existing product
async function updateProduct(
  productId: number,
  productData: InsertTables<"products">
) {
  const { data, error } = await supabase
    .from("products")
    .update(productData)
    .eq("id", productId)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update product: ${error.message}`);
  }

  return data;
}

// Helper function to create a new product
async function createProduct(productData: InsertTables<"products">) {
  const { data, error } = await supabase
    .from("products")
    .insert([productData])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create product: ${error.message}`);
  }

  return data;
}

// Helper function to upsert prices for a product
async function upsertPrices(prices:InsertTables<'prices'>[], productId:number) {
  const { data, error } = await supabase
    .from("prices")
    .upsert(
      prices.map((price) => ({
        ...price,
        product_id: productId,
      }))
    )
    .select();

  if (error) {
    throw new Error(`Failed to upsert prices: ${error.message}`);
  }

  return data;
}

// Main function to create or update a product
export async function createOrUpdateProduct({
  newProduct,
  productId,
}: {
  newProduct: InsertTables<"products"> & {
    prices: InsertTables<"prices">[];
  };
  productId?: number;
}) {
  // Generate unique names for images if needed
  const squareImageName = `${
    newProduct.name
  }_${Math.random()}_square`.replaceAll("/", "");
  const portraitImageName = `${
    newProduct.name
  }_${Math.random()}_portrait`.replaceAll("/", "");

  // Determine image paths
  const productData = {
    name: newProduct.name,
    type: newProduct.type,
    description: newProduct.description,
    ingredients: newProduct.ingredients,
    roasted: newProduct.roasted,
    special_ingredient: newProduct.special_ingredient,
    image_portrait: newProduct.image_portrait.startsWith("file")
      ? portraitImageName
      : newProduct.image_portrait,
    image_square: newProduct.image_square.startsWith("file")
      ? squareImageName
      : newProduct.image_square,
  };

  try {
    let result;

    if (productId) {
      // Update existing product
      const product = await updateProduct(productId, productData);
      const prices = await upsertPrices(newProduct.prices, productId);
      result = { ...product, prices };
    } else {
      // Create new product
      const product = await createProduct(productData);
      const prices = await upsertPrices(newProduct.prices, product.id);
      result = { ...product, prices };
    }

    // Handle image uploads if necessary
    if (newProduct.image_square.startsWith("file")) {
      await uploadImage(
        "square",
        squareImageName,
        newProduct.image_square,
        result.id
      );
    }
    if (newProduct.image_portrait.startsWith("file")) {
      await uploadImage(
        "portrait",
        portraitImageName,
        newProduct.image_portrait,
        result.id
      );
    }

    return result;
  } catch (error) {
    console.error("Error creating/updating product:", error);
    throw new Error("Product could not be created or updated");
  }
}
