import { useState } from "react";
import { View, Text, Pressable, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ChevronLeft, Plus } from "lucide-react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useAnimatedPress } from "@/hooks/useAnimatedPress";

/* ── Types ────────────────────────────────────────────── */

interface ScheduleItem {
  id: string;
  name: string;
  desc: string;
  time: string;
  activeDays: boolean[]; // 7 booleans for 一二三四五六日
  enabled: boolean;
}

const DAY_LABELS = ["一", "二", "三", "四", "五", "六", "日"];

const INITIAL_SCHEDULES: ScheduleItem[] = [
  {
    id: "1",
    name: "早晨咖啡",
    desc: "Espresso · 93°C",
    time: "07:30",
    activeDays: [true, true, true, true, true, false, false],
    enabled: true,
  },
  {
    id: "2",
    name: "午後拿鐵",
    desc: "Latte · 90°C",
    time: "14:00",
    activeDays: [true, true, true, true, true, false, false],
    enabled: true,
  },
];

/** Screen 8: 排程管理 (Schedule) */
export default function ScheduleScreen() {
  const [schedules, setSchedules] = useState<ScheduleItem[]>(INITIAL_SCHEDULES);
  const addPress = useAnimatedPress({ type: "opacity" });

  const toggleSchedule = (id: string) => {
    setSchedules((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)),
    );
  };

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
            onPress={() => Alert.alert("新增排程", "新增排程功能即將推出")}
            {...addPress.pressHandlers}
          >
            <Plus size={18} color="#1A1A1C" strokeWidth={2} />
          </Pressable>
        </Animated.View>
      </View>

      {/* 排程卡片列表 */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 28, paddingTop: 16, paddingBottom: 32, gap: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {schedules.map((schedule, index) => (
          <ScheduleCard
            key={schedule.id}
            schedule={schedule}
            index={index}
            onToggle={() => toggleSchedule(schedule.id)}
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
  schedule: ScheduleItem;
  index: number;
  onToggle: () => void;
}) {
  const [localDays, setLocalDays] = useState(schedule.activeDays);

  const toggleDay = (dayIndex: number) => {
    setLocalDays((prev) => prev.map((v, i) => (i === dayIndex ? !v : v)));
  };

  return (
    <Animated.View
      entering={FadeInUp.delay(index * 120 + 100)
        .springify()
        .damping(18)}
    >
      <View
        className="rounded-card bg-bg-card border border-border"
        style={{ padding: 20, gap: 16 }}
      >
        {/* Top row: name/desc + toggle */}
        <View className="flex-row items-center justify-between">
          <View style={{ gap: 4 }}>
            <Text className="font-display-medium text-text-primary" style={{ fontSize: 18 }}>
              {schedule.name}
            </Text>
            <Text className="font-body text-text-secondary" style={{ fontSize: 12 }}>
              {schedule.desc}
            </Text>
          </View>
          <Toggle enabled={schedule.enabled} onPress={onToggle} />
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
              isActive={localDays[i]}
              onPress={() => toggleDay(i)}
            />
          ))}
        </View>
      </View>
    </Animated.View>
  );
}

function DayCircle({
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
        className={`items-center justify-center rounded-full ${
          isActive ? "bg-gold" : "border border-border"
        }`}
        style={{ width: 40, height: 40 }}
        onPress={onPress}
        {...pressHandlers}
      >
        <Text
          className={`font-body-medium ${
            isActive ? "text-bg-primary" : "text-text-secondary"
          }`}
          style={{ fontSize: 13 }}
        >
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

/* ── Toggle ───────────────────────────────────────────── */

function Toggle({
  enabled,
  onPress,
}: {
  enabled: boolean;
  onPress: () => void;
}) {
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
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: "#FFFFFF",
          }}
        />
      </View>
    </Pressable>
  );
}
