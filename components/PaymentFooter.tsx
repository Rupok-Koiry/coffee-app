import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Button from "./Button";

type PriceProps = {
  price: string;
  currency: string;
};

type PaymentFooterProps = {
  price: PriceProps;
  buttonPressHandler: () => void;
  buttonTitle: string;
};

const PaymentFooter: React.FC<PaymentFooterProps> = ({
  price,
  buttonPressHandler,
  buttonTitle,
}) => {
  return (
    <View
      className="flex-row items-center justify-between p-5"
      style={{ gap: 32 }}
    >
      <View className="items-center">
        <Text className="font-poppins-medium text-sm text-secondary-light-grey">
          Price
        </Text>
        <Text className="font-poppins-semibold text-2xl text-primary-orange">
          {price.currency}
          <Text className="text-primary-white">{price.price}</Text>
        </Text>
      </View>
      <Button containerClassName="flex-1" onPress={buttonPressHandler}>
        {buttonTitle}
      </Button>
    </View>
  );
};

export default PaymentFooter;
