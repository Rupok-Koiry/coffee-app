import { PAGE_LIMIT } from "@/constants/constants";
import supabase from "./supabase";
import { Tables, PriceType, CartType, Enums } from "@/constants/types";

type OrderItem = Tables<"order_items"> & {
  product: Tables<"products">;
};

type TransformedOrderItem = Omit<
  OrderItem,
  "size" | "price" | "quantity" | "total_price"
> & {
  product_id: number;
  product: Tables<"products">;
  prices: PriceType[];
};

type Order = Tables<"orders"> & {
  order_items: OrderItem[];
};

export type TransformedOrder = Omit<Order, "order_items"> & {
  order_items: TransformedOrderItem[];
};

// Transform raw order data into a more usable format
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

// Fetch paginated orders with optional filters
export async function fetchOrders({
  userId,
  status,
  page = 1,
}: {
  userId?: string;
  status?: Enums<"order_status_enum"> | Enums<"order_status_enum">[] | "";
  page?: number;
}): Promise<TransformedOrder[]> {
  const from = (page - 1) * PAGE_LIMIT;
  const to = from + PAGE_LIMIT - 1;

  let query = supabase
    .from("orders")
    .select(`*, order_items(*, product:products(*))`)
    .range(from, to)
    .order("created_at", { ascending: false });

  if (status) {
    query = Array.isArray(status)
      ? query.in("status", status)
      : query.eq("status", status);
  }
  if (userId) {
    query = query.eq("user_id", userId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching orders:", { userId, status, page }, error);
    throw new Error("Orders could not be loaded. Please try again.");
  }

  return transformOrderData(data as Order[]);
}

// Fetch orders with optional status and pagination
export async function getOrders(options: {
  status?: Enums<"order_status_enum"> | Enums<"order_status_enum">[] | "";
  page?: number;
}): Promise<TransformedOrder[]> {
  return fetchOrders(options);
}

// Fetch orders for a specific user
export async function getMyOrders(options: {
  userId: string;
  status?: Enums<"order_status_enum"> | Enums<"order_status_enum">[] | "";
  page?: number;
}): Promise<TransformedOrder[]> {
  return fetchOrders(options);
}

// Fetch a single order by its ID
export async function getOrder(
  orderId: number
): Promise<TransformedOrder | null> {
  const { data, error } = await supabase
    .from("orders")
    .select(`*, order_items(*, product:products(*))`)
    .eq("id", orderId)
    .single();

  if (error) {
    console.error(`Error fetching order with ID ${orderId}:`, error);
    throw new Error("Order could not be found. Please try again.");
  }

  return transformOrderData([data as Order])[0];
}

// Convert cart items to order items format
const transformCartToOrderData = (cart: CartType, orderId: number) => {
  return cart.items.flatMap((item) =>
    item.prices.map((price) => ({
      order_id: orderId,
      product_id: item.product.id,
      size: price.size,
      price: price.price,
      quantity: price.quantity,
      total_price: price.total_price,
    }))
  );
};

// Create a new order with its items
export const createOrderWithItems = async ({
  cart,
  userId,
}: {
  cart: CartType;
  userId: string;
}) => {
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert([
      {
        user_id: userId,
        total_price: cart.total_price,
        status: "CONFIRMED",
      },
    ])
    .select()
    .single();

  if (orderError) {
    console.error("Error creating order:", { userId, cart }, orderError);
    throw new Error("Order creation failed. Please try again.");
  }

  const convertedOrderItems = transformCartToOrderData(cart, order.id);
  const { data: orderItems, error: orderItemsError } = await supabase
    .from("order_items")
    .insert(convertedOrderItems)
    .select();

  if (orderItemsError) {
    console.error(
      "Error creating order items:",
      { orderId: order.id, convertedOrderItems },
      orderItemsError
    );
    throw new Error("Order items creation failed. Please try again.");
  }

  return { ...order, order_items: orderItems };
};

// Update the status of an existing order
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
    console.error(
      `Error updating status of order ID ${orderId}:`,
      { status },
      error
    );
    throw new Error("Order status could not be updated. Please try again.");
  }

  return data;
};
