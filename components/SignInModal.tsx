import React from "react";
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Button from "@/components/Button";
import { COLORS } from "@/theme/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

type SignInModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  title: string;
};

const SignInModal: React.FC<SignInModalProps> = ({
  modalVisible,
  setModalVisible,
  title,
}) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <Pressable
        onPressOut={() => setModalVisible(false)}
        className="flex-1 bg-primary-black-rgba"
      >
        <View
          className="flex-1 justify-end items-center"
          onStartShouldSetResponder={() => true}
        >
          <LinearGradient
            colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
            start={[0, 0]}
            end={[1, 1]}
            className="px-5 py-8 rounded-lg w-full"
          >
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="absolute top-5 right-5 z-20"
            >
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
            <Image
              source={require("@/assets/app_images/lock.png")}
              className="w-16 h-16 mx-auto"
            />
            <Text className="text-xl font-poppins-semibold text-primary-white text-center my-3">
              {title}
            </Text>
            <Button href="/(auth)/sign-in" containerClassName="mb-3">
              Sign In
            </Button>
            <Button onPress={() => setModalVisible(false)} outline>
              Cancel
            </Button>
          </LinearGradient>
        </View>
      </Pressable>
    </Modal>
  );
};

export default SignInModal;
