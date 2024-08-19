import React from "react";
import { Text, ScrollView, StatusBar, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, SubmitHandler } from "react-hook-form";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useLogin } from "@/hooks/auth/useLogin";
import withGuest from "@/utils/withGuest";
import { useColorScheme } from "nativewind";

interface FormValues {
  email: string;
  password: string;
}

const SignInScreen: React.FC = () => {
  const { colorScheme } = useColorScheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const { login, isPending } = useLogin();
  const onSubmit: SubmitHandler<FormValues> = (data) => login(data);
  return (
    <SafeAreaView
      className="bg-primary-background flex-1"
      style={{ backgroundColor: Colors[colorScheme].primaryBackgroundHex }}
    >
      <StatusBar backgroundColor={Colors[colorScheme].primaryBackgroundHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 justify-center px-5">
          <Image
            source={require("@/assets/app_images/logo.png")}
            className="w-36 h-36 self-center"
          />
          <Text className="font-poppins-semibold text-3xl text-primary-text mb-5">
            Hey, Welcome Back
          </Text>
          <View style={{ gap: 20 }}>
            <View>
              <Input<FormValues>
                control={control}
                name="email"
                placeholder="Enter your Email"
                iconName="mail"
                rules={{ required: "Email is required" }}
                keyboardType="email-address"
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
          {/* <Link
            href="/"
            className="text-right text-secondary-text mt-3 font-poppins-semibold"
          >
            Forgot Password?
          </Link> */}
          <Button
            onPress={handleSubmit(onSubmit)}
            containerClassName="my-5"
            disabled={isPending}
            loading={isPending}
          >
            Login
          </Button>
          {/*  <Text className="text-center text-secondary-text font-poppins-regular">
            or continue with
          </Text> 
          <Button containerClassName="my-5" outline>
            <View className="flex-row items-center justify-center space-x-3">
              <Image
                source={require("@/assets/app_images/google.png")}
                className="w-6 h-6"
              />
              <Text className="font-poppins-semibold text-base text-primary-text">
                Google
              </Text>
            </View>
          </Button>*/}
          <Text className="font-poppins-semibold text-secondary-text text-center">
            Don't have an account?{" "}
            <Link href="/(auth)/sign-up" className="text-primary-orange">
              Sign up
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default withGuest(SignInScreen);
