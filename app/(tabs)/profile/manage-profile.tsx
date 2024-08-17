import React, { useEffect } from "react";
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
import HeaderBar from "@/components/HeaderBar";
import { useUser } from "@/hooks/auth/useUser";
import { SUPABASE_URL } from "@/services/supabase";
import { useUpdateUser } from "@/hooks/auth/useUpdateUser";
import { useUpdatePassword } from "@/hooks/auth/useUpdatePassword";

interface UserDetailsFormValues {
  full_name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
}

interface PasswordFormValues {
  password: string;
  confirmPassword: string;
}

const EditProfileScreen: React.FC = () => {
  const { user } = useUser();
  const {
    control: userDetailsControl,
    handleSubmit: handleUserDetailsSubmit,
    setValue: setUserDetailsValue,
    watch: watchUserDetails,
    formState: { errors: userDetailsErrors },
  } = useForm<UserDetailsFormValues>();

  const {
    control: passwordControl,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm<PasswordFormValues>();

  useEffect(() => {
    if (!user) return;
    setUserDetailsValue("full_name", user.full_name);
    setUserDetailsValue("email", user.email);
    setUserDetailsValue("phone", user.phone);
    setUserDetailsValue("address", user.address || "");
    setUserDetailsValue("avatar", user.avatar);
  }, [setUserDetailsValue]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setUserDetailsValue("avatar", result.assets[0].uri);
    }
  };

  const profileImage = watchUserDetails("avatar");

  const { updateUser } = useUpdateUser();
  const { updatePassword } = useUpdatePassword();
  const onSubmitUserDetails: SubmitHandler<UserDetailsFormValues> = (data) => {
    updateUser(data);
  };

  const onSubmitPassword: SubmitHandler<PasswordFormValues> = (data) => {
    updatePassword(data.password, {
      onSuccess: () => {
        resetPassword();
      },
    });
  };

  if (!user) return null;
  return (
    <SafeAreaView className="bg-primary-black flex-1">
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <HeaderBar title="Manage Profile" />

        <View className="flex-1 p-5">
          <View className="space-y-5">
            <TouchableOpacity onPress={pickImage}>
              <View className="bg-secondary-dark-grey w-32 h-32 p-4 rounded-full mx-auto">
                <LinearGradient
                  colors={[COLORS.primaryOrangeHex, COLORS.primaryWhiteHex]}
                  start={[0, 0]}
                  end={[1, 1]}
                  className="w-full h-full rounded-full p-0.5"
                >
                  <View className="w-full h-full rounded-full overflow-hidden">
                    <Image
                      source={{
                        uri: profileImage?.startsWith("file")
                          ? profileImage
                          : `${SUPABASE_URL}/storage/v1/object/public/avatars/${user.avatar}`,
                      }}
                      className="w-full h-full"
                      style={{ resizeMode: "cover" }}
                    />
                  </View>
                  <View className="absolute bottom-0 right-0 bg-primary-white rounded-full p-2 shadow-lg">
                    <Ionicons
                      name="camera"
                      size={20}
                      color={COLORS.primaryOrangeHex}
                    />
                  </View>
                </LinearGradient>
              </View>
              <Text className="font-poppins-semibold text-primary-white text-center mt-3">
                Tap to change profile picture
              </Text>
            </TouchableOpacity>
            <View>
              <Input<UserDetailsFormValues>
                control={userDetailsControl}
                name="full_name"
                placeholder="Enter your name"
                iconName="person"
                rules={{ required: "Name is required" }}
              />
              {userDetailsErrors.full_name && (
                <Text className="text-xs text-primary-red my-0.5 mx-2">
                  {userDetailsErrors.full_name.message}
                </Text>
              )}
            </View>
            <View>
              <Input<UserDetailsFormValues>
                control={userDetailsControl}
                name="email"
                placeholder="Enter your Email"
                iconName="mail"
                editable={false}
              />
            </View>
            <View>
              <Input<UserDetailsFormValues>
                control={userDetailsControl}
                name="phone"
                placeholder="Enter your phone"
                iconName="phone-portrait"
                rules={{ required: "Phone is required" }}
                keyboardType="phone-pad"
              />
              {userDetailsErrors.phone && (
                <Text className="text-xs text-primary-red my-0.5 mx-2">
                  {userDetailsErrors.phone.message}
                </Text>
              )}
            </View>

            <View>
              <Input<UserDetailsFormValues>
                control={userDetailsControl}
                name="address"
                placeholder="Enter your address"
                iconName="location"
                rules={{ required: "Address is required" }}
              />
              {userDetailsErrors.address && (
                <Text className="text-xs text-primary-red my-0.5 mx-2">
                  {userDetailsErrors.address.message}
                </Text>
              )}
            </View>
            <Button
              onPress={handleUserDetailsSubmit(onSubmitUserDetails)}
              containerClassName="my-5"
            >
              Save Changes
            </Button>
          </View>
        </View>
        <View className="flex-1 px-5">
          <Text className="font-poppins-semibold text-2xl text-primary-white my-5">
            Update Password
          </Text>
          <View className="space-y-5">
            <View>
              <Input<PasswordFormValues>
                control={passwordControl}
                name="password"
                placeholder="Enter your password"
                iconName="lock-closed"
                secureTextEntry
                rules={{ required: "Password is required" }}
              />
              {passwordErrors.password && (
                <Text className="text-xs text-primary-red m-0.5 mx-2">
                  {passwordErrors.password.message}
                </Text>
              )}
            </View>
            <View>
              <Input<PasswordFormValues>
                control={passwordControl}
                name="confirmPassword"
                placeholder="Enter your confirm password"
                iconName="lock-closed"
                secureTextEntry
                rules={{
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === passwordControl._getWatch("password") ||
                    "Passwords do not match",
                }}
              />
              {passwordErrors.confirmPassword && (
                <Text className="text-xs text-primary-red m-0.5 mx-2">
                  {passwordErrors.confirmPassword.message}
                </Text>
              )}
            </View>
            <Button
              onPress={handlePasswordSubmit(onSubmitPassword)}
              containerClassName="my-5"
            >
              Save Password
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
