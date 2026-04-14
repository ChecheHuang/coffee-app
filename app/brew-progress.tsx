import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { X } from "lucide-react-native";

/** Screen 4: 沖煮進度 (Brew Progress — Full-screen Modal) */
export default function BrewProgressScreen() {
  return (
    <SafeAreaView className="flex-1 bg-bg-primary">
      {/* 關閉按鈕 */}
      <View className="items-end px-7 py-2">
        <Pressable
          onPress={() => router.back()}
          className="h-11 w-11 items-center justify-center rounded-full bg-bg-card border border-border"
        >
          <X size={18} color="#6E6E70" strokeWidth={1.5} />
        </Pressable>
      </View>

      <View className="flex-1 items-center justify-center px-7">
        <Text className="font-display-medium text-xl text-text-primary">
          正在為您沖煮...
        </Text>
        <Text className="font-body mt-2 text-text-secondary">
          沖煮動畫、階段進度條、預計時間
        </Text>
      </View>
    </SafeAreaView>
  );
}
