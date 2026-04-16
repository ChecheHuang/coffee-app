import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp } from "react-native-reanimated";
import { router } from "expo-router";
import Svg, { Path } from "react-native-svg";
import { useAnimatedPress } from "@/hooks/useAnimatedPress";

const WEEK_DAYS = ["一", "二", "三", "四", "五", "六", "日"];
const BAR_HEIGHTS = [40, 60, 55, 80, 100, 30, 45];
const MAX_BAR_HEIGHT = 100;

const PIE_DATA: { label: string; pct: number; color: string }[] = [
  { label: "Latte", pct: 45, color: "#8B7355" },
  { label: "Espresso", pct: 30, color: "#3E2723" },
  { label: "Americano", pct: 15, color: "#5D4037" },
  { label: "其他", pct: 10, color: "#4A4A4C" },
];

/** Screen 6: 統計頁 (Stats) — 對應 Pencil 設計稿 */
export default function StatsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-bg-primary">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 28, paddingBottom: 28, gap: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View
          entering={FadeInUp.delay(0).springify().damping(20).stiffness(150)}
        >
          <Text className="font-display text-[36px] text-text-primary">
            統計
          </Text>
        </Animated.View>

        {/* Weekly Chart Section */}
        <Animated.View
          entering={FadeInUp.delay(80).springify().damping(20).stiffness(150)}
        >
          <View
            className="rounded-card border border-border bg-bg-card"
            style={{ padding: 24, gap: 16 }}
          >
            <Text
              className="font-body-medium text-[11px] text-text-secondary"
              style={{ letterSpacing: 3 }}
            >
              本週沖煮
            </Text>
            <View className="flex-row items-end" style={{ gap: 6 }}>
              <Text
                className="font-display-light text-text-primary"
                style={{ fontSize: 42, lineHeight: 42 * 0.85 }}
              >
                18
              </Text>
              <Text className="font-body text-[14px] text-text-secondary">
                杯
              </Text>
            </View>

            {/* Bar Chart */}
            <View
              className="flex-row items-end justify-between"
              style={{ height: MAX_BAR_HEIGHT, gap: 8 }}
            >
              {BAR_HEIGHTS.map((h, i) => (
                <View key={i} className="flex-1 items-center" style={{ gap: 4 }}>
                  <LinearGradient
                    colors={["#C9A962", "#8B7845"]}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    style={{
                      height: h,
                      width: 24,
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                  />
                  <Text className="font-body-medium text-[10px] text-text-secondary">
                    {WEEK_DAYS[i]}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </Animated.View>

        {/* Quick Stats Row */}
        <Animated.View
          entering={FadeInUp.delay(160).springify().damping(20).stiffness(150)}
        >
          <View className="flex-row" style={{ gap: 12 }}>
            <QuickStatCard value="18" suffix=" 杯" label="本週" />
            <QuickStatCard value="234" suffix="mg" label="咖啡因" />
            <QuickStatCard value="Latte" label="最愛" gold />
          </View>
        </Animated.View>

        {/* Preference Chart Section */}
        <Animated.View
          entering={FadeInUp.delay(240).springify().damping(20).stiffness(150)}
          style={{ gap: 16 }}
        >
          <Text
            className="font-body-medium text-[11px] text-text-secondary"
            style={{ letterSpacing: 3 }}
          >
            飲品偏好
          </Text>
          <View
            className="rounded-card border border-border bg-bg-card"
            style={{ padding: 24 }}
          >
            <View className="flex-row items-center" style={{ gap: 24 }}>
              <PieChart size={120} data={PIE_DATA} />
              <View style={{ gap: 10, flex: 1 }}>
                {PIE_DATA.map((item) => (
                  <View
                    key={item.label}
                    className="flex-row items-center"
                    style={{ gap: 8 }}
                  >
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: item.color,
                      }}
                    />
                    <Text className="font-body text-[13px] text-text-primary">
                      {item.label} {item.pct}%
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Achievement Preview Section */}
        <Animated.View
          entering={FadeInUp.delay(320).springify().damping(20).stiffness(150)}
          style={{ gap: 12 }}
        >
          {/* Section Header */}
          <View className="flex-row items-center justify-between">
            <Text
              className="font-body-medium text-[11px] text-text-secondary"
              style={{ letterSpacing: 3 }}
            >
              成就
            </Text>
            <ViewAllLink />
          </View>

          {/* Achievement Card */}
          <AchievementCard />

          {/* Badge Row */}
          <View className="flex-row" style={{ gap: 12 }}>
            <BadgePill label="🎖️ 徽章" />
            <BadgePill label="🎖️ 早鳥族" />
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
    <Animated.View style={animatedStyle}>
      <Pressable
        className="rounded-card border border-border bg-bg-card"
        style={{ padding: 20, gap: 12 }}
        onPress={() => router.push("/achievements")}
        {...pressHandlers}
      >
        <View className="flex-row items-center" style={{ gap: 8 }}>
          <Text style={{ fontSize: 20 }}>🏅</Text>
          <Text className="font-display-medium text-[18px] text-gold">
            Lv.3 鑑賞家
          </Text>
        </View>

        {/* Progress Bar */}
        <View
          className="overflow-hidden rounded-[3px]"
          style={{ height: 6, backgroundColor: "#2A2A2C" }}
        >
          <LinearGradient
            colors={["#C9A962", "#8B7845"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{
              height: 6,
              width: "72%",
              borderRadius: 3,
            }}
          />
        </View>

        <Text className="font-body text-[12px] text-text-secondary">
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
        className="flex-1 rounded-card border border-border bg-bg-card"
        style={{ padding: 20, gap: 4 }}
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
        <Text className="font-body text-[11px] text-text-secondary">
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

function PieChart({
  size,
  data,
}: {
  size: number;
  data: { pct: number; color: string }[];
}) {
  const r = size / 2;
  const paths: { d: string; color: string }[] = [];
  const startAngle = -Math.PI / 2;

  data.reduce((angle, slice) => {
    const sweep = (slice.pct / 100) * 2 * Math.PI;
    const x1 = r + r * Math.cos(angle);
    const y1 = r + r * Math.sin(angle);
    const x2 = r + r * Math.cos(angle + sweep);
    const y2 = r + r * Math.sin(angle + sweep);
    const largeArc = sweep > Math.PI ? 1 : 0;
    paths.push({
      d: `M${r},${r} L${x1},${y1} A${r},${r} 0 ${largeArc} 1 ${x2},${y2} Z`,
      color: slice.color,
    });
    return angle + sweep;
  }, startAngle);

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {paths.map((p, i) => (
        <Path key={i} d={p.d} fill={p.color} />
      ))}
    </Svg>
  );
}

function BadgePill({ label }: { label: string }) {
  const { animatedStyle, pressHandlers } = useAnimatedPress({ type: "opacity" });

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        className="rounded-[20px] border border-border"
        style={{ backgroundColor: "#2A2A2C", paddingVertical: 6, paddingHorizontal: 12 }}
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
