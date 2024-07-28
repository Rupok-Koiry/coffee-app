import OrderData from "@/data/OrderData";
import { COLORS } from "@/theme/theme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, View, Text, Image } from "react-native";

const OrderTable = () => {
  return (
    <ScrollView horizontal style={{ flex: 1 }}>
      <LinearGradient
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        start={[0, 0]}
        end={[1, 1]}
        style={{ borderRadius: 16, flex: 1 }}
      >
        <View
          style={{
            flexDirection: "row",
            borderRadius: 16,
            backgroundColor: COLORS.primaryGreyHex,
            width: 800,
          }}
        >
          <View
            style={{
              width: "15%",
              padding: 16,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 18 }}>
              Order ID
            </Text>
          </View>
          <View
            style={{
              width: "40%",
              padding: 16,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 18 }}>
              Items
            </Text>
          </View>
          <View
            style={{
              width: "15%",
              padding: 16,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 18 }}>
              Total Price
            </Text>
          </View>
          <View
            style={{
              width: "15%",
              padding: 16,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 18 }}>
              Order Date
            </Text>
          </View>
          <View
            style={{
              width: "15%",
              padding: 16,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 18 }}>
              Status
            </Text>
          </View>
        </View>
        {OrderData.map((order, index) => (
          <View
            key={order.id}
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderBottomColor: "#d3d3d3",
              width: 800,
            }}
          >
            <View
              style={{
                width: "15%",
                padding: 16,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 16 }}>{order.id}</Text>
            </View>
            <View
              style={{
                width: "40%",
                padding: 16,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {order.cart.map((item, itemIndex) => (
                <View
                  key={itemIndex}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Image
                    source={item.imagelink_square}
                    style={{
                      width: 48,
                      height: 48,
                      marginRight: 8,
                      borderRadius: 8,
                    }}
                  />
                  <Text style={{ color: "#4B5563", fontSize: 16 }}>
                    {item.name}
                  </Text>
                </View>
              ))}
            </View>
            <View
              style={{
                width: "15%",
                padding: 16,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: "white", fontSize: 16 }}
              >{`$${order.total_price.toFixed(2)}`}</Text>
            </View>
            <View
              style={{
                width: "15%",
                padding: 16,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 16 }}>
                {order.order_date}
              </Text>
            </View>
            <View
              style={{
                width: "15%",
                padding: 16,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: order.status === "delivered" ? "#16A34A" : "#1D4ED8",
                }}
              >
                {order.status}
              </Text>
            </View>
          </View>
        ))}
      </LinearGradient>
    </ScrollView>
  );
};

export default OrderTable;
