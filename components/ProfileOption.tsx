import { COLORS } from "@/theme/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Dimensions, Text, View } from "react-native";

type ProfileOptionProps = {
  iconName: keyof typeof Ionicons.glyphMap;
  label: string;
  link?: string;
  extraContent?: React.ReactNode;
};

const ProfileOption: React.FC<ProfileOptionProps> = ({
  iconName,
  label,
  link,
  extraContent,
}) => {
  const Content = (
    <View
      className={`flex-row justify-between items-center px-5 py-2`}
      style={{ width: Dimensions.get("window").width }}
    >
      <View className="flex-row items-center space-x-5">
        <LinearGradient
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="w-10 h-10 justify-center items-center rounded-xl"
        >
          <Ionicons size={20} name={iconName} color={COLORS.primaryOrangeHex} />
        </LinearGradient>
        <Text className="text-primary-white text-base font-poppins-medium">
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
