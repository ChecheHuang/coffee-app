import { useState } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Coffee, Wifi, User } from "lucide-react-native";
import Animated, {
  FadeInRight,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { PRESET_DRINKS } from "@/constants/drinks";

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <View className="flex-row items-center justify-center gap-2">
      {Array.from({ length: total }, (_, i) => {
        const isActive = i + 1 === current;
        return isActive ? (
          <View
            key={i}
            style={{ width: 24, height: 8, borderRadius: 4, backgroundColor: "#C9A962" }}
          />
        ) : (
          <View
            key={i}
            style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#3A3A3C" }}
          />
        );
      })}
    </View>
  );
}

function GlowIcon({ icon }: { icon: "coffee" | "wifi" | "user" }) {
  const Icons = { coffee: Coffee, wifi: Wifi, user: User };
  const Icon = Icons[icon];
  return (
    <View style={{ width: 140, height: 140, alignItems: "center", justifyContent: "center" }}>
      <View
        style={{
          position: "absolute",
          width: 140,
          height: 140,
          borderRadius: 70,
          backgroundColor: "#C9A962",
          opacity: 0.15,
        }}
      />
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#C9A962",
        }}
      >
        <Icon size={44} color="#1A1A1C" strokeWidth={1.5} />
      </View>
    </View>
  );
}

/* ── Step 1: 歡迎 ────────────────────────────── */

function Step1({ onNext }: { onNext: () => void }) {
  return (
    <View className="flex-1 items-center justify-center gap-10 px-7">
      <View className="items-center gap-4">
        <View className="h-24 w-24 items-center justify-center rounded-full bg-gold">
          <Coffee size={48} color="#1A1A1C" strokeWidth={1.5} />
        </View>
        <Text className="font-display text-4xl text-text-primary">
          BrewMaster Pro
        </Text>
        <Text className="font-body text-base text-text-secondary">
          您的專屬咖啡管家
        </Text>
      </View>

      <View className="gap-5">
        {["遠端操控，一鍵沖煮", "個人化配方，專屬口味", "AI 智能推薦，發現驚喜"].map(
          (text) => (
            <View key={text} className="flex-row items-center gap-3">
              <View className="h-2 w-2 rounded-full bg-gold" />
              <Text className="font-body text-sm text-text-primary">
                {text}
              </Text>
            </View>
          ),
        )}
      </View>

      <StepIndicator current={1} total={4} />

      <Pressable
        onPress={onNext}
        className="w-full items-center rounded-card bg-gold py-4"
      >
        <Text className="font-body-semibold text-base text-bg-primary">
          開始體驗
        </Text>
      </Pressable>
    </View>
  );
}

/* ── Step 2: 搜尋配對咖啡機 ───────────────────── */

function Step2({ onNext }: { onNext: () => void }) {
  const pulseScale = useSharedValue(1);

  useState(() => {
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.08, { duration: 1500 }),
        withTiming(1, { duration: 1500 }),
      ),
      -1,
      true,
    );
  });

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  return (
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
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#6E9E6E" }} />
          <Text className="font-body text-sm text-text-primary">
            BrewMaster Pro
          </Text>
        </View>
        <View className="flex-row items-center gap-3">
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#6E9E6E" }} />
          <Text className="font-body text-sm text-text-secondary">
            信號強度：良好
          </Text>
        </View>
        <View className="flex-row items-center gap-3">
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#4A4A4C" }} />
          <Text className="font-body text-sm text-text-secondary">
            BrewMaster Mini
          </Text>
        </View>
      </View>

      <StepIndicator current={2} total={4} />

      <Pressable
        onPress={onNext}
        className="w-full items-center rounded-card bg-gold py-4"
      >
        <Text className="font-body-semibold text-base text-bg-primary">
          連線
        </Text>
      </Pressable>
    </View>
  );
}

/* ── Step 3: 建立個人檔案 ─────────────────────── */

function Step3({ onNext }: { onNext: () => void }) {
  const [nickname, setNickname] = useState("");
  const [taste, setTaste] = useState<"strong" | "medium" | "light">("medium");

  const tasteOptions = [
    { key: "strong" as const, label: "偏濃" },
    { key: "medium" as const, label: "適中" },
    { key: "light" as const, label: "偏淡" },
  ];

  return (
    <View className="flex-1 items-center justify-center gap-10 px-7">
      <View className="items-center gap-4">
        <GlowIcon icon="user" />
        <Text className="font-display text-2xl text-text-primary">
          建立個人檔案
        </Text>
        <Text className="font-body text-base text-text-secondary">
          讓我們更了解你的喜好
        </Text>
      </View>

      <View className="w-full gap-4">
        <TextInput
          className="w-full rounded-[16px] p-4 font-body text-sm text-text-primary"
          style={{ backgroundColor: "#2A2A2C" }}
          placeholder="輸入您的暱稱"
          placeholderTextColor="#4A4A4C"
          value={nickname}
          onChangeText={setNickname}
        />

        <View className="gap-2">
          <Text className="font-body text-sm text-text-secondary">
            口味偏好
          </Text>
          <View className="flex-row gap-2">
            {tasteOptions.map((opt) => (
              <Pressable
                key={opt.key}
                onPress={() => setTaste(opt.key)}
                className={`rounded-[20px] px-4 py-2 ${
                  taste === opt.key
                    ? "bg-gold"
                    : "border border-border bg-bg-card"
                }`}
              >
                <Text
                  className={`font-body-medium text-[13px] ${
                    taste === opt.key
                      ? "text-bg-primary"
                      : "text-text-secondary"
                  }`}
                >
                  {opt.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>

      <StepIndicator current={3} total={4} />

      <Pressable
        onPress={onNext}
        className="w-full items-center rounded-card bg-gold py-4"
      >
        <Text className="font-body-semibold text-base text-bg-primary">
          下一步
        </Text>
      </Pressable>
    </View>
  );
}

/* ── Step 4: 選擇第一杯 ──────────────────────── */

function Step4() {
  const [selectedDrink, setSelectedDrink] = useState(PRESET_DRINKS[0]?.id ?? "espresso");

  return (
    <View className="flex-1 items-center justify-center gap-10 px-7">
      <View className="items-center gap-4">
        <GlowIcon icon="coffee" />
        <Text className="font-display text-2xl text-text-primary">
          選擇你的第一杯
        </Text>
        <Text className="font-body text-base text-text-secondary">
          可以之後在飲品頁變更
        </Text>
      </View>

      <View className="flex-row flex-wrap justify-center gap-2">
        {PRESET_DRINKS.map((drink) => (
          <Pressable
            key={drink.id}
            onPress={() => setSelectedDrink(drink.id)}
            className={`rounded-[20px] px-4 py-2 ${
              selectedDrink === drink.id
                ? "bg-gold"
                : "border border-border bg-bg-card"
            }`}
          >
            <Text
              className={`font-body-medium text-[13px] ${
                selectedDrink === drink.id
                  ? "text-bg-primary"
                  : "text-text-secondary"
              }`}
            >
              {drink.name}
            </Text>
          </Pressable>
        ))}
      </View>

      <StepIndicator current={4} total={4} />

      <Pressable
        onPress={() => router.replace("/(tabs)")}
        className="w-full items-center rounded-card bg-gold py-4"
      >
        <Text className="font-body-semibold text-base text-bg-primary">
          開始使用
        </Text>
      </Pressable>
    </View>
  );
}

/* ── Main Screen ─────────────────────────────── */

/** Screen 10-15: Onboarding 多步驟引導頁 */
export default function OnboardingScreen() {
  const [step, setStep] = useState(1);

  return (
    <SafeAreaView className="flex-1 bg-bg-primary">
      <Animated.View key={step} className="flex-1" entering={FadeInRight.duration(300)}>
        {step === 1 && <Step1 onNext={() => setStep(2)} />}
        {step === 2 && <Step2 onNext={() => setStep(3)} />}
        {step === 3 && <Step3 onNext={() => setStep(4)} />}
        {step === 4 && <Step4 />}
      </Animated.View>
    </SafeAreaView>
  );
}
