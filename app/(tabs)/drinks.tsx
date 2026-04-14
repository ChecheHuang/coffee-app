import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/** Screen 2: 飲品列表 (Drinks) */
export default function DrinksScreen() {
  return (
    <SafeAreaView className="flex-1 bg-bg-primary">
      <View className="flex-1 items-center justify-center px-7">
        <Text className="font-display text-4xl text-text-primary">飲品</Text>
        <Text className="font-body mt-2 text-text-secondary">
          分類瀏覽、2 列 Grid 佈局
        </Text>
      </View>
    </SafeAreaView>
  );
}
