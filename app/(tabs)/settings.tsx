import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/** Screen 7: 設定頁 (Settings) */
export default function SettingsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-bg-primary">
      <View className="flex-1 items-center justify-center px-7">
        <Text className="font-display text-4xl text-text-primary">設定</Text>
        <Text className="font-body mt-2 text-text-secondary">
          用戶管理、咖啡機設定、排程、維護
        </Text>
      </View>
    </SafeAreaView>
  );
}
