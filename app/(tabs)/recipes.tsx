import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/** Screen 5: 配方頁 (Recipes) */
export default function RecipesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-bg-primary">
      <View className="flex-1 items-center justify-center px-7">
        <Text className="font-display text-4xl text-text-primary">
          我的配方
        </Text>
        <Text className="font-body mt-2 text-text-secondary">
          自訂配方管理、收藏配方
        </Text>
      </View>
    </SafeAreaView>
  );
}
