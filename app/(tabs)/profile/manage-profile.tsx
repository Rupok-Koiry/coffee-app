import React from "react";
import {
  Text,
  ScrollView,
  StatusBar,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, SubmitHandler } from "react-hook-form";
import { COLORS } from "@/theme/theme";
import Button from "@/components/Button";
import Input from "@/components/Input";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const EditProfileScreen: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const user = {
    profilePic:
      "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
    name: "John Doe",
    email: "koiry.rupok@gmail.com",
    phone: "1234567890",
    address: "123, Random Street, Random City",
  };

  const [profileImage, setProfileImage] = React.useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    // Handle form submission logic here
  };

  return (
    <SafeAreaView className="bg-primary-black flex-1">
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 justify-center px-5">
          <Text className="font-poppins-semibold text-3xl text-primary-white my-5">
            Edit Profile
          </Text>
          <View style={{ gap: 20 }}>
            <TouchableOpacity onPress={pickImage}>
              <View className="bg-secondary-dark-grey w-32 h-32 p-4 rounded-full mx-auto">
                <LinearGradient
                  colors={[COLORS.primaryOrangeHex, COLORS.primaryWhiteHex]}
                  start={[0, 0]}
                  end={[1, 1]}
                  style={{ borderRadius: 999, padding: 2 }}
                >
                  {profileImage ? (
                    <Image
                      source={{ uri: profileImage }}
                      className="w-full h-full rounded-full"
                    />
                  ) : (
                    <Image
                      source={{ uri: user.profilePic }}
                      className="w-full h-full rounded-full"
                    />
                  )}
                  <View className="absolute bottom-0 right-0 bg-primary-white rounded-full p-2">
                    <Ionicons
                      name="camera"
                      size={20}
                      color={COLORS.primaryOrangeHex}
                    />
                  </View>
                </LinearGradient>
              </View>
            </TouchableOpacity>

            <View>
              <Input<FormValues>
                control={control}
                name="name"
                placeholder="Enter your name"
                iconName="person"
                rules={{ required: "Name is required" }}
                defaultValue={user.name}
              />
              {errors.name && (
                <Text className="text-xs text-primary-red my-0.5 mx-2">
                  {errors.name.message}
                </Text>
              )}
            </View>
            <View>
              <Input<FormValues>
                control={control}
                name="email"
                placeholder="Enter your Email"
                iconName="mail"
                rules={{ required: "Email is required" }}
                defaultValue={user.email}
              />
              {errors.email && (
                <Text className="text-xs text-primary-red my-0.5 mx-2">
                  {errors.email.message}
                </Text>
              )}
            </View>
            <View>
              <Input<FormValues>
                control={control}
                name="phone"
                placeholder="Enter your phone"
                iconName="phone-portrait"
                rules={{ required: "Phone is required" }}
                defaultValue={user.phone}
              />
              {errors.phone && (
                <Text className="text-xs text-primary-red my-0.5 mx-2">
                  {errors.phone.message}
                </Text>
              )}
            </View>

            <View>
              <Input<FormValues>
                control={control}
                name="address"
                placeholder="Enter your address"
                iconName="location"
                rules={{ required: "Address is required" }}
                defaultValue={user.address}
              />
              {errors.address && (
                <Text className="text-xs text-primary-red my-0.5 mx-2">
                  {errors.address.message}
                </Text>
              )}
            </View>
          </View>
          <Button onPress={handleSubmit(onSubmit)} containerClassName="my-5">
            Save Changes
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
