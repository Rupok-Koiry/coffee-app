import { PAGE_LIMIT } from "@/constants/constants";
import supabase from "./supabase";
import { OrderStatusEnum, Tables, PricesType } from "@/constants/types";

type GetOrdersParams = {
  status?: OrderStatusEnum;
  page?: number;
};

type OrderItem = Tables<"order_items"> & {
  product: Tables<"products">;
};

type TransformedOrderItem = Omit<
  OrderItem,
  "size" | "price" | "quantity" | "total_price"
> & {
  product_id: number;
  product: Tables<"products">;
  prices: PricesType[];
};

type Order = Tables<"orders"> & {
  order_items: OrderItem[];
};

export type TransformedOrder = Omit<Order, "order_items"> & {
  order_items: TransformedOrderItem[];
};

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

export async function getOrders({
  status,
  page = 1,
}: GetOrdersParams): Promise<TransformedOrder[]> {
  const from = (page - 1) * PAGE_LIMIT;
  const to = from + PAGE_LIMIT - 1;

  let query = supabase
    .from("orders")
    .select(`*, order_items(*, product:products(*))`)
    .range(from, to);

  if (status) {
    const statusMapping: { [key in OrderStatusEnum]: string[] } = {
      [OrderStatusEnum.ACTIVE]: ["PLACED", "CONFIRMED", "ON_THE_WAY"],
      [OrderStatusEnum.ARCHIVED]: ["DELIVERED", "CANCELLED"],
    };

    query = query.in("status", statusMapping[status]);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error loading orders:", error);
    throw new Error("Orders could not be loaded");
  }

  return transformOrderData(data as Order[]);
}

export async function getOrder(
  orderId: number
): Promise<TransformedOrder | null> {
  const { data, error } = await supabase
    .from("orders")
    .select(`*, order_items(*, product:products(*))`)
    .eq("id", orderId)
    .single();

  if (error) {
    console.error("Error fetching order:", error);
    throw new Error("Order not found");
  }

  return transformOrderData([data as Order])[0];
}

const transformCartToOrderData = (cart) => {
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

export const createOrder = async ({ cart, userId }) => {
  // Create the order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert([
      {
        user_id: userId,
        total_price: parseFloat(cart.total_price), // Ensure the total_price is a number
        status: "CONFIRMED",
      },
    ])
    .select()
    .single();

  if (orderError) throw orderError;

  // Transform cart items to order items data
  const orderItems = transformCartToOrderData(cart);

  const orderItemsData = orderItems.flatMap((item) =>
    item.prices.map((price) => ({
      order_id: order.id,
      product_id: item.product_id,
      size: price.size,
      price: price.price,
      quantity: price.quantity,
      total_price: price.total_price,
    }))
  );

  return { order, orderItems: orderItemsData };
};
