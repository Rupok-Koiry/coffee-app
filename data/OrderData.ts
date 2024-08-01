import CartData from "./CartData";

const OrderData = [
  {
    id: 1,
    cart: [
      {
        id: "B4",
        name: "Excelsa Beans",
        description: `Excelsa beans grow almost entirely in Southeast Asia, and they’re shaped somewhat like Liberica beans — elongated ovals. These beans grow on large 20 to 30-foot coffee plants at medium altitudes. In terms of flavor, Excelsa beans are pretty unique. They combine light roast traits like tart notes and fruity flavors with flavors that are more reminiscent of dark roasts.`,
        roasted: "Medium Roasted",
        imagelink_square: require("../assets/coffee_assets/excelsa_coffee_beans/excelsa_coffee_beans_square.png"),
        imagelink_portrait: require("../assets/coffee_assets/excelsa_coffee_beans/excelsa_coffee_beans_portrait.png"),
        ingredients: "Malaysia",
        special_ingredient: "From Malaysia",
        prices: [
          { size: "250gm", price: "5.50", currency: "$", quantity: 2 },
          { size: "500gm", price: "10.50", currency: "$", quantity: 3 },
          { size: "1Kg", price: "18.50", currency: "$", quantity: 6 },
        ],
        average_rating: 4.7,
        ratings_count: "6,879",
        isFavorite: false,
        type: "Bean",
        index: 3,
        total_price: "9.38",
      },
      {
        id: "C42",
        name: "Black Coffee",
        description:
          "Black coffee is arguably the most common type of coffee drink out there. Its popularity can be mainly attributed to how easy it is to make this beverage, be it drip, pour-over, French press, or anything else. Black coffee is usually served with no add-ins.",
        roasted: "Medium Roasted",
        imagelink_square: require("../assets/coffee_assets/black_coffee/square/black_coffee_pic_1_square.png"),
        imagelink_portrait: require("../assets/coffee_assets/black_coffee/portrait/black_coffee_pic_1_portrait.png"),
        ingredients: "Milk",
        special_ingredient: "With Steamed Milk",
        prices: [
          {
            size: "S",
            price: "1.38",
            currency: "$",
            quantity: 1,
          },
          {
            size: "M",
            price: "3.15",
            currency: "$",
            quantity: 2,
          },
        ],
        average_rating: 4.7,
        ratings_count: "6,879",
        isFavorite: false,
        type: "Coffee",
        index: 3,
        total_price: "5.38",
      },
    ],
    total_price: 20,
    order_date: "2023-12-01",
    status: "delivered",
  },
  {
    id: 123,
    cart: [CartData[0], CartData[4]], // List of items from CartData
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
    status: "delivered",
  },
  {
    id: 2,

    cart: [CartData[0]], // Combination of CartData and CoffeeData items
    total_price: CartData[0].prices.reduce(
      (total, item) => total + +item.price * item.quantity,
      0
    ),
    order_date: "2024-01-15",
    status: "confirmed",
  },

  {
    id: 3,

    cart: [CartData[1]], // Combination of CartData and CoffeeData items
    total_price: CartData[1].prices.reduce(
      (total, item) => total + +item.price * item.quantity,
      0
    ),
    order_date: "2024-01-15",
    status: "confirmed",
  },
];

export default OrderData;
