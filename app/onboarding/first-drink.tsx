import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { PRESET_DRINKS } from "@/constants/drinks";
import { StepIndicator } from "../../components/onboarding/StepIndicator";
import { GlowIcon } from "../../components/onboarding/GlowIcon";

/** Onboarding Step 4: 選擇第一杯 — 對應 Pencil suJ8Y */
export default function OnboardingFirstDrink() {
  const [selectedDrink, setSelectedDrink] = useState(
    PRESET_DRINKS[0]?.id ?? "espresso",
  );

  return (
    <SafeAreaView className="flex-1 bg-bg-primary">
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
    </SafeAreaView>
  );
}
