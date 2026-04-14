import { Tabs } from "expo-router";
import {
  House,
  Coffee,
  BookOpen,
  ChartBar,
  Settings,
} from "lucide-react-native";
import { colors, tabBar } from "../../src/constants/theme";

/** 自訂 Tab Bar — Pill 膠囊造型，對應 Pencil 設計稿 */
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#1A1A1C",
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 0,
          paddingTop: tabBar.padding.top,
          paddingBottom: tabBar.padding.bottom,
          paddingHorizontal: tabBar.padding.left,
          height: tabBar.height + tabBar.padding.top + tabBar.padding.bottom,
        },
        tabBarItemStyle: {
          borderRadius: tabBar.itemRadius,
          margin: 2,
        },
        tabBarActiveBackgroundColor: colors.gold,
        tabBarLabelStyle: {
          fontFamily: "Inter_500Medium",
          fontSize: tabBar.labelSize,
          textTransform: "uppercase",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "首頁",
          tabBarIcon: ({ color, size }) => (
            <House size={size} color={color} strokeWidth={1.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="drinks"
        options={{
          title: "飲品",
          tabBarIcon: ({ color, size }) => (
            <Coffee size={size} color={color} strokeWidth={1.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="recipes"
        options={{
          title: "配方",
          tabBarIcon: ({ color, size }) => (
            <BookOpen size={size} color={color} strokeWidth={1.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "統計",
          tabBarIcon: ({ color, size }) => (
            <ChartBar size={size} color={color} strokeWidth={1.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "設定",
          tabBarIcon: ({ color, size }) => (
            <Settings size={size} color={color} strokeWidth={1.5} />
          ),
        }}
      />
    </Tabs>
  );
}
