import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  Easing,
} from "react-native-reanimated";
import { useEffect } from "react";
import { router } from "expo-router";
import {
  User,
  Bell,
  ChevronDown,
  Coffee,
  Clock,
  Zap,
  Check,
} from "lucide-react-native";
import { useAnimatedPress } from "@/hooks/useAnimatedPress";

/** Screen 1: 首頁 (Home) — 對應 Pencil 設計稿 */
export default function HomeScreen() {
  const bellPress = useAnimatedPress({ type: "opacity" });
  const machinePress = useAnimatedPress({ type: "scale" });

  return (
    <SafeAreaView className="flex-1 bg-bg-primary">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* User Header */}
        <View className="flex-row items-center justify-between px-7">
          <View className="flex-row items-center gap-2.5">
            <View className="h-11 w-11 items-center justify-center rounded-full border border-gold bg-bg-card">
              <User size={22} color="#C9A962" strokeWidth={1.5} />
            </View>
            <Text className="font-display-medium text-xl text-text-primary">
              Bennett
            </Text>
            <ChevronDown size={14} color="#6E6E70" strokeWidth={1.5} />
          </View>
          <Animated.View style={bellPress.animatedStyle}>
            <Pressable
              className="h-11 w-11 items-center justify-center rounded-full border border-border bg-bg-card"
              onPress={() => Alert.alert("通知", "通知功能即將推出")}
              {...bellPress.pressHandlers}
            >
              <Bell size={20} color="#6E6E70" strokeWidth={1.5} />
            </Pressable>
          </Animated.View>
        </View>

        {/* Greeting */}
        <View className="mt-7 px-7">
          <Text className="font-display text-[36px] text-text-primary">
            Good Morning ☀️
          </Text>
          <Text className="mt-1.5 font-body text-sm text-text-secondary">
            來杯咖啡開始美好的一天
          </Text>
        </View>

        {/* Quick Brew Button */}
        <BrewButton />

        {/* AI Suggestions */}
        <View className="mt-7 px-7">
          <SectionHeader title="AI 為你推薦" />
          <View className="mt-4 flex-row gap-3">
            <SuggestionCard
              icon={<Clock size={18} color="#C9A962" strokeWidth={1.5} />}
              label="午後時光"
              title="冰拿鐵"
              description="天氣溫暖，適合冰飲"
              drinkId="latte"
            />
            <SuggestionCard
              icon={<Zap size={18} color="#C9A962" strokeWidth={1.5} />}
              label="提神推薦"
              title="雙份濃縮"
              description="提升專注力的最佳選擇"
              drinkId="espresso"
            />
          </View>
        </View>

        {/* Machine Status */}
        <View className="mt-7 px-7">
          <SectionHeader title="機器狀態" />
          <Animated.View style={machinePress.animatedStyle}>
            <Pressable
              className="mt-4 gap-4 rounded-card border border-border bg-bg-card p-5"
              onPress={() => Alert.alert("機器狀態", "機器詳細狀態即將推出")}
              {...machinePress.pressHandlers}
            >
              <View className="flex-row gap-4">
                <MachineItem label="💧 水箱" value="78%" progress={78} />
                <MachineItem
                  label="🫘 咖啡豆"
                  value="45%"
                  progress={45}
                  warning
                />
              </View>
              <View className="flex-row gap-4">
                <MachineItem
                  label="🗑️ 渣盒"
                  value="3/12"
                  progress={25}
                  success
                />
                <MachineItem label="✨ 除垢" value="正常" success checkmark />
              </View>
            </Pressable>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ── Sub-components ────────────────────────────────────── */

function BrewButton() {
  // Glow starts at button center (x=108) and slides to final position (x=196.5)
  // Using translateX offset: 196.5 - 108 = 88.5, so glow starts shifted left by ~88px
  const glowOpacity = useSharedValue(0);
  const glowTranslateX = useSharedValue(-88);
  const btnOpacity = useSharedValue(0);
  const btnScale = useSharedValue(0.85);

  useEffect(() => {
    // 1. Button: spring bounce in
    btnOpacity.value = withTiming(1, { duration: 300 });
    btnScale.value = withSpring(1, { damping: 12, stiffness: 180, mass: 0.8 });

    // 2. Glow: after button lands, fade in + slide out from button to final position
    glowOpacity.value = withDelay(
      350,
      withTiming(0.25, { duration: 500, easing: Easing.out(Easing.ease) }),
    );
    glowTranslateX.value = withDelay(
      350,
      withTiming(0, { duration: 600, easing: Easing.out(Easing.cubic) }),
    );
  }, []);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
    transform: [{ translateX: glowTranslateX.value }],
  }));

  const btnStyle = useAnimatedStyle(() => ({
    opacity: btnOpacity.value,
    transform: [{ scale: btnScale.value }],
  }));

  return (
    <View className="mt-7" style={{ height: 160 }}>
      {/* Glow — Animated.View for animation, inner View for CSS gradient */}
      <Animated.View
        style={[
          {
            position: "absolute",
            left: "50%",
            marginLeft: -80,
            top: 0,
            width: 160,
            height: 160,
          },
          glowStyle,
        ]}
      >
        <View
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,98,1) 0%, transparent 70%)",
          }}
        />
      </Animated.View>
      {/* Brew button — spring bounce entrance */}
      <Animated.View
        style={[
          {
            position: "absolute",
            left: 48,
            top: 20,
            width: 120,
            height: 120,
            borderRadius: 9999,
            overflow: "hidden",
          },
          btnStyle,
        ]}
      >
        <Pressable
          className="flex-1 border-2 border-gold rounded-full overflow-hidden"
          onPress={() => router.push("/brew-progress")}
        >
          <LinearGradient
            colors={["#C9A962", "#8B7845"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="flex-1 items-center justify-center gap-1"
          >
            <Coffee size={28} color="#1A1A1C" strokeWidth={1.5} />
            <Text className="font-body-semibold text-[13px] text-bg-primary">
              一鍵沖煮
            </Text>
            <Text className="font-body text-[10px] text-bg-primary/60">
              上次：Latte
            </Text>
          </LinearGradient>
        </Pressable>
      </Animated.View>
    </View>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <View className="flex-row items-center gap-3">
      <View className="h-px flex-1 bg-border" />
      <Text
        className="font-body-medium text-[11px] uppercase text-text-secondary"
        style={{ letterSpacing: 3 }}
      >
        {title}
      </Text>
      <View className="h-px flex-1 bg-border" />
    </View>
  );
}

function SuggestionCard({
  icon,
  label,
  title,
  description,
  drinkId,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  description: string;
  drinkId?: string;
}) {
  const { animatedStyle, pressHandlers } = useAnimatedPress({ type: "scale" });

  return (
    <Animated.View className="flex-1" style={animatedStyle}>
      <Pressable
        className="flex-1 gap-2.5 rounded-card border border-border bg-bg-card p-4"
        onPress={() => {
          if (drinkId) {
            router.push(`/drink/${drinkId}`);
          }
        }}
        {...pressHandlers}
      >
        <View className="flex-row items-center gap-2">
          <View className="h-8 w-8 items-center justify-center rounded-2xl bg-bg-expanded">
            {icon}
          </View>
          <Text className="font-body text-[11px] text-text-secondary">
            {label}
          </Text>
        </View>
        <Text className="font-display-medium text-xl text-text-primary">
          {title}
        </Text>
        <Text className="font-body text-[11px] text-text-secondary">
          {description}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

function MachineItem({
  label,
  value,
  progress,
  warning = false,
  success = false,
  checkmark = false,
}: {
  label: string;
  value: string;
  progress?: number;
  warning?: boolean;
  success?: boolean;
  checkmark?: boolean;
}) {
  const valueColor = warning
    ? "text-warning"
    : success
      ? "text-success"
      : "text-text-primary";
  const barColor = warning
    ? "bg-warning"
    : success
      ? "bg-success"
      : "bg-gold";

  return (
    <View className="flex-1 gap-1.5">
      <Text className="font-body text-xs text-text-secondary">{label}</Text>
      <View className="flex-row items-center gap-1.5">
        <Text className={`font-display-medium text-xl ${valueColor}`}>
          {value}
        </Text>
        {checkmark && <Check size={16} color="#6E9E6E" strokeWidth={2} />}
      </View>
      {progress != null && (
        <View className="h-1 overflow-hidden rounded-[2px] bg-bg-expanded">
          <View
            className={`h-full rounded-[2px] ${barColor}`}
            style={{ width: `${progress}%` }}
          />
        </View>
      )}
    </View>
  );
}
