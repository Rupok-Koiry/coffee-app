import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";
import supabase from "./supabase";
import Toast from "react-native-toast-message";

// Fetch payment sheet parameters from Supabase function
const fetchPaymentSheetParams = async (amount: number) => {
  const { data, error } = await supabase.functions.invoke("payment-sheet", {
    body: { amount }, // Pass the payment amount to the function
  });

  if (error) {
    // Log the error and show a toast message for user feedback
    console.error("Error fetching payment sheet parameters:", error);
    Toast.show({
      type: "error",
      text1: "There was an issue retrieving payment details.",
    });
    return {}; // Return an empty object to handle error cases downstream
  }

  return data; // Return the fetched data on successful request
};

// Initialize the Stripe Payment Sheet
export const initializePaymentSheet = async (amount: number) => {
  // Fetch required payment sheet parameters
  const { paymentIntent, publishableKey, customer, ephemeralKey } =
    await fetchPaymentSheetParams(amount);

  // Check if essential parameters are missing
  if (!paymentIntent || !publishableKey) {
    Toast.show({
      type: "error",
      text1: "Payment setup incomplete.",
    });
    console.error("Payment intent or publishable key is missing.");
    return;
  }

  // Initialize the payment sheet with the retrieved parameters
  const { error } = await initPaymentSheet({
    merchantDisplayName: "Coffee App", // Display name shown in the payment sheet
    paymentIntentClientSecret: paymentIntent,
    customerId: customer,
    customerEphemeralKeySecret: ephemeralKey,
  });

  // Handle errors during initialization
  if (error) {
    console.error("Error initializing payment sheet:", error);
    Toast.show({
      type: "error",
      text1: "There was an issue setting up the payment.",
    });
  }
};

// Present the initialized payment sheet to the user
export const openPaymentSheet = async () => {
  const { error } = await presentPaymentSheet();

  // Handle errors during payment sheet presentation
  if (error) {
    console.error("Error presenting payment sheet:", error);
    Toast.show({
      type: "error",
      text1: "There was an issue processing the payment.",
    });
    return false; // Indicate that the payment process failed
  }

  return true; // Indicate that the payment process was successful
};
