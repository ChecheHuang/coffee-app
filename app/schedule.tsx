import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ChevronLeft, Plus } from "lucide-react-native";

/** Screen 8: 排程管理 (Schedule) */
export default function ScheduleScreen() {
  return (
    <SafeAreaView className="flex-1 bg-bg-primary">
      {/* 導航列 */}
      <View className="flex-row items-center justify-between px-7 py-2">
        <View className="flex-row items-center">
          <Pressable
            onPress={() => router.back()}
            className="h-11 w-11 items-center justify-center rounded-full bg-bg-card"
          >
            <ChevronLeft size={20} color="#F5F5F0" strokeWidth={1.5} />
          </Pressable>
          <Text className="font-display-medium ml-4 text-xl text-text-primary">
            排程管理
          </Text>
        </View>
        <Pressable className="h-11 w-11 items-center justify-center rounded-full bg-gold">
          <Plus size={18} color="#1A1A1C" strokeWidth={2} />
        </Pressable>
      </View>

      <View className="flex-1 items-center justify-center px-7">
        <Text className="font-body text-text-secondary">
          排程卡片列表、時間設定、星期選擇
        </Text>
      </View>
    </SafeAreaView>
  );
}
