import { Alert } from "react-native";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";
import supabase from "./supabase";

const fetchPaymentSheetParams = async (amount: number) => {
  const { data, error } = await supabase.functions.invoke("payment-sheet", {
    body: { amount },
  });
  if (error) {
    console.error("Error fetching payment sheet params:", error);
    Alert.alert("Error fetching payment sheet params");
    return {};
  }
  return data;
};

export const initializePaymentSheet = async (amount: number) => {
  const { paymentIntent, publishableKey, customer, ephemeralKey } =
    await fetchPaymentSheetParams(amount);

  if (!paymentIntent || !publishableKey) {
    Alert.alert("Payment intent or publishable key is missing");
    return;
  }

  const { error } = await initPaymentSheet({
    merchantDisplayName: "Coffee App",
    paymentIntentClientSecret: paymentIntent,
    customerId: customer,
    customerEphemeralKeySecret: ephemeralKey,
  });

  if (error) {
    console.error("Error initializing payment sheet:", error);
    Alert.alert("Error initializing payment sheet");
  }
};

export const openPaymentSheet = async () => {
  const { error } = await presentPaymentSheet();

  if (error) {
    console.error("Error presenting payment sheet:", error);
    Alert.alert("Error presenting payment sheet");
    return false;
  }
  return true;
};
