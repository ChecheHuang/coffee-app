import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ChevronLeft, Plus } from "lucide-react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useAnimatedPress } from "@/hooks/useAnimatedPress";
import { useScheduleStore } from "@/stores/scheduleStore";
import type { Schedule } from "@/types/schedule";

const DAY_LABELS = ["一", "二", "三", "四", "五", "六", "日"] as const;
// DAY_LABELS index → Schedule.days value (0=日,1=一,...,6=六)
const LABEL_TO_DAY = [1, 2, 3, 4, 5, 6, 0] as const;

/** Screen 8: 排程管理 (Schedule) */
export default function ScheduleScreen() {
  const { schedules, toggleEnabled } = useScheduleStore();
  const addPress = useAnimatedPress({ type: "opacity" });

  return (
    <SafeAreaView className="flex-1 bg-bg-primary">
      {/* 導航列 */}
      <View className="flex-row items-center justify-between px-7 py-2">
        <Pressable
          onPress={() => router.back()}
          className="h-11 w-11 items-center justify-center rounded-full bg-bg-card border border-border"
        >
          <ChevronLeft size={20} color="#F5F5F0" strokeWidth={1.5} />
        </Pressable>
        <Text className="font-display-medium text-xl text-text-primary">
          排程管理
        </Text>
        <Animated.View style={addPress.animatedStyle}>
          <Pressable
            className="h-11 w-11 items-center justify-center rounded-full bg-gold"
            onPress={() => router.push("/schedule/new")}
            {...addPress.pressHandlers}
          >
            <Plus size={18} color="#1A1A1C" strokeWidth={2} />
          </Pressable>
        </Animated.View>
      </View>

      {/* 排程卡片列表 */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 28,
          paddingTop: 16,
          paddingBottom: 32,
          gap: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        {schedules.map((schedule, index) => (
          <ScheduleCard
            key={schedule.id}
            schedule={schedule}
            index={index}
            onToggle={() => toggleEnabled(schedule.id)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

/* ── Schedule Card ────────────────────────────────────── */

function ScheduleCard({
  schedule,
  index,
  onToggle,
}: {
  schedule: Schedule;
  index: number;
  onToggle: () => void;
}) {
  return (
    <Animated.View
      entering={FadeInUp.delay(index * 120 + 100)
        .springify()
        .damping(18)}
    >
      <Pressable
        onPress={() => router.push(`/schedule/edit?id=${schedule.id}`)}
        className="rounded-card bg-bg-card border border-border"
        style={{ padding: 20, gap: 16 }}
      >
        {/* Top row: name + toggle */}
        <View className="flex-row items-center justify-between">
          <View style={{ gap: 4 }}>
            <Text
              className="font-display-medium text-text-primary"
              style={{ fontSize: 18 }}
            >
              {schedule.name}
            </Text>
            <Text
              className="font-body text-text-secondary"
              style={{ fontSize: 12 }}
            >
              {schedule.drinkId} · {schedule.temperature ?? "—"}°C
            </Text>
          </View>
          <Toggle enabled={schedule.isEnabled} onPress={onToggle} />
        </View>

        {/* Time */}
        <Text className="font-display-light text-gold" style={{ fontSize: 42 }}>
          {schedule.time}
        </Text>

        {/* Day circles */}
        <View className="flex-row" style={{ gap: 6 }}>
          {DAY_LABELS.map((label, i) => (
            <DayCircle
              key={label}
              label={label}
              isActive={schedule.days.includes(LABEL_TO_DAY[i])}
            />
          ))}
        </View>
      </Pressable>
    </Animated.View>
  );
}

function DayCircle({ label, isActive }: { label: string; isActive: boolean }) {
  return (
    <View
      className={`items-center justify-center rounded-full ${
        isActive ? "bg-gold" : "border border-border"
      }`}
      style={{ width: 40, height: 40 }}
    >
      <Text
        className={`font-body-medium ${
          isActive ? "text-bg-primary" : "text-text-secondary"
        }`}
        style={{ fontSize: 13 }}
      >
        {label}
      </Text>
    </View>
  );
}

/* ── Toggle ───────────────────────────────────────────── */

function Toggle({ enabled, onPress }: { enabled: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <View
        className="flex-row items-center"
        style={{
          width: 48,
          height: 28,
          borderRadius: 14,
          backgroundColor: enabled ? "#C9A962" : "#3A3A3C",
          padding: 2,
          justifyContent: enabled ? "flex-end" : "flex-start",
        }}
      >
        <View
          style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: "#FFFFFF" }}
        />
      </View>
    </Pressable>
  );
}
