import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { colorScheme } from "nativewind";
import { View } from "react-native";
import Toast, {
  BaseToast,
  ToastConfig,
  ToastConfigParams,
} from "react-native-toast-message";
export const toastConfig: ToastConfig = {
  error: ({ text1 = "", props }: ToastConfigParams<any>) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: Colors[colorScheme.get()].successGreenHex,
        marginBottom: 32,
        backgroundColor: Colors[colorScheme.get()].secondaryBackgroundHex,
      }}
      contentContainerStyle={{
        paddingHorizontal: 0,
      }}
      text1Style={{
        color: Colors[colorScheme.get()].secondaryTextHex,
        fontSize: 14,
        fontWeight: 500,
      }}
      text1={text1}
      renderLeadingIcon={() => (
        <View
          style={{
            padding: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="close-circle"
            size={24}
            color={Colors[colorScheme.get()].primaryRedHex}
          />
        </View>
      )}
    />
  ),
  success: ({ text1 = "", props }: ToastConfigParams<any>) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: Colors[colorScheme.get()].successGreenHex,
        marginBottom: 32,
        backgroundColor: Colors[colorScheme.get()].secondaryBackgroundHex,
      }}
      contentContainerStyle={{
        paddingHorizontal: 0,
      }}
      text1Style={{
        color: Colors[colorScheme.get()].secondaryTextHex,
        fontSize: 14,
        fontWeight: 500,
      }}
      text1={text1}
      renderLeadingIcon={() => (
        <View
          style={{
            padding: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="checkmark-circle"
            size={24}
            color={Colors[colorScheme.get()].successGreenHex}
          />
        </View>
      )}
    />
  ),
};
