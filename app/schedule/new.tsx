import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useScheduleStore } from "@/stores/scheduleStore";
import { PRESET_DRINKS } from "@/constants/drinks";
import { cn } from "@/utils/cn";

const DAY_LABELS = ["一", "二", "三", "四", "五", "六", "日"] as const;
const LABEL_TO_DAY = [1, 2, 3, 4, 5, 6, 0] as const;

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 12 }, (_, i) => i * 5);

export default function NewScheduleScreen() {
  const { addSchedule } = useScheduleStore();

  const [name, setName] = useState("");
  const [hour, setHour] = useState(7);
  const [minute, setMinute] = useState(30);
  const [drinkId, setDrinkId] = useState(PRESET_DRINKS[0].id);
  const [temperature, setTemperature] = useState(92);
  const [activeLabelIndices, setActiveLabelIndices] = useState<number[]>([
    0, 1, 2, 3, 4,
  ]);

  const toggleDay = (labelIndex: number) =>
    setActiveLabelIndices((prev) =>
      prev.includes(labelIndex)
        ? prev.filter((i) => i !== labelIndex)
        : [...prev, labelIndex],
    );

  const handleSave = () => {
    if (name.trim() === "") {
      Alert.alert("請輸入排程名稱");
      return;
    }
    if (activeLabelIndices.length === 0) {
      Alert.alert("請至少選擇一天");
      return;
    }
    addSchedule({
      name: name.trim(),
      drinkId,
      time: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
      days: activeLabelIndices.map((i) => LABEL_TO_DAY[i]),
      temperature,
      isEnabled: true,
    });
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-bg-primary">
      {/* Nav Bar */}
      <View className="flex-row items-center justify-between px-7 py-3">
        <Pressable onPress={() => router.back()}>
          <Text className="font-body text-text-secondary" style={{ fontSize: 16 }}>
            取消
          </Text>
        </Pressable>
        <Pressable onPress={handleSave}>
          <Text className="font-body-semibold text-gold" style={{ fontSize: 16 }}>
            保存
          </Text>
        </Pressable>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 28, paddingBottom: 48, gap: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 頁面標題 */}
        <Text className="font-display-medium text-text-primary" style={{ fontSize: 28 }}>
          新增排程
        </Text>

        {/* Section：名稱 */}
        <View style={{ gap: 12 }}>
          <SectionLabel>名稱</SectionLabel>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="例：晨間 Latte"
            placeholderTextColor="#4A4A4C"
            className="font-body text-text-primary"
            style={{
              backgroundColor: "#2A2A2C",
              borderRadius: 16,
              padding: 16,
              fontSize: 16,
            }}
          />
        </View>

        {/* Section：時間 */}
        <View style={{ gap: 12 }}>
          <SectionLabel>時間</SectionLabel>
          <View className="flex-row items-center justify-center" style={{ gap: 8 }}>
            {/* 時 */}
            <View
              className="flex-row items-center"
              style={{ backgroundColor: "#2A2A2C", borderRadius: 16 }}
            >
              <Pressable
                onPress={() => setHour((h) => (h - 1 + 24) % 24)}
                style={{ padding: 12 }}
              >
                <Text className="text-text-secondary" style={{ fontSize: 18 }}>
                  ‹
                </Text>
              </Pressable>
              <Text
                className="font-display-light text-gold"
                style={{ fontSize: 42, minWidth: 60, textAlign: "center" }}
              >
                {String(hour).padStart(2, "0")}
              </Text>
              <Pressable
                onPress={() => setHour((h) => (h + 1) % 24)}
                style={{ padding: 12 }}
              >
                <Text className="text-text-secondary" style={{ fontSize: 18 }}>
                  ›
                </Text>
              </Pressable>
            </View>

            <Text className="font-display-light text-gold" style={{ fontSize: 42 }}>
              :
            </Text>

            {/* 分 */}
            <View
              className="flex-row items-center"
              style={{ backgroundColor: "#2A2A2C", borderRadius: 16 }}
            >
              <Pressable
                onPress={() =>
                  setMinute((m) => {
                    const idx = MINUTES.indexOf(m);
                    return MINUTES[(idx - 1 + MINUTES.length) % MINUTES.length];
                  })
                }
                style={{ padding: 12 }}
              >
                <Text className="text-text-secondary" style={{ fontSize: 18 }}>
                  ‹
                </Text>
              </Pressable>
              <Text
                className="font-display-light text-gold"
                style={{ fontSize: 42, minWidth: 60, textAlign: "center" }}
              >
                {String(minute).padStart(2, "0")}
              </Text>
              <Pressable
                onPress={() =>
                  setMinute((m) => {
                    const idx = MINUTES.indexOf(m);
                    return MINUTES[(idx + 1) % MINUTES.length];
                  })
                }
                style={{ padding: 12 }}
              >
                <Text className="text-text-secondary" style={{ fontSize: 18 }}>
                  ›
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Section：飲品 */}
        <View style={{ gap: 12 }}>
          <SectionLabel>飲品</SectionLabel>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8 }}
          >
            {PRESET_DRINKS.map((drink) => {
              const isActive = drink.id === drinkId;
              return (
                <Pressable
                  key={drink.id}
                  onPress={() => setDrinkId(drink.id)}
                  className={cn(
                    "rounded-full px-4 py-2",
                    isActive
                      ? "bg-gold"
                      : "bg-bg-card border border-border",
                  )}
                >
                  <Text
                    className={cn(
                      "font-body-medium",
                      isActive ? "text-bg-primary" : "text-text-secondary",
                    )}
                    style={{ fontSize: 13 }}
                  >
                    {drink.name}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Section：溫度 */}
        <View style={{ gap: 12 }}>
          <View className="flex-row items-center justify-between">
            <SectionLabel>溫度</SectionLabel>
            <Text className="font-body-medium text-gold" style={{ fontSize: 14 }}>
              {temperature}°C
            </Text>
          </View>
          <TemperatureSlider value={temperature} onChange={setTemperature} />
        </View>

        {/* Section：重複 */}
        <View style={{ gap: 12 }}>
          <SectionLabel>重複</SectionLabel>
          <View className="flex-row justify-between">
            {DAY_LABELS.map((label, i) => {
              const isActive = activeLabelIndices.includes(i);
              return (
                <Pressable
                  key={label}
                  onPress={() => toggleDay(i)}
                  className={cn(
                    "items-center justify-center rounded-full",
                    isActive ? "border border-gold" : "border border-border",
                  )}
                  style={{ width: 40, height: 40, backgroundColor: "#2A2A2C" }}
                >
                  <Text
                    className={cn(
                      "font-body-medium",
                      isActive ? "text-gold" : "text-text-secondary",
                    )}
                    style={{ fontSize: 13 }}
                  >
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ── Sub-components ───────────────────────────────────── */

function SectionLabel({ children }: { children: string }) {
  return (
    <Text
      className="font-body-medium text-text-secondary"
      style={{ fontSize: 11, letterSpacing: 3 }}
    >
      {children.toUpperCase()}
    </Text>
  );
}

function TemperatureSlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const MIN = 85;
  const MAX = 96;
  const steps = MAX - MIN;
  const pct = (value - MIN) / steps;

  return (
    <View style={{ gap: 8 }}>
      <View
        className="flex-row items-center justify-between"
        style={{ paddingHorizontal: 4 }}
      >
        <Text className="font-body text-text-secondary" style={{ fontSize: 12 }}>
          85°C
        </Text>
        <Text className="font-body text-text-secondary" style={{ fontSize: 12 }}>
          96°C
        </Text>
      </View>
      {/* Touch-zone row of step buttons */}
      <View className="flex-row justify-between" style={{ gap: 4 }}>
        {Array.from({ length: steps + 1 }, (_, i) => {
          const temp = MIN + i;
          const isActive = temp <= value;
          return (
            <Pressable
              key={temp}
              onPress={() => onChange(temp)}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 2,
                backgroundColor: isActive ? "#C9A962" : "#2A2A2C",
              }}
            />
          );
        })}
      </View>
      <Text
        className="font-body text-text-secondary text-center"
        style={{ fontSize: 12 }}
      >
        {value}°C 已選
      </Text>
    </View>
  );
}
