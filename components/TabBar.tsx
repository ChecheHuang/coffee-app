import { useEffect, useState } from "react";
import { View, Pressable, type LayoutChangeEvent } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from "react-native-reanimated";
import {
  House,
  Coffee,
  BookOpen,
  ChartBar,
  Settings,
} from "lucide-react-native";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { colors, tabBar } from "@/constants/theme";

const TAB_ICONS: Record<string, typeof House> = {
  index: House,
  drinks: Coffee,
  recipes: BookOpen,
  stats: ChartBar,
  settings: Settings,
};

const SPRING_CONFIG = { damping: 18, stiffness: 160, mass: 0.8 };

function TabBarItem({
  route,
  isFocused,
  label,
  onPress,
}: {
  route: { name: string };
  isFocused: boolean;
  label: string;
  onPress: () => void;
}) {
  const Icon = TAB_ICONS[route.name];
  const progress = useSharedValue(isFocused ? 1 : 0);

  useEffect(() => {
    progress.value = withSpring(isFocused ? 1 : 0, SPRING_CONFIG);
  }, [isFocused]);

  const textStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [colors.textSecondary, "#1A1A1C"]
    );
    return { color };
  });

  return (
    <Pressable
      key={route.name}
      onPress={onPress}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        height: "100%",
      }}
    >
      {Icon && (
        <AnimatedIcon
          Icon={Icon}
          progress={progress}
          size={tabBar.iconSize}
        />
      )}
      <Animated.Text
        style={[
          {
            fontFamily: isFocused ? "Inter_600SemiBold" : "Inter_500Medium",
            fontSize: tabBar.labelSize,
            textTransform: "uppercase",
            letterSpacing: 0.5,
          },
          textStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
}

function AnimatedIcon({
  Icon,
  progress,
  size,
}: {
  Icon: typeof House;
  progress: Animated.SharedValue<number>;
  size: number;
}) {
  const inactiveStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
  }));

  const activeStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
  }));

  return (
    <View style={{ width: size, height: size }}>
      <Animated.View style={[{ position: "absolute" }, inactiveStyle]}>
        <Icon size={size} color={colors.textSecondary} strokeWidth={1.5} />
      </Animated.View>
      <Animated.View style={[{ position: "absolute" }, activeStyle]}>
        <Icon size={size} color="#1A1A1C" strokeWidth={1.5} />
      </Animated.View>
    </View>
  );
}

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const tabCount = state.routes.length;
  const [containerWidth, setContainerWidth] = useState(0);
  const indicatorPosition = useSharedValue(state.index);

  useEffect(() => {
    indicatorPosition.value = withSpring(state.index, SPRING_CONFIG);
  }, [state.index]);

  // Container has padding: 4 on each side, so inner width is containerWidth - 8
  const innerWidth = Math.max(0, containerWidth - 8);
  const tabWidth = innerWidth / tabCount;

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorPosition.value * tabWidth }],
    width: tabWidth,
  }));

  const onContainerLayout = (e: LayoutChangeEvent) => {
    setContainerWidth(e.nativeEvent.layout.width);
  };

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
        onLayout={onContainerLayout}
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
        {/* 滑動金色指示器 */}
        {containerWidth > 0 && (
          <Animated.View
            style={[
              {
                position: "absolute",
                left: 4,
                top: 4,
                bottom: 4,
                borderRadius: tabBar.itemRadius,
                backgroundColor: colors.gold,
              },
              indicatorStyle,
            ]}
          />
        )}

        {/* Tab items */}
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.title ?? route.name;
          const isFocused = state.index === index;

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
            <TabBarItem
              key={route.key}
              route={route}
              isFocused={isFocused}
              label={label}
              onPress={onPress}
            />
          );
        })}
      </View>
    </View>
  );
}
