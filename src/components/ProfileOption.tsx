import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "nativewind";
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
  const { colorScheme } = useColorScheme();
  const Content = (
    <View
      className={`flex-row justify-between items-center px-5 py-2`}
      style={{ width: Dimensions.get("window").width }}
    >
      <View className="flex-row items-center" style={{ gap: 20 }}>
        <LinearGradient
          colors={[
            Colors[colorScheme].secondaryGreyHex,
            Colors[colorScheme].primaryBackgroundHex,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="w-10 h-10 justify-center items-center"
          style={{ borderRadius: 12 }}
        >
          <Ionicons
            size={20}
            name={iconName}
            color={Colors[colorScheme].primaryOrangeHex}
          />
        </LinearGradient>
        <Text className="text-primary-text text-base font-poppins-medium">
          {label}
        </Text>
      </View>
      {extraContent || (
        <Ionicons
          name="chevron-forward"
          size={24}
          color={Colors[colorScheme].accentTextHex}
        />
      )}
    </View>
  );

  return link ? <Link href={link}>{Content}</Link> : <View>{Content}</View>;
};
export default ProfileOption;
