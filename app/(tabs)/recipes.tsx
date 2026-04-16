import { useState } from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Plus, Coffee, Heart } from "lucide-react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useRecipeStore } from "@/stores/recipeStore";
import { PRESET_DRINKS } from "@/constants/drinks";
import { useAnimatedPress } from "@/hooks/useAnimatedPress";

const FILTERS = ["全部", "收藏 ♡", "最近使用"];

/** Screen 5: 配方頁 (Recipes) — 對應 Pencil 設計稿 */
export default function RecipesScreen() {
  const [activeFilter, setActiveFilter] = useState(0);
  const recipes = useRecipeStore((s) => s.recipes);
  const deleteRecipe = useRecipeStore((s) => s.deleteRecipe);
  const addPress = useAnimatedPress({ type: "opacity" });

  const filteredRecipes = (() => {
    if (activeFilter === 1) return recipes.filter((r) => r.isFavorite);
    if (activeFilter === 2)
      return [...recipes].sort((a, b) =>
        (b.lastUsedAt ?? "").localeCompare(a.lastUsedAt ?? ""),
      );
    return recipes;
  })();

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
              onPress={() => router.push("/recipe/edit")}
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
          {filteredRecipes.map((recipe, index) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              index={index}
              onDelete={() => {
                Alert.alert("刪除配方", `確定要刪除「${recipe.name}」嗎？`, [
                  { text: "取消", style: "cancel" },
                  {
                    text: "刪除",
                    style: "destructive",
                    onPress: () => deleteRecipe(recipe.id),
                  },
                ]);
              }}
            />
          ))}
          {filteredRecipes.length === 0 && (
            <View className="items-center py-10">
              <Text className="font-body text-sm text-text-secondary">
                {activeFilter === 1 ? "尚無收藏配方" : "尚無配方"}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function RecipeCard({
  recipe,
  index,
  onDelete,
}: {
  recipe: ReturnType<typeof useRecipeStore.getState>["recipes"][0];
  index: number;
  onDelete: () => void;
}) {
  const toggleFavorite = useRecipeStore((s) => s.toggleFavorite);
  const { animatedStyle, pressHandlers } = useAnimatedPress({ type: "scale" });
  const heartPress = useAnimatedPress({ type: "opacity" });

  const drink = PRESET_DRINKS.find((d) => d.id === recipe.drinkId);

  const formatLastUsed = (dateStr?: string): string => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
    );
    if (diffDays === 0) return `上次使用：今天 ${dateStr.slice(11, 16)}`;
    if (diffDays === 1) return `上次使用：昨天 ${dateStr.slice(11, 16)}`;
    return `上次使用：${diffDays} 天前`;
  };

  const description = [
    drink?.name ?? recipe.drinkId,
    `${recipe.params.temperature}°C`,
    recipe.params.milkFoam > 0 ? `奶泡${recipe.params.milkFoam}%` : `濃度${recipe.params.intensity}`,
  ].join(" · ");

  const handleLongPress = () => {
    Alert.alert(recipe.name, undefined, [
      {
        text: "編輯",
        onPress: () => router.push(`/recipe/edit?recipeId=${recipe.id}`),
      },
      { text: "刪除", style: "destructive", onPress: onDelete },
      { text: "取消", style: "cancel" },
    ]);
  };

  return (
    <Animated.View
      entering={FadeInUp.delay(index * 80)
        .springify()
        .damping(20)
        .stiffness(150)}
      style={animatedStyle}
    >
      <Pressable
        className="flex-row items-center rounded-[20px] border border-border bg-bg-card"
        style={{ padding: 16, paddingHorizontal: 20, gap: 16 }}
        onPress={() => router.push(`/recipe/${recipe.id}`)}
        onLongPress={handleLongPress}
        {...pressHandlers}
      >
        {/* Drink Icon */}
        <View
          className="h-12 w-12 items-center justify-center rounded-full"
          style={{ backgroundColor: `${drink?.color ?? "#3E2723"}30` }}
        >
          <Coffee size={24} color="#F5F5F0" strokeWidth={1.5} />
        </View>

        {/* Info */}
        <View style={{ gap: 4, flex: 1 }}>
          <Text className="font-display-medium text-lg text-text-primary">
            {recipe.name}
          </Text>
          <Text className="font-body text-xs text-text-secondary">
            {description}
          </Text>
          <Text className="font-body text-[11px] text-text-tertiary">
            {formatLastUsed(recipe.lastUsedAt)}
          </Text>
        </View>

        {/* Favorite Heart */}
        <Animated.View style={heartPress.animatedStyle}>
          <Pressable
            onPress={() => toggleFavorite(recipe.id)}
            hitSlop={8}
            {...heartPress.pressHandlers}
          >
            <Heart
              size={18}
              color={recipe.isFavorite ? "#C9A962" : "#4A4A4C"}
              strokeWidth={1.5}
              fill={recipe.isFavorite ? "#C9A962" : "none"}
            />
          </Pressable>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}
