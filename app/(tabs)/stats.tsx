import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Trophy } from "lucide-react-native";
import { router } from "expo-router";
import { useAnimatedPress } from "@/hooks/useAnimatedPress";

const WEEK_DAYS = ["一", "二", "三", "四", "五", "六", "日"];
const BAR_HEIGHTS = [40, 60, 55, 80, 100, 30, 45];
const MAX_BAR_HEIGHT = 100;

/** Screen 6: 統計頁 (Stats) — 對應 Pencil 設計稿 */
export default function StatsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-bg-primary">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 28 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View
          className="px-7"
          entering={FadeInUp.delay(0).springify().damping(20).stiffness(150)}
        >
          <Text className="font-display text-[36px] text-text-primary">
            統計
          </Text>
        </Animated.View>

        {/* Weekly Chart Section */}
        <Animated.View
          className="mt-6 px-7"
          entering={FadeInUp.delay(80).springify().damping(20).stiffness(150)}
        >
          <View
            className="rounded-[20px] border border-border bg-bg-card"
            style={{ padding: 20 }}
          >
            <Text
              className="font-body-medium text-[11px] text-text-secondary"
              style={{ letterSpacing: 1 }}
            >
              本週沖煮
            </Text>
            <View className="mt-1 flex-row items-end">
              <Text className="font-display-light text-[42px] text-text-primary">
                18
              </Text>
              <Text
                className="font-body text-[14px] text-text-primary"
                style={{ marginBottom: 10, marginLeft: 4 }}
              >
                杯
              </Text>
            </View>

            {/* Bar Chart */}
            <View
              className="mt-5 flex-row items-end justify-between"
              style={{ height: MAX_BAR_HEIGHT }}
            >
              {BAR_HEIGHTS.map((h, i) => (
                <View key={i} className="flex-1 items-center">
                  <LinearGradient
                    colors={["#C9A962", "#8B7845"]}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    style={{
                      height: h,
                      width: 20,
                      borderRadius: 6,
                    }}
                  />
                </View>
              ))}
            </View>

            {/* Day Labels */}
            <View className="mt-2 flex-row justify-between">
              {WEEK_DAYS.map((day) => (
                <View key={day} className="flex-1 items-center">
                  <Text className="font-body text-[11px] text-text-secondary">
                    {day}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </Animated.View>

        {/* Quick Stats Row */}
        <Animated.View
          className="mt-4 px-7"
          entering={FadeInUp.delay(160).springify().damping(20).stiffness(150)}
        >
          <View className="flex-row" style={{ gap: 12 }}>
            <QuickStatCard value="18" suffix=" 杯" label="本週" />
            <QuickStatCard value="234" suffix="mg" label="咖啡因" />
            <QuickStatCard value="Latte" label="最愛" gold />
          </View>
        </Animated.View>

        {/* Achievement Preview Section */}
        <Animated.View
          className="mt-7 px-7"
          entering={FadeInUp.delay(240).springify().damping(20).stiffness(150)}
        >
          {/* Section Header */}
          <View className="flex-row items-center justify-between">
            <Text
              className="font-body-medium text-[11px] text-text-secondary"
              style={{ letterSpacing: 1 }}
            >
              成就
            </Text>
            <ViewAllLink />
          </View>

          {/* Achievement Card */}
          <AchievementCard />
        </Animated.View>

        {/* Badge Row */}
        <Animated.View
          className="mt-5 px-7"
          entering={FadeInUp.delay(320).springify().damping(20).stiffness(150)}
        >
          <View className="flex-row" style={{ gap: 10 }}>
            <BadgePill label="🏆 徽章" />
            <BadgePill label="🌅 早鳥族" />
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ── Sub-components ────────────────────────────────────── */

function ViewAllLink() {
  const { animatedStyle, pressHandlers } = useAnimatedPress({ type: "opacity" });

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={() => router.push("/achievements")}
        {...pressHandlers}
      >
        <Text className="font-body-medium text-[13px] text-gold">
          查看全部 →
        </Text>
      </Pressable>
    </Animated.View>
  );
}

function AchievementCard() {
  const { animatedStyle, pressHandlers } = useAnimatedPress({ type: "scale" });

  return (
    <Animated.View style={[{ marginTop: 16 }, animatedStyle]}>
      <Pressable
        className="rounded-[20px] border border-border bg-bg-card"
        style={{ padding: 20 }}
        onPress={() => router.push("/achievements")}
        {...pressHandlers}
      >
        <View className="flex-row items-center" style={{ gap: 8 }}>
          <Trophy size={20} color="#C9A962" strokeWidth={1.5} />
          <Text className="font-display-medium text-[18px] text-gold">
            Lv.3 鑑賞家
          </Text>
        </View>

        {/* Progress Bar */}
        <View
          className="mt-4 overflow-hidden rounded-[3px] bg-bg-expanded"
          style={{ height: 6 }}
        >
          <LinearGradient
            colors={["#C9A962", "#8B7845"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{
              height: 6,
              width: "60%",
              borderRadius: 3,
            }}
          />
        </View>

        <Text className="mt-3 font-body text-[12px] text-text-secondary">
          還差 28 杯升級為「大師」
        </Text>
      </Pressable>
    </Animated.View>
  );
}

function QuickStatCard({
  value,
  suffix,
  label,
  gold = false,
}: {
  value: string;
  suffix?: string;
  label: string;
  gold?: boolean;
}) {
  const { animatedStyle, pressHandlers } = useAnimatedPress({ type: "scale" });

  return (
    <Animated.View className="flex-1" style={animatedStyle}>
      <Pressable
        className="flex-1 rounded-[16px] border border-border bg-bg-card"
        style={{ padding: 16 }}
        onPress={() => Alert.alert("統計詳情", `${label}的詳細資訊即將推出`)}
        {...pressHandlers}
      >
        <Text
          className={`font-display-medium text-[20px] ${gold ? "text-gold" : "text-text-primary"}`}
        >
          {value}
          {suffix && (
            <Text
              className={`font-display-medium text-[20px] ${gold ? "text-gold" : "text-text-primary"}`}
            >
              {suffix}
            </Text>
          )}
        </Text>
        <Text className="mt-1 font-body text-[11px] text-text-secondary">
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

function BadgePill({ label }: { label: string }) {
  const { animatedStyle, pressHandlers } = useAnimatedPress({ type: "opacity" });

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        className="rounded-full border border-border bg-bg-card px-4 py-2"
        onPress={() => router.push("/achievements")}
        {...pressHandlers}
      >
        <Text className="font-body-medium text-[12px] text-text-primary">
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}
