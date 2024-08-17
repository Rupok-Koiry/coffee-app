import { View, Text, Modal, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Picker as SelectPicker } from "@react-native-picker/picker";
import { COLORS } from "@/theme/theme";
import Button from "../Button";
import { Enums, orderStatuses } from "@/constants/types";
type OrderStatusModalProps = {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  selectedStatus: Enums<"order_status_enum">;
  setSelectedStatus: (value: Enums<"order_status_enum">) => void;
  updateStatus: () => void;
  isLoading: boolean;
};

const OrderStatusModal = ({
  modalVisible,
  setModalVisible,
  selectedStatus,
  setSelectedStatus,
  updateStatus,
  isLoading,
}: OrderStatusModalProps) => {
  return (
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
            <Button
              onPress={updateStatus}
              loading={isLoading}
              disabled={isLoading}
            >
              Update
            </Button>
          </LinearGradient>
        </View>
      </Pressable>
    </Modal>
  );
};

export default OrderStatusModal;
