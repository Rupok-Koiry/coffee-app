import { COLORS } from "@/theme/theme";
import { Ionicons } from "@expo/vector-icons";
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
        borderLeftColor: COLORS.successGreenHex,
        marginBottom: 32,
        backgroundColor: COLORS.primaryDarkGreyHex,
      }}
      contentContainerStyle={{
        paddingHorizontal: 0,
      }}
      text1Style={{
        color: COLORS.secondaryLightGreyHex,
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
            color={COLORS.primaryRedHex}
          />
        </View>
      )}
    />
  ),
  success: ({ text1 = "", props }: ToastConfigParams<any>) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: COLORS.successGreenHex,
        marginBottom: 32,
        backgroundColor: COLORS.primaryDarkGreyHex,
      }}
      contentContainerStyle={{
        paddingHorizontal: 0,
      }}
      text1Style={{
        color: COLORS.secondaryLightGreyHex,
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
            color={COLORS.successGreenHex}
          />
        </View>
      )}
    />
  ),
};
