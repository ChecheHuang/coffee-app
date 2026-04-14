import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";

/** Screen 3: 飲品詳情 / 參數調整 (Drink Detail) */
export default function DrinkDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

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
          {id ?? "Espresso"}
        </Text>
      </View>

      <View className="flex-1 items-center justify-center px-7">
        <Text className="font-body text-text-secondary">
          參數調整滑桿、咖啡杯視覺、沖煮按鈕
        </Text>
      </View>
    </SafeAreaView>
  );
}
