import { useState } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { StepIndicator } from "../../components/onboarding/StepIndicator";
import { GlowIcon } from "../../components/onboarding/GlowIcon";

type Taste = "strong" | "medium" | "light";

const TASTE_OPTIONS: { key: Taste; label: string }[] = [
  { key: "strong", label: "偏濃" },
  { key: "medium", label: "適中" },
  { key: "light", label: "偏淡" },
];

/** Onboarding Step 3: 建立個人檔案 — 對應 Pencil l7CVp */
export default function OnboardingProfile() {
  const [nickname, setNickname] = useState("");
  const [taste, setTaste] = useState<Taste>("medium");

  return (
    <SafeAreaView className="flex-1 bg-bg-primary">
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
              {TASTE_OPTIONS.map((opt) => (
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
          onPress={() => router.push("/onboarding/first-drink")}
          className="w-full items-center rounded-card bg-gold py-4"
        >
          <Text className="font-body-semibold text-base text-bg-primary">
            下一步
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
