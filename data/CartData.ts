const CartData = [
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
  },
  {
    id: "C105",
    name: "Espresso",
    description:
      "Espresso is made by forcing nearly boiling water through finely-ground coffee beans, which results in a concentrated, syrup-like coffee drink. This is the base for many Italian beverages in coffee shops. When compared to regular brewed coffee, espresso is much stronger than the other types of coffee drinks. Espressos are enjoyed in shots where a single shot is one ounce and a long (single and double) shot is two ounces in amount, respectively.",
    roasted: "Medium Roasted",
    imagelink_square: require("../assets/coffee_assets/espresso/square/espresso_pic_1_square.png"),
    imagelink_portrait: require("../assets/coffee_assets/espresso/portrait/espresso_pic_1_portrait.png"),
    ingredients: "Milk",
    special_ingredient: "With Steamed Milk",
    prices: [
      {
        size: "S",
        price: "1.38",
        currency: "$",
        quantity: 3,
      },
    ],
    average_rating: 4.7,
    ratings_count: "6,879",
    isFavorite: false,
    type: "Coffee",
    index: 9,
  },
];
export default CartData;
