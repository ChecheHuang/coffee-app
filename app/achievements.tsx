import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";

/** Screen 9: 成就與徽章 (Achievements) */
export default function AchievementsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-bg-primary">
      {/* 導航列 */}
      <View className="flex-row items-center px-7 py-2">
        <Pressable
          onPress={() => router.back()}
          className="h-11 w-11 items-center justify-center rounded-full bg-bg-card"
        >
          <ChevronLeft size={20} color="#F5F5F0" strokeWidth={1.5} />
        </Pressable>
        <Text className="font-display-medium ml-4 text-xl text-text-primary">
          成就
        </Text>
      </View>

      <View className="flex-1 items-center justify-center px-7">
        <Text className="font-body text-text-secondary">
          等級卡、徽章 Grid、里程碑列表
        </Text>
      </View>
    </SafeAreaView>
  );
}
