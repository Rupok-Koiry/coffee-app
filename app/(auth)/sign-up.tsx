import React from "react";
import { Text, ScrollView, StatusBar, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, SubmitHandler } from "react-hook-form";
import { COLORS } from "@/theme/theme";
import { Link } from "expo-router";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useSignup } from "@/api/auth/useSignup";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const SignUpScreen: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const { signup } = useSignup();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);

    signup(data);
  };

  return (
    <SafeAreaView className="bg-primary-black flex-1">
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 justify-center px-5">
          <Image
            source={require("@/assets/app_images/logo.png")}
            className="w-32 h-32 self-center"
          />
          <Text className="font-poppins-semibold text-3xl text-primary-white my-8">
            Let's get started
          </Text>
          <View style={{ gap: 20 }}>
            <View>
              <Input<FormValues>
                control={control}
                name="name"
                placeholder="Enter your name"
                iconName="person"
                rules={{ required: "Name is required" }}
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
                name="password"
                placeholder="Enter your password"
                iconName="lock-closed"
                secureTextEntry
                rules={{ required: "Password is required" }}
              />
              {errors.password && (
                <Text className="text-xs text-primary-red m-0.5 mx-2">
                  {errors.password.message}
                </Text>
              )}
            </View>
          </View>
          <Button onPress={handleSubmit(onSubmit)} containerClassName="my-5">
            Sign up
          </Button>
          <Text className="text-center text-secondary-light-grey font-poppins-regular">
            or continue with
          </Text>
          <Button containerClassName="bg-transparent border-2 border-primary-orange my-5 ">
            <View className="flex-row items-center justify-center space-x-3">
              <Image
                source={require("@/assets/app_images/google.png")}
                className="w-6 h-6"
              />
              <Text className="font-poppins-semibold text-base text-primary-white">
                Google
              </Text>
            </View>
          </Button>
          <Text className="font-poppins-semibold text-secondary-light-grey text-center mb-5">
            Already have an account?{" "}
            <Link href="/(auth)/sign-in" className="text-primary-orange">
              Sign in
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
