import { useState } from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Plus, Coffee } from "lucide-react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useAnimatedPress } from "@/hooks/useAnimatedPress";

const FILTERS = ["全部", "收藏 ♡", "最近使用"];

const RECIPES = [
  {
    id: "1",
    name: "早安濃縮",
    description: "Espresso · 93°C · 濃度4",
    lastUsed: "上次使用：今天 09:15",
  },
  {
    id: "2",
    name: "午後拿鐵",
    description: "Latte · 90°C · 奶泡80%",
    lastUsed: "上次使用：昨天 14:30",
  },
  {
    id: "3",
    name: "週末摩卡",
    description: "Mocha · 88°C · 巧克力醬",
    lastUsed: "上次使用：3 天前",
  },
];

/** Screen 5: 配方頁 (Recipes) — 對應 Pencil 設計稿 */
export default function RecipesScreen() {
  const [activeFilter, setActiveFilter] = useState(0);
  const addPress = useAnimatedPress({ type: "opacity" });

  return (
    <SafeAreaView className="flex-1 bg-bg-primary">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 28, paddingBottom: 28, gap: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between">
          <Text className="font-display text-[36px] text-text-primary">
            我的配方
          </Text>
          <Animated.View style={addPress.animatedStyle}>
            <Pressable
              className="items-center justify-center rounded-full bg-gold"
              style={{ width: 44, height: 44 }}
              onPress={() => Alert.alert("新增配方", "新增配方功能即將推出")}
              {...addPress.pressHandlers}
            >
              <Plus size={20} color="#1A1A1C" strokeWidth={2} />
            </Pressable>
          </Animated.View>
        </View>

        {/* Filter Pills */}
        <View className="flex-row" style={{ gap: 8 }}>
          {FILTERS.map((filter, index) => (
            <Pressable
              key={filter}
              onPress={() => setActiveFilter(index)}
              className={`rounded-[20px] ${
                activeFilter === index
                  ? "bg-gold"
                  : "border border-border bg-bg-card"
              }`}
              style={{ paddingVertical: 8, paddingHorizontal: 16 }}
            >
              <Text
                className={`font-body-medium text-[13px] ${
                  activeFilter === index
                    ? "text-bg-primary"
                    : "text-text-secondary"
                }`}
              >
                {filter}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Recipe Cards */}
        <View style={{ gap: 12 }}>
          {RECIPES.map((recipe, index) => (
            <RecipeCard key={recipe.id} recipe={recipe} index={index} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function RecipeCard({
  recipe,
  index,
}: {
  recipe: (typeof RECIPES)[0];
  index: number;
}) {
  const { animatedStyle, pressHandlers } = useAnimatedPress({ type: "scale" });

  return (
    <Animated.View
      entering={FadeInUp.delay(index * 80)
        .springify()
        .damping(20)
        .stiffness(150)}
      style={animatedStyle}
    >
      <Pressable
        className="flex-row rounded-[20px] border border-border bg-bg-card"
        style={{ padding: 16, paddingHorizontal: 20, gap: 16 }}
        onPress={() => Alert.alert("配方詳情", "配方詳情即將推出")}
        {...pressHandlers}
      >
        <Coffee size={20} color="#C9A962" strokeWidth={1.5} />
        <View style={{ gap: 4, flex: 1 }}>
          <Text className="font-display-medium text-lg text-text-primary">
            {recipe.name}
          </Text>
          <Text className="font-body text-xs text-text-secondary">
            {recipe.description}
          </Text>
          <Text className="font-body text-[11px] text-text-tertiary">
            {recipe.lastUsed}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}
