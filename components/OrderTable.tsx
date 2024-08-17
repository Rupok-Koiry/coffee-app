import OrderData from "@/data/OrderData";
import { COLORS } from "@/theme/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import { Picker as SelectPicker } from "@react-native-picker/picker";
import Button from "./Button";
import Tag from "./Tag";
import { useOrders } from "@/hooks/orders/useOrders";
import { SUPABASE_URL } from "@/services/supabase";
import { useUpdateOrderStatus } from "@/hooks/orders/useUpdateOrderStatus";
import { Enums, orderStatuses } from "@/constants/types";
import Loader from "./loader/Loader";

const getStatusDesign = (status: Enums<"order_status_enum">) => {
  switch (status) {
    case "PLACED":
      return {
        containerClassName: "bg-indigo-600",
        textClassName: "text-indigo-200",
      };
    case "CONFIRMED":
      return {
        containerClassName: "bg-yellow-600",
        textClassName: "text-yellow-200",
      };
    case "ON_THE_WAY":
      return {
        containerClassName: "bg-green-600",
        textClassName: "text-green-200",
      };
    case "DELIVERED":
      return {
        containerClassName: "bg-emerald-600",
        textClassName: "text-emerald-200",
      };
    case "CANCELLED":
      return {
        containerClassName: "bg-red-600",
        textClassName: "text-red-200",
      };
    default:
      return {
        containerClassName: "bg-gray-500",
        textClassName: "text-gray-800",
      };
  }
};

type OrderTableProps = {
  status: Enums<"order_status_enum"> | "";
};
const OrderTable = ({ status }: OrderTableProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] =
    useState<Enums<"order_status_enum"> | null>(null);
  const [currentOrderId, setCurrentOrderId] = useState<number | null>(null);

  const { orders, hasNextPage, fetchNextPage, isLoading } = useOrders(status);
  const { updateOrderStatus } = useUpdateOrderStatus();

  const openModal = (
    orderId: number,
    currentStatus: Enums<"order_status_enum">
  ) => {
    setCurrentOrderId(orderId);
    setSelectedStatus(currentStatus);
    setModalVisible(true);
  };

  const updateStatus = async () => {
    if (currentOrderId && selectedStatus) {
      await updateOrderStatus({
        orderId: currentOrderId,
        status: selectedStatus,
      });
      setModalVisible(false);
    }
  };

  const loadMore = useCallback(() => {
    if (hasNextPage) fetchNextPage();
  }, [hasNextPage, fetchNextPage]);

  if (isLoading) return <Loader />;

  return (
    <ScrollView horizontal className="flex-1">
      <View className="flex-1 border-2 border-primary-grey rounded-2xl overflow-hidden">
        <View className="flex-row border-b border-primary-grey p-3 space-x-5">
          <View style={{ width: 80 }}>
            <Text className="text-secondary-light-grey font-poppins-semibold uppercase">
              Order ID
            </Text>
          </View>
          <View style={{ width: 180 }}>
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
          <View style={{ width: 135 }}>
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
          style={{ flex: 1 }}
        >
          <FlatList
            ListEmptyComponent={
              <Text className="font-poppins-semibold text-primary-light-grey text-lg text-center my-2">
                No Order Available
              </Text>
            }
            data={orders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View className="flex-row border-b border-primary-grey space-x-5">
                <View className="p-3" style={{ width: 80 }}>
                  <Text className="text-primary-white font-poppins-regular text-base">
                    {item.id}
                  </Text>
                </View>
                <View className="p-3 space-y-2" style={{ width: 180 }}>
                  {item.order_items.map((item, itemIndex) => (
                    <View key={itemIndex} className="flex-row items-center">
                      <Image
                        source={{
                          uri: `${SUPABASE_URL}/storage/v1/object/public/product-images/square/${item.product.image_square}`,
                        }}
                        className="w-9 h-9 mr-2 rounded-lg"
                      />
                      <Text className="text-secondary-light-grey font-poppins-regular">
                        {item.product.name}
                      </Text>
                    </View>
                  ))}
                </View>
                <View className="p-3" style={{ width: 120 }}>
                  <Text className="text-primary-white font-poppins-regular">{`$${item.total_price.toFixed(
                    2
                  )}`}</Text>
                </View>
                <View className="p-3" style={{ width: 120 }}>
                  <Text className="text-primary-white font-poppins-regular">
                    {new Date(item.order_date).toLocaleDateString()}
                  </Text>
                </View>
                <View className="p-3" style={{ width: 135 }}>
                  <Tag
                    containerClassName={
                      getStatusDesign(item.status).containerClassName
                    }
                    textClassName={getStatusDesign(item.status).textClassName}
                  >
                    {item.status === "ON_THE_WAY" ? "ON THE WAY" : item.status}
                  </Tag>
                </View>
                <View className="flex-row space-x-3 p-3" style={{ width: 120 }}>
                  <Link href={`/(tabs)/order/${item.id}`}>
                    <Ionicons
                      name="eye"
                      size={20}
                      color={COLORS.primaryLightGreyHex}
                    />
                  </Link>
                  <TouchableOpacity
                    onPress={() => openModal(item.id, item.status)}
                  >
                    <Ionicons
                      name="ellipsis-vertical"
                      size={20}
                      color={COLORS.primaryLightGreyHex}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
          />
        </LinearGradient>
      </View>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          onPress={() => setModalVisible(false)}
          className="flex-1 bg-primary-black-rgba justify-center items-center px-5"
        >
          <View className="w-full" onStartShouldSetResponder={() => true}>
            <LinearGradient
              colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
              start={[0, 0]}
              end={[1, 1]}
              className="px-5 py-8 rounded-lg"
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
                  {orderStatuses.map((status) => (
                    <SelectPicker.Item
                      key={status.status}
                      label={status.title}
                      value={status.status}
                    />
                  ))}
                </SelectPicker>
              </View>
              <Button onPress={updateStatus}>Update</Button>
            </LinearGradient>
          </View>
        </Pressable>
      </Modal>
    </ScrollView>
  );
};

export default OrderTable;
