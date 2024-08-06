import { PAGE_LIMIT } from "@/constants/constants";
import { Enums } from "@/constants/database.types";
import supabase, { SUPABASE_URL } from "./supabase";
import { InsertTables } from "@/constants/types";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";

type getProductsParams = {
  type?: Enums<"product_type_enum">;
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
    .range(from, to);

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

export async function createUpdateProduct({
  newProduct,
  productId,
}: {
  newProduct: InsertTables<"products"> & {
    prices: InsertTables<"prices">[];
  };
  productId?: number;
}) {
  const hasSquareImagePath = !newProduct.image_square?.startsWith?.("file");
  const hasPortraitImagePath = !newProduct.image_portrait?.startsWith?.("file");

  const squareImageName = `${
    newProduct.name
  }_${Math.random()}_square`.replaceAll("/", "");
  const portraitImageName = `${
    newProduct.name
  }_${Math.random()}_portrait`.replaceAll("/", "");

  const squareImagePath = hasSquareImagePath
    ? newProduct.image_square
    : squareImageName;

  const portraitImagePath = hasPortraitImagePath
    ? newProduct.image_portrait
    : portraitImageName;

  try {
    let data;
    if (productId) {
      // Update existing product
      const { data: updatedData, error } = await supabase
        .from("products")
        .update({
          name: newProduct.name,
          type: newProduct.type,
          description: newProduct.description,
          ingredients: newProduct.ingredients,
          roasted: newProduct.roasted,
          special_ingredient: newProduct.special_ingredient,
          image_portrait: portraitImagePath,
          image_square: squareImagePath,
        })
        .eq("id", productId)
        .select()
        .single();

      if (error) throw error;
      data = updatedData;
    } else {
      // Create new product
      const { data: insertedData, error } = await supabase
        .from("products")
        .insert([
          {
            name: newProduct.name,
            type: newProduct.type,
            description: newProduct.description,
            ingredients: newProduct.ingredients,
            roasted: newProduct.roasted,
            special_ingredient: newProduct.special_ingredient,
            image_portrait: portraitImagePath,
            image_square: squareImagePath,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      data = insertedData;
    }

    // Handle image uploads if necessary
    if (!hasSquareImagePath) {
      await uploadImage(
        "square",
        squareImageName,
        newProduct.image_square,
        data.id
      );
    }
    if (!hasPortraitImagePath) {
      await uploadImage(
        "portrait",
        portraitImageName,
        newProduct.image_portrait,
        data.id
      );
    }

    return {
      product: data,
      prices: newProduct.prices.map((price) => ({
        ...price,
        product_id: data.id,
      })),
    };
  } catch (error) {
    console.error("Error creating/updating product:", error);
    throw new Error("Product could not be created or updated");
  }
}

async function uploadImage(
  type: "square" | "portrait",
  imageName: string,
  imageData: string,
  productId: number
) {
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
    console.error(`Error uploading ${type} image:`, error);
    throw new Error(
      `Product ${type} image could not be uploaded and the product was not created`
    );
  }
}
