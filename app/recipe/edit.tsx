import { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { ChevronLeft, Coffee } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Slider } from "../../components/Slider";
import { useRecipeStore } from "@/stores/recipeStore";
import { PRESET_DRINKS } from "@/constants/drinks";
import { useAnimatedPress } from "@/hooks/useAnimatedPress";
import type { BrewParams } from "@/types/drink";

const GRIND_LABELS = ["極細", "細", "中細", "中", "粗"] as const;

function grindToLabel(level: number): string {
  return GRIND_LABELS[Math.min(level - 1, GRIND_LABELS.length - 1)] ?? "中";
}

/** Screen 12: 配方編輯 / 新增 (Recipe Edit) — 對應 Pencil 設計稿 */
export default function RecipeEditScreen() {
  const { recipeId } = useLocalSearchParams<{ recipeId?: string }>();
  const existingRecipe = useRecipeStore((s) =>
    recipeId ? s.recipes.find((r) => r.id === recipeId) : undefined,
  );
  const addRecipe = useRecipeStore((s) => s.addRecipe);
  const updateRecipe = useRecipeStore((s) => s.updateRecipe);

  const isEditMode = !!existingRecipe;

  const [name, setName] = useState(existingRecipe?.name ?? "");
  const [selectedDrinkId, setSelectedDrinkId] = useState(
    existingRecipe?.drinkId ?? PRESET_DRINKS[0].id,
  );
  const [temperature, setTemperature] = useState(
    existingRecipe?.params.temperature ?? 92,
  );
  const [intensity, setIntensity] = useState(
    existingRecipe?.params.intensity ?? 3,
  );
  const [grindLevel, setGrindLevel] = useState(
    existingRecipe?.params.grindLevel ?? 3,
  );
  const [milkFoam, setMilkFoam] = useState(
    existingRecipe?.params.milkFoam ?? 0,
  );
  const [volume, setVolume] = useState(
    existingRecipe?.params.volume ?? 120,
  );

  const selectedDrink = PRESET_DRINKS.find((d) => d.id === selectedDrinkId) ?? PRESET_DRINKS[0];

  // 切換基底飲品時套用該飲品的 defaultParams
  const handleDrinkSelect = (drinkId: string) => {
    setSelectedDrinkId(drinkId);
    const drink = PRESET_DRINKS.find((d) => d.id === drinkId);
    if (!drink) return;
    setTemperature(drink.defaultParams.temperature);
    setIntensity(drink.defaultParams.intensity);
    setGrindLevel(drink.defaultParams.grindLevel);
    setMilkFoam(drink.defaultParams.milkFoam);
    setVolume(drink.defaultParams.volume);
  };

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert("請輸入配方名稱");
      return;
    }

    const params: BrewParams = {
      temperature,
      intensity,
      volume,
      grindLevel,
      milkFoam,
    };

    if (isEditMode && recipeId) {
      updateRecipe(recipeId, {
        name: name.trim(),
        drinkId: selectedDrinkId,
        params,
      });
    } else {
      addRecipe({
        name: name.trim(),
        drinkId: selectedDrinkId,
        params,
        isFavorite: false,
      });
    }

    router.back();
  };

  const savePress = useAnimatedPress({ type: "opacity" });

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
          {isEditMode ? "編輯配方" : "新增配方"}
        </Text>
        <Animated.View style={savePress.animatedStyle}>
          <Pressable onPress={handleSave} {...savePress.pressHandlers}>
            <Text className="font-body-semibold text-base text-gold">
              保存
            </Text>
          </Pressable>
        </Animated.View>
      </View>

      {/* Content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 28, paddingBottom: 16, gap: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Params Section */}
        <Animated.View
          entering={FadeInUp.delay(0).springify().damping(20).stiffness(150)}
          style={{ gap: 20 }}
        >
          {/* Name Input */}
          <View
            className="rounded-[16px]"
            style={{ backgroundColor: "#2A2A2C", padding: 16 }}
          >
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="配方名稱"
              placeholderTextColor="#4A4A4C"
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                color: "#F5F5F0",
              }}
            />
          </View>

          {/* Base Drink Selector */}
          <View style={{ gap: 6 }}>
            <Text
              className="font-body-medium text-[11px] text-text-secondary"
              style={{ letterSpacing: 3 }}
            >
              基底飲品
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 8 }}
            >
              {PRESET_DRINKS.map((drink) => (
                <DrinkPill
                  key={drink.id}
                  label={drink.nameZh}
                  isActive={drink.id === selectedDrinkId}
                  onPress={() => handleDrinkSelect(drink.id)}
                />
              ))}
            </ScrollView>
          </View>

          {/* Temperature Slider */}
          <Slider
            label="溫度"
            value={`${temperature}°C`}
            progress={(temperature - 85) / (96 - 85)}
            onProgressChange={(p) =>
              setTemperature(Math.round(85 + p * (96 - 85)))
            }
          />

          {/* Intensity Slider */}
          <Slider
            label="濃度"
            value={`${intensity}`}
            progress={(intensity - 1) / (5 - 1)}
            onProgressChange={(p) =>
              setIntensity(Math.round(1 + p * (5 - 1)))
            }
          />

          {/* Grind Slider */}
          <Slider
            label="研磨度"
            value={grindToLabel(grindLevel)}
            progress={(grindLevel - 1) / (5 - 1)}
            onProgressChange={(p) =>
              setGrindLevel(Math.round(1 + p * (5 - 1)))
            }
          />

          {/* Milk Foam Slider */}
          <Slider
            label="奶泡量"
            value={milkFoam === 0 ? "無" : `${milkFoam}%`}
            progress={milkFoam / 100}
            disabled={!selectedDrink.hasMilk}
            onProgressChange={(p) =>
              setMilkFoam(Math.round(p * 100 / 5) * 5)
            }
          />

          {/* Volume Slider */}
          <Slider
            label="杯量"
            value={`${volume}ml`}
            progress={(volume - 25) / (350 - 25)}
            onProgressChange={(p) =>
              setVolume(Math.round((25 + p * (350 - 25)) / 5) * 5)
            }
          />
        </Animated.View>
      </ScrollView>

      {/* Bottom CTA */}
      <View
        className="px-7 pb-8 pt-4"
        style={{ borderTopWidth: 1, borderTopColor: "#2A2A2C" }}
      >
        <Pressable
          className="h-[52px] overflow-hidden rounded-[20px]"
          onPress={handleSave}
        >
          <LinearGradient
            colors={["#C9A962", "#8B7845"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="flex-1 items-center justify-center"
          >
            <Text className="font-body-semibold text-sm text-bg-primary">
              保存配方
            </Text>
          </LinearGradient>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

/* ── Drink Pill ──────────────────────────────────────────── */

function DrinkPill({
  label,
  isActive,
  onPress,
}: {
  label: string;
  isActive: boolean;
  onPress: () => void;
}) {
  const { animatedStyle, pressHandlers } = useAnimatedPress({ type: "opacity" });

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        className={`rounded-[20px] ${
          isActive ? "bg-gold" : "border border-border bg-bg-card"
        }`}
        style={{ paddingVertical: 8, paddingHorizontal: 16 }}
        onPress={onPress}
        {...pressHandlers}
      >
        <Text
          className={`font-body-medium text-[13px] ${
            isActive ? "text-bg-primary" : "text-text-secondary"
          }`}
        >
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}
