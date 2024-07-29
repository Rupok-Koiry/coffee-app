import OrderData from "@/data/OrderData";
import { COLORS } from "@/theme/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Picker as SelectPicker } from "@react-native-picker/picker";
import Button from "./Button";
import GradientIcon from "./GradientIcon";
import Tag from "./Tag";

type Status = {
  title: string;
  description: string;
  icon: string;
  status: string;
  containerClassName: string;
  textClassName: string;
};

const statuses: Status[] = [
  {
    title: "Order Placed",
    description:
      "Your order has been successfully placed and is being processed.",
    icon: "cart",
    status: "placed",
    containerClassName: "bg-blue-900",
    textClassName: "text-blue-300",
  },
  {
    title: "Order Confirmed",
    description: "Your order has been confirmed and will be prepared shortly.",
    icon: "checkmark-circle",
    status: "confirmed",
    containerClassName: "bg-gray-700",
    textClassName: "text-gray-300",
  },
  {
    title: "On The Way",
    description: "Your order is on its way! It will reach you soon.",
    icon: "bicycle",
    status: "onTheWay",
    containerClassName: "bg-green-900",
    textClassName: "text-green-300",
  },
  {
    title: "Order Delivered",
    description: "Your order has been delivered. Enjoy your purchase!",
    icon: "home",
    status: "delivered",
    containerClassName: "bg-green-900",
    textClassName: "text-green-300",
  },
  {
    title: "Order Cancelled",
    description: "Your order has been cancelled. We hope to see you soon!",
    icon: "close-circle",
    status: "cancelled",
    containerClassName: "bg-red-900",
    textClassName: "text-red-300",
  },
];

const getStatusClassNames = (status: string) => {
  const statusObj = statuses.find((s) => s.status === status);
  return {
    containerClassName: statusObj?.containerClassName || "bg-gray-500",
    textClassName: statusObj?.textClassName || "text-gray-800",
  };
};

const OrderTable: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);

  const openModal = (orderId: string) => {
    setCurrentOrderId(orderId);
    setModalVisible(true);
  };

  const updateStatus = () => {
    console.log(`Updating order ${currentOrderId} to status ${selectedStatus}`);
    setModalVisible(false);
  };

  return (
    <ScrollView horizontal className="flex-1">
      <View className="flex-1 border-2 border-primary-grey rounded-2xl overflow-hidden">
        <View className="flex-row border-b border-primary-grey p-3 space-x-5">
          <View style={{ width: 120 }}>
            <Text className="text-secondary-light-grey font-poppins-semibold uppercase">
              Order ID
            </Text>
          </View>
          <View style={{ width: 200 }}>
            <Text className="text-secondary-light-grey font-poppins-semibold uppercase">
              Items
            </Text>
          </View>
          <View style={{ width: 120 }}>
            <Text className="text-secondary-light-grey font-poppins-semibold uppercase">
              Total Price
            </Text>
          </View>
          <View style={{ width: 120 }}>
            <Text className="text-secondary-light-grey font-poppins-semibold uppercase">
              Order Date
            </Text>
          </View>
          <View style={{ width: 120 }}>
            <Text className="text-secondary-light-grey font-poppins-semibold uppercase">
              Status
            </Text>
          </View>
          <View>
            <Text className="text-secondary-light-grey font-poppins-semibold uppercase">
              Actions
            </Text>
          </View>
        </View>
        <LinearGradient
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          start={[0, 0]}
          end={[1, 1]}
        >
          {OrderData.map((order) => {
            const { containerClassName, textClassName } = getStatusClassNames(
              order.status
            );
            return (
              <View
                key={order.id}
                className="flex-row border-b border-primary-grey space-x-5"
              >
                <View className="p-3" style={{ width: 120 }}>
                  <Text className="text-primary-white font-poppins-regular text-base">
                    {order.id}
                  </Text>
                </View>
                <View className="p-3 space-y-2" style={{ width: 200 }}>
                  {order.cart.map((item, itemIndex) => (
                    <View key={itemIndex} className="flex-row items-center">
                      <Image
                        source={item.imagelink_square}
                        className="w-9 h-9 mr-2 rounded-lg"
                      />
                      <Text className="text-secondary-light-grey font-poppins-regular">
                        {item.name}
                      </Text>
                    </View>
                  ))}
                </View>
                <View className="p-3" style={{ width: 120 }}>
                  <Text className="text-primary-white font-poppins-regular">{`$${order.total_price.toFixed(
                    2
                  )}`}</Text>
                </View>
                <View className="p-3" style={{ width: 120 }}>
                  <Text className="text-primary-white font-poppins-regular">
                    {order.order_date}
                  </Text>
                </View>
                <View className="p-3" style={{ width: 120 }}>
                  <Tag
                    containerClassName={containerClassName}
                    textClassName={textClassName}
                  >
                    {order.status}
                  </Tag>
                </View>
                <View className="flex-row space-x-3 p-3" style={{ width: 120 }}>
                  <Link href={`/(tabs)/order/${order.id}`}>
                    <Ionicons
                      name="eye"
                      size={20}
                      color={COLORS.primaryLightGreyHex}
                    />
                  </Link>
                  <TouchableOpacity onPress={() => openModal(order.id)}>
                    <Ionicons
                      name="ellipsis-vertical"
                      size={20}
                      color={COLORS.primaryLightGreyHex}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </LinearGradient>
        <View className="flex-row justify-between items-center p-3">
          <Text className="text-secondary-light-grey font-poppins-medium">
            Showing 1 to 10 of 331 results
          </Text>
          <View
            className="flex-row justify-between items-center"
            style={{ gap: 12 }}
          >
            <GradientIcon
              name="chevron-back"
              iconSet="Ionicons"
              color={COLORS.primaryOrangeHex}
              width={6}
              height={6}
              size={16}
            />
            <GradientIcon
              name="chevron-forward"
              iconSet="Ionicons"
              color={COLORS.primaryOrangeHex}
              width={6}
              height={6}
              size={16}
            />
          </View>
        </View>
      </View>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-primary-black-rgba px-5">
          <LinearGradient
            colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
            start={[0, 0]}
            end={[1, 1]}
            className="bg-primary-grey px-5 py-8 rounded-lg w-full"
          >
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="absolute top-5 right-5 z-20"
            >
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-xl font-poppins-semibold text-primary-white">
              Update Order Status
            </Text>
            <View className="border-2 border-primary-grey rounded-xl my-5">
              <SelectPicker
                selectedValue={selectedStatus}
                onValueChange={(itemValue) => setSelectedStatus(itemValue)}
                style={{
                  color: COLORS.primaryWhiteHex,
                  marginBottom: 12,
                  height: 40,
                }}
                dropdownIconColor={COLORS.secondaryLightGreyHex}
              >
                {statuses.map((status) => (
                  <SelectPicker.Item
                    key={status.status}
                    label={status.title}
                    value={status.status}
                  />
                ))}
              </SelectPicker>
            </View>
            <Button>Update</Button>
          </LinearGradient>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default OrderTable;
