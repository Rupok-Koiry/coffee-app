import { Tabs, withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBar from "@/components/HeaderBar";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import { Dimensions } from "react-native";

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function OrderListNavigator() {
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        backgroundColor: Colors[colorScheme].primaryBackgroundHex,
        flex: 1,
      }}
    >
      <HeaderBar title="Order History" />

      <TopTabs
        initialRouteName="active"
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme].primaryOrangeHex,
          tabBarLabelStyle: { fontSize: 16, fontFamily: "Poppins-Medium" },
          tabBarInactiveTintColor: Colors[colorScheme].secondaryTextHex,
          tabBarIndicatorStyle: {
            backgroundColor: Colors[colorScheme].primaryOrangeHex,
          },
          tabBarIndicatorContainerStyle: {
            backgroundColor: Colors[colorScheme].primaryBackgroundHex,
          },
          tabBarItemStyle: {
            width: Dimensions.get("window").width / 2,
          },
        }}
        sceneContainerStyle={{
          backgroundColor: Colors[colorScheme].primaryBackgroundHex,
        }}
      >
        <TopTabs.Screen name="active" options={{ title: "Active" }} />
        <TopTabs.Screen name="archive" options={{ title: "Archive" }} />
      </TopTabs>
    </SafeAreaView>
  );
}
