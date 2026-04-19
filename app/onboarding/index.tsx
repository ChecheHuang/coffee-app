import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Coffee } from "lucide-react-native";
import { StepIndicator } from "../../components/onboarding/StepIndicator";

/** Onboarding Step 1: 歡迎 — 對應 Pencil 7cvXQ */
export default function OnboardingWelcome() {
  return (
    <SafeAreaView className="flex-1 bg-bg-primary">
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
          {[
            "遠端操控，一鍵沖煮",
            "個人化配方，專屬口味",
            "AI 智能推薦，發現驚喜",
          ].map((text) => (
            <View key={text} className="flex-row items-center gap-3">
              <View className="h-2 w-2 rounded-full bg-gold" />
              <Text className="font-body text-sm text-text-primary">
                {text}
              </Text>
            </View>
          ))}
        </View>

        <StepIndicator current={1} total={4} />

        <Pressable
          onPress={() => router.push("/onboarding/connect")}
          className="w-full items-center rounded-card bg-gold py-4"
        >
          <Text className="font-body-semibold text-base text-bg-primary">
            開始體驗
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
