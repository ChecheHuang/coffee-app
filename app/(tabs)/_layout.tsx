import { Tabs } from "expo-router";
import { View, Pressable, Text } from "react-native";
import {
  House,
  Coffee,
  BookOpen,
  ChartBar,
  Settings,
} from "lucide-react-native";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { colors, tabBar } from "../../src/constants/theme";

const TAB_ICONS: Record<string, typeof House> = {
  index: House,
  drinks: Coffee,
  recipes: BookOpen,
  stats: ChartBar,
  settings: Settings,
};

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View
      style={{
        backgroundColor: colors.background,
        paddingTop: tabBar.padding.top,
        paddingRight: tabBar.padding.right,
        paddingBottom: tabBar.padding.bottom,
        paddingLeft: tabBar.padding.left,
      }}
    >
      {/* Pill 膠囊容器 */}
      <View
        style={{
          backgroundColor: colors.card,
          borderRadius: tabBar.pillRadius,
          borderWidth: 1,
          borderColor: colors.border,
          padding: 4,
          height: tabBar.height,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.title ?? route.name;
          const isFocused = state.index === index;
          const Icon = TAB_ICONS[route.name];

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                height: "100%",
                borderRadius: tabBar.itemRadius,
                backgroundColor: isFocused ? colors.gold : "transparent",
              }}
            >
              {Icon && (
                <Icon
                  size={tabBar.iconSize}
                  color={isFocused ? "#1A1A1C" : colors.textSecondary}
                  strokeWidth={1.5}
                />
              )}
              <Text
                style={{
                  fontFamily: isFocused ? "Inter_600SemiBold" : "Inter_500Medium",
                  fontSize: tabBar.labelSize,
                  color: isFocused ? "#1A1A1C" : colors.textSecondary,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

/** 自訂 Tab Bar — Pill 膠囊造型，對應 Pencil 設計稿 */
export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="drinks" options={{ title: "Drinks" }} />
      <Tabs.Screen name="recipes" options={{ title: "Recipes" }} />
      <Tabs.Screen name="stats" options={{ title: "Stats" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
    </Tabs>
  );
}
