import { COLORS } from "@/theme/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Dimensions, Text, View } from "react-native";

interface ProfileOptionProps {
  iconName: keyof typeof Ionicons.glyphMap;
  label: string;
  link?: string;
  extraContent?: React.ReactNode;
}

const ProfileOption: React.FC<ProfileOptionProps> = ({
  iconName,
  label,
  link,
  extraContent,
}) => {
  const Content = (
    <View
      className={`flex-row justify-between items-center px-5 py-4`}
      style={{ width: Dimensions.get("window").width }}
    >
      <View className="flex-row items-center space-x-5">
        <LinearGradient
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="w-12 h-12 justify-center items-center rounded-xl"
        >
          <Ionicons size={24} name={iconName} color={COLORS.primaryOrangeHex} />
        </LinearGradient>
        <Text className="text-primary-white text-lg font-poppins-semibold">
          {label}
        </Text>
      </View>
      {extraContent || (
        <Ionicons
          name="chevron-forward"
          size={24}
          color={COLORS.primaryLightGreyHex}
        />
      )}
    </View>
  );

  return link ? <Link href={link}>{Content}</Link> : <View>{Content}</View>;
};
export default ProfileOption;
