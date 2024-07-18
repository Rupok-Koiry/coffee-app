import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

type PriceProps = {
  price: string;
  currency: string;
};

type PaymentFooterProps = {
  price: PriceProps;
  buttonPressHandler: any;
  buttonTitle: string;
};

const PaymentFooter: React.FC<PaymentFooterProps> = ({
  price,
  buttonPressHandler,
  buttonTitle,
}) => {
  return (
    <View className="flex-row items-center justify-center space-x-5 p-5">
      <View className="items-center w-24">
        <Text className="font-medium text-sm text-secondary-light-grey">
          Price
        </Text>
        <Text className="font-semibold text-2xl text-primary-orange">
          {price.currency}{" "}
          <Text className="text-primary-white">{price.price}</Text>
        </Text>
      </View>
      <TouchableOpacity
        className="bg-primary-orange flex-1 items-center justify-center h-14 rounded-2xl"
        onPress={() => buttonPressHandler()}
      >
        <Text className="font-semibold text-lg text-primary-white">
          {buttonTitle}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentFooter;
