import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/** Screen 6: 統計頁 (Stats) */
export default function StatsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-bg-primary">
      <View className="flex-1 items-center justify-center px-7">
        <Text className="font-display text-4xl text-text-primary">統計</Text>
        <Text className="font-body mt-2 text-text-secondary">
          沖煮數據圖表、偏好分析、成就摘要
        </Text>
      </View>
    </SafeAreaView>
  );
}
