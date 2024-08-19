import { View, Text, Modal, TouchableOpacity } from "react-native";
import { useColorScheme } from "nativewind";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Button from "../Button";
type ConfirmDeleteModalProps = {
  isModalVisible: boolean;
  setIsModalVisible: (isVisible: boolean) => void;
  handleDelete: () => void;
  isDeleting: boolean;
};
const ConfirmDeleteModal = ({
  isModalVisible,
  setIsModalVisible,
  isDeleting,
  handleDelete,
}: ConfirmDeleteModalProps) => {
  const { colorScheme } = useColorScheme();
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(false)}
    >
      <View className="flex-1 justify-center items-center bg-primary-background-rgba px-5">
        <LinearGradient
          colors={[
            Colors[colorScheme].secondaryGreyHex,
            Colors[colorScheme].primaryBackgroundHex,
          ]}
          start={[0, 0]}
          end={[1, 1]}
          className="bg-primary-grey px-5 py-8 w-full"
          style={{ borderRadius: 8 }}
        >
          <TouchableOpacity
            onPress={() => setIsModalVisible(false)}
            className="absolute top-5 right-5 z-20"
          >
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-xl font-poppins-semibold my-5 text-primary-text">
            Are you sure you want to delete this product?
          </Text>

          <View
            className="flex-row justify-end items-center"
            style={{ gap: 12 }}
          >
            <Button
              onPress={() => setIsModalVisible(false)}
              containerClassName="px-3 py-2 rounded"
              textClassName="text-xs font-poppins-medium"
            >
              Cancel
            </Button>
            <Button
              containerClassName="px-3 py-2 rounded"
              textClassName="text-xs font-poppins-medium"
              onPress={handleDelete}
              disabled={isDeleting}
              loading={isDeleting}
            >
              Delete
            </Button>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
};

export default ConfirmDeleteModal;
