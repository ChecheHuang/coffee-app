import { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { ChevronLeft, Heart, Coffee } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
  withSequence,
  withDelay,
  FadeInUp,
  Easing,
} from "react-native-reanimated";
import { Slider } from "../../components/Slider";
import { useAnimatedPress } from "@/hooks/useAnimatedPress";

const DRINK_DATA: Record<
  string,
  {
    name: string;
    bodyGradient: [string, string];
    params: {
      label: string;
      value: string;
      progress: number;
      disabled?: boolean;
    }[];
  }
> = {
  espresso: {
    name: "Espresso",
    bodyGradient: ["#5D4037", "#3E2723"],
    params: [
      { label: "溫度", value: "92°C", progress: 0.67 },
      { label: "濃度", value: "4/5", progress: 0.8 },
      { label: "杯量", value: "40ml", progress: 0.14 },
      { label: "研磨度", value: "中細", progress: 0.5 },
      { label: "奶泡量", value: "N/A", progress: 0, disabled: true },
    ],
  },
  latte: {
    name: "Latte",
    bodyGradient: ["#8B7355", "#6B5D52"],
    params: [
      { label: "溫度", value: "90°C", progress: 0.62 },
      { label: "濃度", value: "3/5", progress: 0.6 },
      { label: "杯量", value: "240ml", progress: 0.7 },
      { label: "研磨度", value: "中", progress: 0.5 },
      { label: "奶泡量", value: "厚", progress: 0.8 },
    ],
  },
  cappuccino: {
    name: "Cappuccino",
    bodyGradient: ["#7B6B5E", "#5D4037"],
    params: [
      { label: "溫度", value: "90°C", progress: 0.62 },
      { label: "濃度", value: "3/5", progress: 0.6 },
      { label: "杯量", value: "180ml", progress: 0.55 },
      { label: "研磨度", value: "中", progress: 0.5 },
      { label: "奶泡量", value: "厚實", progress: 0.85 },
    ],
  },
  "flat-white": {
    name: "Flat White",
    bodyGradient: ["#6B5D52", "#4E342E"],
    params: [
      { label: "溫度", value: "90°C", progress: 0.62 },
      { label: "濃度", value: "4/5", progress: 0.8 },
      { label: "杯量", value: "150ml", progress: 0.45 },
      { label: "研磨度", value: "中細", progress: 0.5 },
      { label: "奶泡量", value: "薄", progress: 0.3 },
    ],
  },
  americano: {
    name: "Americano",
    bodyGradient: ["#5D4037", "#3E2723"],
    params: [
      { label: "溫度", value: "93°C", progress: 0.7 },
      { label: "濃度", value: "2/5", progress: 0.4 },
      { label: "杯量", value: "200ml", progress: 0.6 },
      { label: "研磨度", value: "中", progress: 0.5 },
      { label: "奶泡量", value: "N/A", progress: 0, disabled: true },
    ],
  },
  mocha: {
    name: "Mocha",
    bodyGradient: ["#4E342E", "#3E2723"],
    params: [
      { label: "溫度", value: "88°C", progress: 0.57 },
      { label: "濃度", value: "3/5", progress: 0.6 },
      { label: "杯量", value: "240ml", progress: 0.7 },
      { label: "研磨度", value: "中粗", progress: 0.6 },
      { label: "奶泡量", value: "中", progress: 0.5 },
    ],
  },
};

const DEFAULT_DRINK = {
  name: "Coffee",
  bodyGradient: ["#5D4037", "#3E2723"] as [string, string],
  params: [
    { label: "溫度", value: "92°C", progress: 0.67 },
    { label: "濃度", value: "3/5", progress: 0.6 },
    { label: "杯量", value: "120ml", progress: 0.4 },
    { label: "研磨度", value: "中", progress: 0.5 },
    { label: "奶泡量", value: "N/A", progress: 0, disabled: true },
  ],
};

/** Screen 3: 飲品詳情 / 參數調整 (Drink Detail) — 對應 Pencil 設計稿 */
export default function DrinkDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const drink = DRINK_DATA[id ?? ""] ?? DEFAULT_DRINK;
  const [isFavorite, setIsFavorite] = useState(false);
  const [preInfusion, setPreInfusion] = useState(false);
  const [cupCount, setCupCount] = useState<"single" | "double">("single");
  const togglePosition = useSharedValue(0);
  const heartScale = useSharedValue(1);
  const heartPress = useAnimatedPress({ type: "opacity" });
  const savePress = useAnimatedPress({ type: "opacity" });

  const heartBounceStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const toggleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: togglePosition.value }],
  }));

  const handleTogglePreInfusion = () => {
    const next = !preInfusion;
    setPreInfusion(next);
    togglePosition.value = withTiming(next ? 20 : 0, { duration: 300 });
  };

  const handleFavoriteToggle = () => {
    setIsFavorite((prev) => !prev);
    heartScale.value = withSequence(
      withTiming(1.3, { duration: 150 }),
      withSpring(1, { damping: 10, stiffness: 200 }),
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-bg-primary">
      {/* NavHeader */}
      <View className="flex-row items-center justify-between px-7 py-2">
        <Pressable
          onPress={() => router.back()}
          className="h-11 w-11 items-center justify-center rounded-full border border-border bg-bg-card"
        >
          <ChevronLeft size={20} color="#F5F5F0" strokeWidth={1.5} />
        </Pressable>
        <Text className="font-display-medium text-xl text-text-primary">
          {drink.name}
        </Text>
        <Animated.View style={[heartPress.animatedStyle, heartBounceStyle]}>
          <Pressable
            className="h-11 w-11 items-center justify-center rounded-full border border-border bg-bg-card"
            onPress={handleFavoriteToggle}
            {...heartPress.pressHandlers}
          >
            <Heart
              size={20}
              color="#C9A962"
              strokeWidth={1.5}
              fill={isFavorite ? "#C9A962" : "none"}
            />
          </Pressable>
        </Animated.View>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Cup Illustration */}
        <CupIllustration gradient={drink.bodyGradient} />

        {/* Params Section */}
        <View className="gap-5 px-7" style={{ marginTop: 24 }}>
          <Text
            className="font-body-medium text-[11px] uppercase text-text-secondary"
            style={{ letterSpacing: 3 }}
          >
            沖煮參數
          </Text>
          {drink.params.map((param, i) => (
            <Animated.View
              key={param.label}
              entering={FadeInUp.delay(i * 80)
                .springify()
                .damping(20)
                .stiffness(150)}
            >
              <Slider
                label={param.label}
                value={param.value}
                progress={param.progress}
                disabled={param.disabled}
              />
            </Animated.View>
          ))}
        </View>

        {/* Advanced Options */}
        <Animated.View
          className="gap-4 px-7"
          style={{ marginTop: 24 }}
          entering={FadeInUp.delay(drink.params.length * 80 + 80)
            .springify()
            .damping(20)
            .stiffness(150)}
        >
          <Text
            className="font-body-medium text-[11px] uppercase text-text-secondary"
            style={{ letterSpacing: 3 }}
          >
            進階選項
          </Text>

          {/* 預浸泡 */}
          <View className="flex-row items-center justify-between">
            <Text className="font-body-medium text-[14px] text-text-primary">
              預浸泡
            </Text>
            <View className="flex-row items-center gap-2">
              <Pressable
                onPress={handleTogglePreInfusion}
                style={{
                  width: 48,
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: preInfusion ? "#C9A962" : "#3A3A3C",
                  justifyContent: "center",
                  paddingHorizontal: 4,
                }}
              >
                <Animated.View
                  style={[
                    {
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: "#FFFFFF",
                    },
                    toggleAnimatedStyle,
                  ]}
                />
              </Pressable>
              {preInfusion && (
                <Text className="font-body-medium text-[13px] text-gold">
                  3 秒
                </Text>
              )}
            </View>
          </View>

          {/* 杯數 */}
          <View className="flex-row items-center justify-between">
            <Text className="font-body-medium text-[14px] text-text-primary">
              杯數
            </Text>
            <View className="flex-row gap-2">
              <Pressable
                onPress={() => setCupCount("single")}
                className={`rounded-[20px] px-4 py-2 ${
                  cupCount === "single"
                    ? "bg-gold"
                    : "border border-border bg-bg-card"
                }`}
              >
                <Text
                  className={`font-body-medium text-[13px] ${
                    cupCount === "single"
                      ? "text-bg-primary"
                      : "text-text-secondary"
                  }`}
                >
                  單杯
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setCupCount("double")}
                className={`rounded-[20px] px-4 py-2 ${
                  cupCount === "double"
                    ? "bg-gold"
                    : "border border-border bg-bg-card"
                }`}
              >
                <Text
                  className={`font-body-medium text-[13px] ${
                    cupCount === "double"
                      ? "text-bg-primary"
                      : "text-text-secondary"
                  }`}
                >
                  雙杯
                </Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Bottom CTA */}
      <View
        className="gap-3 px-7 pb-8 pt-4"
        style={{ borderTopWidth: 1, borderTopColor: "#2A2A2C" }}
      >
        <Pressable
          className="h-14 overflow-hidden rounded-[20px]"
          onPress={() => router.push("/brew-progress")}
        >
          <LinearGradient
            colors={["#C9A962", "#8B7845"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="flex-1 flex-row items-center justify-center gap-2"
          >
            <Coffee size={20} color="#1A1A1C" strokeWidth={1.5} />
            <Text className="font-body-semibold text-base text-bg-primary">
              開始沖煮
            </Text>
          </LinearGradient>
        </Pressable>
        <Animated.View style={savePress.animatedStyle}>
          <Pressable
            className="items-center py-1"
            onPress={() => Alert.alert("已保存", "配方已保存成功")}
            {...savePress.pressHandlers}
          >
            <Text className="font-body-medium text-sm text-gold">
              保存為配方
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

/* ── Cup Illustration ───────────────────────────────────── */

function CupIllustration({ gradient }: { gradient: [string, string] }) {
  const steam1Opacity = useSharedValue(0);
  const steam2Opacity = useSharedValue(0);
  const steam1Y = useSharedValue(0);
  const steam2Y = useSharedValue(0);

  useEffect(() => {
    steam1Opacity.value = withRepeat(
      withSequence(
        withTiming(0.25, {
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(0.08, {
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
        }),
      ),
      -1,
      true,
    );
    steam1Y.value = withRepeat(
      withSequence(
        withTiming(-4, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
    steam2Opacity.value = withDelay(
      800,
      withRepeat(
        withSequence(
          withTiming(0.18, {
            duration: 2500,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(0.05, {
            duration: 2500,
            easing: Easing.inOut(Easing.ease),
          }),
        ),
        -1,
        true,
      ),
    );
    steam2Y.value = withDelay(
      800,
      withRepeat(
        withSequence(
          withTiming(-5, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        true,
      ),
    );
  }, []);

  const steam1Style = useAnimatedStyle(() => ({
    opacity: steam1Opacity.value,
    transform: [{ translateY: steam1Y.value }, { rotate: "3deg" }],
  }));

  const steam2Style = useAnimatedStyle(() => ({
    opacity: steam2Opacity.value,
    transform: [{ translateY: steam2Y.value }, { rotate: "-2deg" }],
  }));

  return (
    <View style={{ height: 180 }}>
      {/* Glow */}
      <View
        style={{
          position: "absolute",
          width: 120,
          height: 120,
          borderRadius: 60,
          backgroundColor: "#C9A962",
          opacity: 0.12,
          top: 10,
          left: "50%",
          marginLeft: -60,
        }}
      />

      {/* Steam 1 */}
      <Animated.View
        style={[
          {
            position: "absolute",
            width: 2,
            height: 24,
            backgroundColor: "#6E6E70",
            borderRadius: 1,
            top: 8,
            left: "50%",
            marginLeft: -18,
          },
          steam1Style,
        ]}
      />

      {/* Steam 2 */}
      <Animated.View
        style={[
          {
            position: "absolute",
            width: 2,
            height: 28,
            backgroundColor: "#6E6E70",
            borderRadius: 1,
            top: 4,
            left: "50%",
            marginLeft: -3,
          },
          steam2Style,
        ]}
      />

      {/* Cup Rim */}
      <View
        style={{
          position: "absolute",
          width: 84,
          height: 8,
          borderRadius: 4,
          backgroundColor: "#242426",
          borderWidth: 1,
          borderColor: "#3A3A3C",
          top: 35,
          left: "50%",
          marginLeft: -42,
        }}
      />

      {/* Cup Body */}
      <View
        style={{
          position: "absolute",
          width: 70,
          height: 85,
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          overflow: "hidden",
          top: 40,
          left: "50%",
          marginLeft: -35,
        }}
      >
        <LinearGradient
          colors={gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ flex: 1 }}
        />
      </View>

      {/* Cup Handle */}
      <View
        style={{
          position: "absolute",
          width: 20,
          height: 40,
          borderRightWidth: 2.5,
          borderTopWidth: 2.5,
          borderBottomWidth: 2.5,
          borderColor: "#3A3A3C",
          borderTopRightRadius: 12,
          borderBottomRightRadius: 12,
          top: 55,
          left: "50%",
          marginLeft: 35,
        }}
      />
    </View>
  );
}
