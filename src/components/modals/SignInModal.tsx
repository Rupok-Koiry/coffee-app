import React from "react";
import { useColorScheme } from "nativewind";
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Button from "@/components/Button";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

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
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <Pressable
        onPressOut={() => setModalVisible(false)}
        className="flex-1 bg-primary-overlay"
      >
        <View className="flex-1 justify-end items-center">
          <LinearGradient
            colors={[
              Colors[colorScheme].secondaryGreyHex,
              Colors[colorScheme].primaryBackgroundHex,
            ]}
            start={[0, 0]}
            end={[1, 1]}
            className="p-5 w-full"
            style={{ borderRadius: 16 }}
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
            <Text className="text-xl font-poppins-semibold text-primary-text text-center my-3">
              {title}
            </Text>
            <Button
              onPress={() => {
                router.push("/(auth)/sign-in");
                setModalVisible(false);
              }}
              containerClassName="mb-3"
            >
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
