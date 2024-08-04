import { Database } from "./database.types";
import { Ionicons } from "@expo/vector-icons";
import { type ComponentProps } from "react";

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type InsertTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];

export type UpdateTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

export type PricesType = {
  size: string;
  price: number;
  quantity: number;
  total_price: number;
};
export type OrderItemType = {
  id: number;
  product: Tables<"products">;
  prices: PricesType[];
};
export type PaymentListType = {
  name: string;
  icon: any;
  isIcon: boolean;
};
export type CartItemType = {
  product: Tables<"products">;
  prices: PricesType[];
  total_price: number;
};

export type CartType = {
  items: CartItemType[];
  total_price: number;
};

type IoniconsName = ComponentProps<typeof Ionicons>["name"];

export type OrderStatusType = {
  title: string;
  description: string;
  icon: IoniconsName;
  status: Enums<"order_status_enum">;
};

export const orderStatuses: OrderStatusType[] = [
  {
    title: "Order Placed",
    description:
      "Your order has been successfully placed and is being processed.",
    icon: "cart",
    status: "PLACED",
  },
  {
    title: "Order Confirmed",
    description: "Your order has been confirmed and will be prepared shortly.",
    icon: "checkmark-circle",
    status: "CONFIRMED",
  },
  {
    title: "On The Way",
    description: "Your order is on its way! It will reach you soon.",
    icon: "bicycle",
    status: "ON_THE_WAY",
  },
  {
    title: "Order Delivered",
    description: "Your order has been delivered. Enjoy your purchase!",
    icon: "home",
    status: "DELIVERED",
  },
];
