import { Tabs, withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBar from "@/components/HeaderBar";
import { COLORS } from "@/theme/theme";

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function OrderListNavigator() {
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-primary-black">
      <HeaderBar title="Order History" />

      <TopTabs
        initialRouteName="active"
        screenOptions={{
          tabBarActiveTintColor: COLORS.primaryOrangeHex,
          tabBarLabelStyle: { fontSize: 16, fontFamily: "Poppins-Medium" },
          tabBarInactiveTintColor: COLORS.secondaryLightGreyHex,
          tabBarIndicatorStyle: {
            backgroundColor: COLORS.primaryOrangeHex,
          },
          tabBarIndicatorContainerStyle: {
            backgroundColor: COLORS.primaryBlackHex,
          },
        }}
        sceneContainerStyle={{ backgroundColor: COLORS.primaryBlackHex }}
      >
        <TopTabs.Screen name="active" options={{ title: "Active" }} />
        <TopTabs.Screen name="archive" options={{ title: "Archive" }} />
      </TopTabs>
    </SafeAreaView>
  );
}
