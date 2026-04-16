import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp } from "react-native-reanimated";
import { router } from "expo-router";
import { ChevronLeft, Lock, CheckCircle, Circle } from "lucide-react-native";
import { useAnimatedPress } from "@/hooks/useAnimatedPress";
import { cn } from "@/utils/cn";

/* ── Data ─────────────────────────────────────────────── */

const BADGES: { name: string; unlocked: boolean }[] = [
  { name: "奶泡達人", unlocked: true },
  { name: "早鳥族", unlocked: true },
  { name: "百杯俱樂部", unlocked: true },
  { name: "純粹主義", unlocked: true },
  { name: "溫度敏感", unlocked: false },
  { name: "千杯傳奇", unlocked: false },
  { name: "參數大師", unlocked: false },
  { name: "連續30天", unlocked: false },
];

const MILESTONES: {
  label: string;
  date?: string;
  completed: boolean;
}[] = [
  { label: "第 1 杯咖啡", date: "2026-01-15", completed: true },
  { label: "累計 100 杯", date: "2026-03-22", completed: true },
  { label: "累計 500 杯", completed: false },
  { label: "連續 30 天每天沖煮", completed: false },
];

/** Screen 9: 成就與徽章 (Achievements) */
export default function AchievementsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-bg-primary">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 28 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 導航列 */}
        <Animated.View
          className="flex-row items-center px-7 py-2"
          entering={FadeInUp.delay(0).springify().damping(20).stiffness(150)}
        >
          <Pressable
            onPress={() => router.back()}
            className="h-11 w-11 items-center justify-center rounded-full border border-border bg-bg-card"
          >
            <ChevronLeft size={20} color="#F5F5F0" strokeWidth={1.5} />
          </Pressable>
          <Text className="font-display-medium ml-4 text-xl text-text-primary">
            成就
          </Text>
        </Animated.View>

        {/* Level Card */}
        <Animated.View
          className="mt-6 px-7"
          entering={FadeInUp.delay(80).springify().damping(20).stiffness(150)}
        >
          <LinearGradient
            colors={["#C9A962", "#8B7845"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: 20, padding: 24, gap: 12 }}
          >
            <Text
              className="font-display-light"
              style={{ fontSize: 52, color: "#1A1A1C", lineHeight: 52 * 0.85 }}
            >
              Lv.3
            </Text>
            <Text
              className="font-display-medium"
              style={{ fontSize: 20, color: "#1A1A1C" }}
            >
              鑑賞家
            </Text>

            {/* Progress Bar */}
            <View
              style={{
                height: 8,
                borderRadius: 4,
                backgroundColor: "rgba(26,26,28,0.19)",
              }}
            >
              <View
                style={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#1A1A1C",
                  width: "60%",
                }}
              />
            </View>

            <Text
              className="font-body-medium"
              style={{ fontSize: 13, color: "#1A1A1C", opacity: 0.7 }}
            >
              還差 28 杯升級為「大師」
            </Text>
          </LinearGradient>
        </Animated.View>

        {/* Badges Section */}
        <Animated.View
          className="mt-7 px-7"
          entering={FadeInUp.delay(160).springify().damping(20).stiffness(150)}
        >
          <Text
            className="font-body-medium text-[11px] text-text-secondary"
            style={{ letterSpacing: 3 }}
          >
            已獲得徽章 (8/24)
          </Text>

          {/* Badge Grid: 2 rows x 4 columns */}
          <View style={{ marginTop: 12, gap: 12 }}>
            {[0, 1].map((row) => (
              <View key={row} className="flex-row" style={{ gap: 12 }}>
                {BADGES.slice(row * 4, row * 4 + 4).map((badge, i) => (
                  <BadgeItem
                    key={`${row}-${i}`}
                    name={badge.name}
                    unlocked={badge.unlocked}
                  />
                ))}
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Milestones Section */}
        <Animated.View
          className="mt-7 px-7"
          entering={FadeInUp.delay(240).springify().damping(20).stiffness(150)}
        >
          <Text
            className="font-body-medium text-[11px] text-text-secondary"
            style={{ letterSpacing: 3 }}
          >
            里程碑
          </Text>

          <View style={{ marginTop: 12, gap: 8 }}>
            {MILESTONES.map((m, i) => (
              <MilestoneRow
                key={i}
                label={m.label}
                date={m.date}
                completed={m.completed}
              />
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ── Sub-components ────────────────────────────────────── */

function BadgeItem({
  name,
  unlocked,
}: {
  name: string;
  unlocked: boolean;
}) {
  const { animatedStyle, pressHandlers } = useAnimatedPress({
    type: "scale",
    disabled: !unlocked,
  });

  return (
    <Animated.View className="flex-1" style={animatedStyle}>
      <Pressable
        className={cn(
          "flex-1 items-center justify-center rounded-card bg-bg-card border",
          unlocked ? "border-gold" : "border-border",
        )}
        style={{
          paddingVertical: 16,
          paddingHorizontal: 8,
          opacity: unlocked ? 1 : 0.3,
        }}
        onPress={
          unlocked
            ? () => Alert.alert("徽章", `${name}\n恭喜獲得此徽章！`)
            : undefined
        }
        {...pressHandlers}
      >
        {unlocked ? (
          <Text style={{ fontSize: 24 }}>🎖️</Text>
        ) : (
          <Lock size={24} color="#4A4A4C" strokeWidth={1.5} />
        )}
        <Text
          className="font-body-medium text-text-primary"
          style={{ fontSize: 10, marginTop: 8 }}
        >
          {name}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

function MilestoneRow({
  label,
  date,
  completed,
}: {
  label: string;
  date?: string;
  completed: boolean;
}) {
  const { animatedStyle, pressHandlers } = useAnimatedPress({ type: "scale" });

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        className="flex-row items-center rounded-[16px] border border-border bg-bg-card"
        style={{
          paddingVertical: 14,
          paddingHorizontal: 20,
          opacity: completed ? 1 : 0.5,
        }}
        onPress={() =>
          Alert.alert(
            "里程碑",
            completed
              ? `${label}\n達成日期：${date}`
              : `${label}\n尚未達成，繼續加油！`,
          )
        }
        {...pressHandlers}
      >
        {completed ? (
          <CheckCircle size={20} color="#6E9E6E" strokeWidth={1.5} />
        ) : (
          <Circle size={20} color="#3A3A3C" strokeWidth={1.5} />
        )}
        <Text
          className="font-body-medium text-text-primary"
          style={{ fontSize: 14, marginLeft: 14, flex: 1 }}
        >
          {label}
        </Text>
        {date && (
          <Text
            className="font-body text-text-secondary"
            style={{ fontSize: 13 }}
          >
            {date}
          </Text>
        )}
      </Pressable>
    </Animated.View>
  );
}
