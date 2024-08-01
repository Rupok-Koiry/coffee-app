import { Database } from "./database.types";
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
export enum OrderStatusEnum {
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
}

export type PaymentListType = {
  name: string;
  icon: any;
  isIcon: boolean;
};
