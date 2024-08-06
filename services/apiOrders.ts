import { PAGE_LIMIT } from "@/constants/constants";
import supabase from "./supabase";
import {
  Tables,
  PriceType,
  InsertTables,
  CartType,
  Enums,
} from "@/constants/types";

// Type definition for an OrderItem, which includes product details
type OrderItem = Tables<"order_items"> & {
  product: Tables<"products">;
};

// Type definition for TransformedOrderItem, which omits certain properties and adds a prices array
type TransformedOrderItem = Omit<
  OrderItem,
  "size" | "price" | "quantity" | "total_price"
> & {
  product_id: number;
  product: Tables<"products">;
  prices: PriceType[];
};

// Type definition for Order, which includes an array of OrderItems
type Order = Tables<"orders"> & {
  order_items: OrderItem[];
};

// Type definition for TransformedOrder, which includes transformed order items
export type TransformedOrder = Omit<Order, "order_items"> & {
  order_items: TransformedOrderItem[];
};

// Function to transform raw order data into a more structured format
function transformOrderData(data: Order[]): TransformedOrder[] {
  return data.map((order) => {
    const productMap = new Map<number, TransformedOrderItem>();

    order.order_items.forEach((item) => {
      const {
        product_id,
        size,
        price,
        quantity,
        total_price,
        product,
        ...rest
      } = item;

      if (!productMap.has(product_id)) {
        productMap.set(product_id, {
          ...rest,
          product_id,
          product,
          prices: [],
        });
      }

      productMap
        .get(product_id)!
        .prices.push({ size, price, quantity, total_price });
    });

    return {
      ...order,
      order_items: Array.from(productMap.values()),
    };
  });
}

// Function to fetch orders from Supabase with optional status filtering and pagination
export async function getOrders({
  status,
  page = 1,
}: {
  status?: Enums<"order_status_enum"> | Enums<"order_status_enum">[] | "";
  page?: number;
}): Promise<TransformedOrder[]> {
  const from = (page - 1) * PAGE_LIMIT;
  const to = from + PAGE_LIMIT - 1;

  let query = supabase
    .from("orders")
    .select(`*, order_items(*, product:products(*))`)
    .range(from, to)
    .order("order_date", { ascending: false });

  if (status) {
    query = Array.isArray(status)
      ? query.in("status", status)
      : query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Orders could not be loaded"); // Throw an error if fetching orders fails
  }

  return transformOrderData(data as Order[]); // Transform and return the order data
}

// Function to fetch a single order by its ID
export async function getOrder(
  orderId: number
): Promise<TransformedOrder | null> {
  const { data, error } = await supabase
    .from("orders")
    .select(`*, order_items(*, product:products(*))`)
    .eq("id", orderId)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Order not found"); // Throw an error if fetching the order fails
  }

  return transformOrderData([data as Order])[0]; // Transform and return the single order data
}

// Function to transform cart data into a format suitable for order items
const transformCartToOrderData = (
  cart: CartType
): { product_id: number; prices: PriceType[] }[] => {
  return cart.items.map((item) => ({
    product_id: item.product.id,
    prices: item.prices.map((price) => ({
      size: price.size,
      price: price.price,
      quantity: price.quantity,
      total_price: price.total_price,
    })),
  }));
};

// Function to create a new order in Supabase
export const createOrder = async ({
  cart,
  userId,
}: {
  cart: CartType;
  userId: string;
}): Promise<{
  order: Tables<"orders">;
  orderItems: InsertTables<"order_items">[];
}> => {
  // Insert a new order record into the orders table
  const { data: order, error } = await supabase
    .from("orders")
    .insert([
      {
        user_id: userId,
        total_price: parseFloat(cart.total_price.toString()), // Ensure the total_price is a number
        status: "CONFIRMED",
      },
    ])
    .select()
    .single();

  // Throw an error if order creation fails
  if (error) {
    console.error(error);
    throw new Error("Order creation failed");
  }

  // Transform cart items to order items data
  const transFormedOrderItems = transformCartToOrderData(cart);

  // Prepare the order items for insertion
  const orderItems = transFormedOrderItems.flatMap((item) =>
    item.prices.map((price) => ({
      order_id: order.id,
      product_id: item.product_id,
      size: price.size,
      price: price.price,
      quantity: price.quantity,
      total_price: price.total_price,
    }))
  );

  return { order, orderItems }; // Return the created order and its items
};

export const updateOrderStatus = async ({
  orderId,
  status,
}: {
  orderId: number;
  status: Enums<"order_status_enum">;
}) => {
  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId);

  if (error) {
    console.error(error);
    throw new Error("Order status could not be updated");
  }

  return data;
};
