import { PAGE_LIMIT } from "@/constants/constants";
import supabase from "./supabase";
import { Enums, Tables } from "@/constants/types";

type GetOrdersParams = {
  status?: Enums<"order_status_enum">;
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
  prices: {
    size: string;
    price: number;
    quantity: number;
    total_price: number;
  }[];
};

type Order = Tables<"orders"> & {
  order_items: OrderItem[];
};

export type TransformedOrder = Omit<Order, "order_items"> & {
  order_items: TransformedOrderItem[];
};

// Transform function with correct typings
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

// Corrected getOrders function with proper typings
export async function getOrders({
  status,
  page = 1,
}: GetOrdersParams): Promise<TransformedOrder[]> {
  const from = (page - 1) * PAGE_LIMIT;
  const to = from + PAGE_LIMIT - 1;

  let query = supabase
    .from("orders")
    .select(
      `
      *,
      order_items(*, product:products(*))
    `
    )
    .range(from, to);

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Orders could not be loaded");
  }
  const transformedData = transformOrderData(data as Order[]);

  return transformedData;
}
