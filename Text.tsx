import OrderData from "@/data/OrderData";
import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

const OrderTable = () => {
  return (
    <ScrollView style={styles.container} horizontal>
      <View>
        <View style={styles.tableHeader}>
          <View style={styles.columnHeader}>
            <Text style={styles.headerText}>Order ID</Text>
          </View>
          <View style={styles.columnHeader}>
            <Text style={styles.headerText}>Items</Text>
          </View>
          <View style={styles.columnHeader}>
            <Text style={styles.headerText}>Total Price</Text>
          </View>
          <View style={styles.columnHeader}>
            <Text style={styles.headerText}>Order Date</Text>
          </View>
          <View style={styles.columnHeader}>
            <Text style={styles.headerText}>Status</Text>
          </View>
        </View>
        {OrderData.map((order, index) => (
          <View
            key={order.id}
            style={[
              styles.tableRow,
              index % 2 === 0 ? styles.evenRow : styles.oddRow,
            ]}
          >
            <View style={styles.columnRow}>
              <Text style={styles.rowText}>{order.id}</Text>
            </View>
            <View style={styles.columnRow}>
              {order.cart.map((item, itemIndex) => (
                <View key={itemIndex} style={styles.itemContainer}>
                  <Image
                    source={item.imagelink_square}
                    style={styles.itemImage}
                  />
                  <Text style={styles.itemText}>{item.name}</Text>
                </View>
              ))}
            </View>
            <View style={styles.columnRow}>
              <Text style={styles.rowText}>{`$${order.total_price.toFixed(
                2
              )}`}</Text>
            </View>
            <View style={styles.columnRow}>
              <Text style={styles.rowText}>{order.order_date}</Text>
            </View>
            <View style={styles.columnRow}>
              <Text
                style={[
                  styles.rowText,
                  order.status === "delivered"
                    ? styles.delivered
                    : styles.confirmed,
                ]}
              >
                {order.status}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#4CAF50",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  columnHeader: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#fff",
  },
  headerText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 16,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  evenRow: {
    backgroundColor: "#f2f2f2",
  },
  oddRow: {
    backgroundColor: "#ffffff",
  },
  columnRow: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#ddd",
  },
  rowText: {
    color: "#000",
    fontSize: 14,
  },
  delivered: {
    color: "green",
    fontWeight: "bold",
  },
  confirmed: {
    color: "blue",
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 14,
    color: "#333",
  },
});

export default OrderTable;
