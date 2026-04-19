import { useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { StepIndicator } from "../../components/onboarding/StepIndicator";
import { GlowIcon } from "../../components/onboarding/GlowIcon";

/** Onboarding Step 2: 搜尋配對咖啡機 — 對應 Pencil hCVEB */
export default function OnboardingConnect() {
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.08, { duration: 1500 }),
        withTiming(1, { duration: 1500 }),
      ),
      -1,
      true,
    );
  }, [pulseScale]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  return (
    <SafeAreaView className="flex-1 bg-bg-primary">
      <View className="flex-1 items-center justify-center gap-10 px-7">
        <View className="items-center gap-4">
          <Animated.View style={pulseStyle}>
            <GlowIcon icon="wifi" />
          </Animated.View>
          <Text className="font-display text-2xl text-text-primary">
            搜尋附近的咖啡機
          </Text>
          <Text className="font-body text-base text-text-secondary">
            請確認咖啡機已開啟
          </Text>
        </View>

        <View className="gap-4">
          <View className="flex-row items-center gap-3">
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#6E9E6E",
              }}
            />
            <Text className="font-body text-sm text-text-primary">
              BrewMaster Pro
            </Text>
          </View>
          <View className="flex-row items-center gap-3">
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#6E9E6E",
              }}
            />
            <Text className="font-body text-sm text-text-secondary">
              信號強度：良好
            </Text>
          </View>
          <View className="flex-row items-center gap-3">
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#4A4A4C",
              }}
            />
            <Text className="font-body text-sm text-text-secondary">
              BrewMaster Mini
            </Text>
          </View>
        </View>

        <StepIndicator current={2} total={4} />

        <Pressable
          onPress={() => router.push("/onboarding/profile")}
          className="w-full items-center rounded-card bg-gold py-4"
        >
          <Text className="font-body-semibold text-base text-bg-primary">
            連線
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
