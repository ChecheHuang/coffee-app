import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { ChevronLeft, Pencil, Coffee } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useRecipeStore } from "@/stores/recipeStore";
import { PRESET_DRINKS } from "@/constants/drinks";
import { useAnimatedPress } from "@/hooks/useAnimatedPress";

const GRIND_LABELS = ["極細", "細", "中細", "中", "粗"] as const;

function formatGrind(level: number): string {
  return GRIND_LABELS[Math.min(level - 1, GRIND_LABELS.length - 1)] ?? "中";
}

function formatMilkFoam(value: number): string {
  if (value === 0) return "無";
  return `${value}%`;
}

/** Screen 11: 配方詳情 (Recipe Detail) — 對應 Pencil 設計稿 */
export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const recipe = useRecipeStore((s) => s.recipes.find((r) => r.id === id));

  if (!recipe) {
    return (
      <SafeAreaView className="flex-1 bg-bg-primary items-center justify-center">
        <Text className="font-body text-text-secondary">找不到此配方</Text>
      </SafeAreaView>
    );
  }

  const drink = PRESET_DRINKS.find((d) => d.id === recipe.drinkId);
  const editPress = useAnimatedPress({ type: "opacity" });

  const params = [
    { label: "溫度", value: `${recipe.params.temperature}°C` },
    { label: "濃度", value: `${recipe.params.intensity}` },
    { label: "杯量", value: `${recipe.params.volume}ml` },
    { label: "研磨度", value: formatGrind(recipe.params.grindLevel) },
    { label: "奶泡量", value: formatMilkFoam(recipe.params.milkFoam), gold: recipe.params.milkFoam > 0 },
  ];

  return (
    <SafeAreaView className="flex-1 bg-bg-primary">
      {/* NavHeader */}
      <View className="flex-row items-center justify-between px-7 py-2">
        <Pressable
          onPress={() => router.back()}
          className="h-11 w-11 items-center justify-center rounded-full border border-border bg-bg-card"
        >
          <ChevronLeft size={20} color="#F5F5F0" strokeWidth={1.5} />
        </Pressable>
        <Text className="font-display-medium text-xl text-text-primary">
          {recipe.name}
        </Text>
        <Animated.View style={editPress.animatedStyle}>
          <Pressable
            className="h-11 w-11 items-center justify-center rounded-full border border-border bg-bg-card"
            onPress={() => router.push(`/recipe/edit?recipeId=${recipe.id}`)}
            {...editPress.pressHandlers}
          >
            <Pencil size={20} color="#C9A962" strokeWidth={1.5} />
          </Pressable>
        </Animated.View>
      </View>

      {/* Content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* RecipeInfo Card */}
        <Animated.View
          className="mx-7 mt-4"
          entering={FadeInUp.delay(0).springify().damping(20).stiffness(150)}
        >
          <View className="rounded-card border border-border bg-bg-card" style={{ padding: 24, gap: 16 }}>
            {/* Top Row */}
            <View className="flex-row items-center" style={{ gap: 16 }}>
              <View
                className="h-12 w-12 items-center justify-center rounded-full"
                style={{ backgroundColor: drink?.color ?? "#3E2723" }}
              >
                <Coffee size={24} color="#F5F5F0" strokeWidth={1.5} />
              </View>
              <View style={{ gap: 4 }}>
                <Text className="font-body-medium text-base text-text-primary">
                  {drink?.name ?? recipe.drinkId}
                </Text>
                <Text className="font-body text-xs text-text-secondary">
                  基底飲品
                </Text>
              </View>
            </View>

            {/* Divider */}
            <View className="h-px bg-bg-expanded" />

            {/* Stats Row */}
            <View className="flex-row justify-between">
              <View style={{ gap: 2 }}>
                <Text className="font-body text-[11px] text-text-secondary">
                  建立日期
                </Text>
                <Text className="font-body-medium text-sm text-text-primary">
                  {recipe.createdAt}
                </Text>
              </View>
              <View style={{ gap: 2, alignItems: "flex-end" }}>
                <Text className="font-body text-[11px] text-text-secondary">
                  使用次數
                </Text>
                <Text className="font-body-medium text-sm text-text-primary">
                  — 次
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Params Section */}
        <Animated.View
          className="mx-7 mt-6"
          entering={FadeInUp.delay(100).springify().damping(20).stiffness(150)}
        >
          <Text
            className="font-body-medium text-[11px] text-text-secondary"
            style={{ letterSpacing: 3, marginBottom: 8 }}
          >
            沖煮參數
          </Text>

          <View className="rounded-card border border-border bg-bg-card overflow-hidden">
            {params.map((param, i) => (
              <View key={param.label}>
                {i > 0 && <View className="h-px bg-bg-expanded" />}
                <View
                  className="flex-row items-center justify-between"
                  style={{ paddingVertical: 16, paddingHorizontal: 20 }}
                >
                  <Text className="font-body text-sm text-text-secondary">
                    {param.label}
                  </Text>
                  <Text
                    className={`font-body-medium text-sm ${param.gold ? "text-gold" : "text-text-primary"}`}
                  >
                    {param.value}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </Animated.View>
      </ScrollView>

      {/* Bottom CTA */}
      <View
        className="px-7 pb-8 pt-4"
        style={{ borderTopWidth: 1, borderTopColor: "#2A2A2C" }}
      >
        <Pressable
          className="h-14 overflow-hidden rounded-[20px]"
          onPress={() => router.push("/brew-progress")}
        >
          <LinearGradient
            colors={["#C9A962", "#8B7845"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="flex-1 flex-row items-center justify-center gap-2"
          >
            <Coffee size={20} color="#1A1A1C" strokeWidth={1.5} />
            <Text className="font-body-semibold text-base text-bg-primary">
              使用此配方沖煮
            </Text>
          </LinearGradient>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
