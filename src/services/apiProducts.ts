import { PAGE_LIMIT } from "@/constants/constants";
import { Enums } from "@/constants/database.types";
import supabase from "./supabase";
import { InsertTables } from "@/constants/types";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";

type getProductsParams = {
  type?: Enums<"product_type_enum"> | ""; // Filter by product type
  filter?: string; // Filter by exact product name
  search?: string; // Search for products by name
  page?: number; // Pagination number (default is 1)
};

// Function to fetch a paginated list of products with optional filters and search
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
    .select(`*, prices(size, price)`) // Fetch products along with their prices
    .range(from, to) // Paginate the results
    .order("created_at", { ascending: false }); // Order by creation date, newest first

  // Apply type filter if provided
  if (type) {
    query.eq("type", type);
  }

  // Apply exact name filter if provided
  if (filter) {
    query.eq("name", filter);
  }

  // Apply search filter (case-insensitive) if provided
  if (search) {
    query.ilike("name", `%${search}%`);
  }

  const { data, error } = await query;

  // Handle any errors that occur during the fetch
  if (error) {
    console.error(
      "Error fetching products with params:",
      { type, filter, search, page },
      error
    );
    throw new Error("There was an issue fetching products. Please try again.");
  }

  return data; // Return the fetched product data
}

// Function to fetch a single product by its ID
export async function getProduct(productId: number) {
  const { data, error } = await supabase
    .from("products")
    .select("*, prices(*)") // Fetch product along with all its price details
    .eq("id", productId)
    .single();

  // Handle any errors during the fetch
  if (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    throw new Error(
      "There was an issue fetching the product. Please try again."
    );
  }
  return data; // Return the fetched product data
}

// Function to delete a product by its ID
export async function deleteProduct(productId: number) {
  const { data, error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);

  // Handle any errors during deletion
  if (error) {
    console.error(`Error deleting product with ID ${productId}:`, error);
    throw new Error(
      "There was an issue deleting the product. Please try again."
    );
  }
  return data; // Return the result of the deletion
}

// Function to upload an image for a product to Supabase storage
async function uploadImage(
  type: string,
  imageName: string,
  imageData: string,
  productId: number
) {
  // Skip upload if image data is not a file path
  if (!imageData.startsWith("file")) return;

  // Read the image file as a base64 string
  const base64 = await FileSystem.readAsStringAsync(imageData, {
    encoding: FileSystem.EncodingType.Base64,
  });

  // Upload the image to Supabase storage
  const { error } = await supabase.storage
    .from("product-images")
    .upload(`${type}/${imageName}`, decode(base64), {
      contentType: "image/*", // Handle any image type
    });

  // Handle errors during the upload process
  if (error) {
    console.error(
      `Error uploading image ${imageName} for product ID ${productId}:`,
      error
    );
    // Delete the product if the image upload fails
    await supabase.from("products").delete().eq("id", productId);
    throw new Error(
      "There was an issue uploading the product image. Please try again."
    );
  }
}

// Function to update a product's details
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

  // Handle errors during the update process
  if (error) {
    console.error(`Error updating product with ID ${productId}:`, error);
    throw new Error(
      "There was an issue updating the product. Please try again."
    );
  }

  return data; // Return the updated product data
}

// Function to create a new product in the database
async function createProduct(productData: InsertTables<"products">) {
  const { data, error } = await supabase
    .from("products")
    .insert([productData])
    .select()
    .single();

  // Handle errors during the creation process
  if (error) {
    console.error("Error creating new product:", productData, error);
    throw new Error(
      "There was an issue creating the product. Please try again."
    );
  }

  return data; // Return the created product data
}

// Function to upsert (update or insert) product prices in the database
async function upsertPrices(
  prices: InsertTables<"prices">[],
  productId: number
) {
  const { data, error } = await supabase
    .from("prices")
    .upsert(
      prices.map((price) => ({
        ...price,
        product_id: productId, // Ensure the correct product ID is associated
      }))
    )
    .select();

  // Handle errors during the upsert process
  if (error) {
    console.error(`Error updating prices for product ID ${productId}:`, error);
    throw new Error(
      "There was an issue updating product prices. Please try again."
    );
  }

  return data; // Return the upserted price data
}

// Function to create a new product or update an existing one, including handling images and prices
export async function createOrUpdateProduct({
  newProduct,
  productId,
}: {
  newProduct: InsertTables<"products"> & {
    prices: InsertTables<"prices">[];
  };
  productId?: number;
}) {
  // Generate unique image names for square and portrait images
  const squareImageName = `${
    newProduct.name
  }_${Math.random()}_square`.replaceAll("/", "");
  const portraitImageName = `${
    newProduct.name
  }_${Math.random()}_portrait`.replaceAll("/", "");

  // Prepare the product data, handling image paths
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

  let result;

  // Update or create the product, then handle prices and images
  if (productId) {
    const product = await updateProduct(productId, productData);
    const prices = await upsertPrices(newProduct.prices, productId);
    result = { ...product, prices };
  } else {
    const product = await createProduct(productData);
    const prices = await upsertPrices(newProduct.prices, product.id);
    result = { ...product, prices };
  }

  // Upload images if they are new
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

  return result; // Return the final product data including images and prices
}
