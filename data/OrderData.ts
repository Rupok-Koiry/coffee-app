import CartData from "./CartData";

const OrderData = [
  {
    cart: [CartData[0], CartData[1]], // List of items from CartData
    total_price:
      CartData[0].prices.reduce(
        (total, item) => total + +item.price * item.quantity,
        0
      ) +
      CartData[1].prices.reduce(
        (total, item) => total + +item.price * item.quantity,
        0
      ),
    order_date: "2023-12-01",
  },

  {
    cart: [CartData[0]], // Combination of CartData and CoffeeData items
    total_price: CartData[0].prices.reduce(
      (total, item) => total + +item.price * item.quantity,
      0
    ),
    order_date: "2024-01-15",
  },
  {
    cart: [CartData[1]], // Combination of CartData and CoffeeData items
    total_price: CartData[1].prices.reduce(
      (total, item) => total + +item.price * item.quantity,
      0
    ),
    order_date: "2024-01-15",
  },
];

export default OrderData;
