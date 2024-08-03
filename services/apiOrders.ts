import { PAGE_LIMIT } from "@/constants/constants";
import supabase from "./supabase";
import {
  OrderStatusEnum,
  Tables,
  PricesType,
  InsertTables,
  CartType,
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
  prices: PricesType[];
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

// Type definition for parameters used in getOrders function
type GetOrdersParams = {
  status?: OrderStatusEnum;
  page?: number;
};

// Function to fetch orders from Supabase with optional status filtering and pagination
export async function getOrders({
  status,
  page = 1,
}: GetOrdersParams): Promise<TransformedOrder[]> {
  const from = (page - 1) * PAGE_LIMIT; // Calculate the starting index for pagination
  const to = from + PAGE_LIMIT - 1; // Calculate the ending index for pagination

  let query = supabase
    .from("orders")
    .select(`*, order_items(*, product:products(*))`)
    .range(from, to);

  if (status) {
    const statusMapping: { [key in OrderStatusEnum]: string[] } = {
      [OrderStatusEnum.ACTIVE]: ["PLACED", "CONFIRMED", "ON_THE_WAY"],
      [OrderStatusEnum.ARCHIVED]: ["DELIVERED", "CANCELLED"],
    };

    query = query.in("status", statusMapping[status]); // Filter orders by status
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
): { product_id: number; prices: PricesType[] }[] => {
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
