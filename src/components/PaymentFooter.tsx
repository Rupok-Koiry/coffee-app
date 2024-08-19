import { View, Text, TouchableOpacity } from "react-native";
import { useColorScheme } from "nativewind";
import React from "react";
import Button from "./Button";

type PaymentFooterProps = {
  price: number;
  buttonPressHandler: () => void;
  buttonTitle: string;
  isLoading?: boolean;
};

const PaymentFooter: React.FC<PaymentFooterProps> = ({
  price,
  buttonPressHandler,
  buttonTitle,
  isLoading,
}) => {
  const { colorScheme } = useColorScheme();
  return (
    <View
      className="flex-row items-center justify-between p-5"
      style={{ gap: 32 }}
    >
      <View className="items-center">
        <Text className="font-poppins-medium text-sm text-secondary-text">
          Price
        </Text>
        <Text className="font-poppins-semibold text-2xl text-primary-orange">
          $<Text className="text-primary-text">{price}</Text>
        </Text>
      </View>
      <Button
        containerClassName="flex-1"
        onPress={buttonPressHandler}
        disabled={isLoading}
        loading={isLoading}
      >
        {buttonTitle}
      </Button>
    </View>
  );
};

export default PaymentFooter;
