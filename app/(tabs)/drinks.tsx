import { useState } from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Search, Coffee } from "lucide-react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  FadeInUp,
} from "react-native-reanimated";
import { useAnimatedPress } from "@/hooks/useAnimatedPress";

const CATEGORIES = ["全部", "濃縮", "牛奶", "特調", "冰飲"];

const DRINKS = [
  { id: "espresso", name: "Espresso", zh: "經典濃縮", color: "#3E2723", category: "濃縮" },
  { id: "latte", name: "Latte", zh: "經典拿鐵", color: "#8B7355", category: "牛奶" },
  { id: "cappuccino", name: "Cappuccino", zh: "卡布奇諾", color: "#7B6B5E", category: "牛奶" },
  { id: "flat-white", name: "Flat White", zh: "澳白咖啡", color: "#6B5D52", category: "牛奶" },
  { id: "americano", name: "Americano", zh: "美式咖啡", color: "#5D4037", category: "濃縮" },
  { id: "mocha", name: "Mocha", zh: "摩卡咖啡", color: "#4E342E", category: "特調" },
];

/** Screen 2: 飲品列表 (Drinks) — 對應 Pencil 設計稿 */
export default function DrinksScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const [tabContainerWidth, setTabContainerWidth] = useState(0);
  const searchPress = useAnimatedPress({ type: "opacity" });
  const indicatorX = useSharedValue(0);

  const tabWidth =
    tabContainerWidth > 0 ? tabContainerWidth / CATEGORIES.length : 0;

  const filteredDrinks =
    activeTab === 0
      ? DRINKS
      : DRINKS.filter((d) => d.category === CATEGORIES[activeTab]);

  const handleTabPress = (index: number) => {
    setActiveTab(index);
    const w = tabContainerWidth / CATEGORIES.length;
    indicatorX.value = withTiming(index * w, { duration: 300 });
  };

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value }],
  }));

  // Build 2-column grid rows
  const rows: (typeof DRINKS)[] = [];
  for (let i = 0; i < filteredDrinks.length; i += 2) {
    rows.push(filteredDrinks.slice(i, i + 2));
  }

  return (
    <SafeAreaView className="flex-1 bg-bg-primary">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 28 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-7">
          <Text className="font-display text-[36px] text-text-primary">
            飲品
          </Text>
          <Animated.View style={searchPress.animatedStyle}>
            <Pressable
              className="h-11 w-11 items-center justify-center rounded-full border border-border bg-bg-card"
              onPress={() => Alert.alert("搜尋", "搜尋功能即將推出")}
              {...searchPress.pressHandlers}
            >
              <Search size={20} color="#6E6E70" strokeWidth={1.5} />
            </Pressable>
          </Animated.View>
        </View>

        {/* Category Tabs */}
        <View className="mt-6 px-7">
          <View className="rounded-[24px] border border-border bg-bg-card p-1">
            <View className="relative">
              {tabWidth > 0 && (
                <Animated.View
                  style={[
                    {
                      position: "absolute",
                      top: 0,
                      width: tabWidth,
                      height: 36,
                      borderRadius: 20,
                      backgroundColor: "#C9A962",
                    },
                    indicatorStyle,
                  ]}
                />
              )}
              <View
                className="flex-row"
                onLayout={(e) =>
                  setTabContainerWidth(e.nativeEvent.layout.width)
                }
              >
                {CATEGORIES.map((cat, i) => (
                  <Pressable
                    key={cat}
                    className="flex-1 items-center justify-center"
                    style={{ height: 36 }}
                    onPress={() => handleTabPress(i)}
                  >
                    <Text
                      className={`font-body-medium text-[13px] ${
                        activeTab === i
                          ? "text-bg-primary"
                          : "text-text-secondary"
                      }`}
                    >
                      {cat}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Drink Grid */}
        <View key={activeTab} className="mt-6 gap-4 px-7">
          {rows.map((row, rowIndex) => (
            <View key={rowIndex} className="flex-row gap-4">
              {row.map((drink, colIndex) => (
                <DrinkCard
                  key={drink.id}
                  drink={drink}
                  index={rowIndex * 2 + colIndex}
                />
              ))}
              {row.length === 1 && <View className="flex-1" />}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function DrinkCard({
  drink,
  index,
}: {
  drink: (typeof DRINKS)[0];
  index: number;
}) {
  const scale = useSharedValue(1);

  const pressStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      className="flex-1"
      entering={FadeInUp.delay(index * 80)
        .springify()
        .damping(20)
        .stiffness(150)}
      style={pressStyle}
    >
      <Pressable
        className="overflow-hidden rounded-card border border-border bg-bg-card"
        onPressIn={() => {
          scale.value = withTiming(0.96, { duration: 150 });
        }}
        onPressOut={() => {
          scale.value = withTiming(1, { duration: 200 });
        }}
        onPress={() => router.push(`/drink/${drink.id}`)}
      >
        {/* Image Area */}
        <View
          className="h-[110px] items-center justify-center"
          style={{ backgroundColor: drink.color }}
        >
          <Coffee
            size={36}
            color="#F5F5F0"
            strokeWidth={1.5}
            style={{ opacity: 0.7 }}
          />
        </View>
        {/* Info */}
        <View className="gap-1 px-4 py-3.5">
          <Text className="font-display-medium text-lg text-text-primary">
            {drink.name}
          </Text>
          <Text className="font-body text-xs text-text-secondary">
            {drink.zh}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}
