import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Animated, { FadeInUp } from "react-native-reanimated";
import {
  BarChart3,
  Cat,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Dog,
  Flame,
  Leaf,
  Smile,
  Trophy,
} from "lucide-react-native";
import { useUserStore } from "@/stores/userStore";
import { LEVEL_NAMES } from "@/types/user";
import { PRESET_AVATARS, type PresetAvatar } from "@/constants/avatars";
import { AvatarPicker } from "../components/AvatarPicker";

const ICON_MAP: Record<PresetAvatar["icon"], typeof Smile> = {
  Smile,
  Cat,
  Dog,
  Coffee,
  Leaf,
  Flame,
};

function getAvatarIcon(avatarId?: string) {
  const preset = PRESET_AVATARS.find((a) => a.id === avatarId);
  return preset ? ICON_MAP[preset.icon] : Smile;
}

function SectionHeader({ title }: { title: string }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        width: "100%",
      }}
    >
      <View style={{ flex: 1, height: 1, backgroundColor: "#3A3A3C" }} />
      <Text
        className="font-body-medium text-[11px] text-text-secondary"
        style={{ letterSpacing: 3 }}
      >
        {title}
      </Text>
      <View style={{ flex: 1, height: 1, backgroundColor: "#3A3A3C" }} />
    </View>
  );
}

export default function ProfileScreen() {
  const { getCurrentUser, updateName, updateAvatar } = useUserStore();
  const user = getCurrentUser();
  const [nameDraft, setNameDraft] = useState(user.name);
  const [pickerOpen, setPickerOpen] = useState(false);

  const AvatarIcon = getAvatarIcon(user.avatarUrl);

  const commitName = () => {
    const trimmed = nameDraft.trim().slice(0, 20);
    if (!trimmed) {
      Alert.alert("請輸入暱稱");
      setNameDraft(user.name);
      return;
    }
    if (trimmed !== user.name) updateName(trimmed);
  };

  const handleSelectAvatar = (avatarId: string) => {
    updateAvatar(avatarId);
    setPickerOpen(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-bg-primary">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 28 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 28,
            paddingVertical: 8,
          }}
        >
          <Pressable
            onPress={() => router.back()}
            className="h-11 w-11 items-center justify-center rounded-full border border-border bg-bg-card"
            accessibilityRole="button"
            accessibilityLabel="返回"
          >
            <ChevronLeft size={20} color="#F5F5F0" strokeWidth={1.5} />
          </Pressable>
          <Text className="font-display-medium text-[20px] text-text-primary">
            個人資料
          </Text>
          <View style={{ width: 44, height: 44 }} />
        </View>

        <View style={{ paddingHorizontal: 28, gap: 32 }}>
          <Animated.View
            style={{ alignItems: "center", gap: 16, paddingTop: 20 }}
            entering={FadeInUp.delay(60).springify().damping(20).stiffness(150)}
          >
            <Pressable
              onPress={() => setPickerOpen(true)}
              className="w-40 h-40 rounded-full bg-bg-card items-center justify-center border-2 border-gold"
              accessibilityRole="button"
              accessibilityLabel="更換頭像"
            >
              <AvatarIcon size={72} color="#C9A962" strokeWidth={1.5} />
            </Pressable>
            <Pressable
              onPress={() => setPickerOpen(true)}
              style={{ height: 44, paddingHorizontal: 16, justifyContent: "center" }}
            >
              <Text className="font-body-medium text-[14px] text-gold">
                更換頭像
              </Text>
            </Pressable>
          </Animated.View>

          <Animated.View
            style={{ gap: 12 }}
            entering={FadeInUp.delay(120).springify().damping(20).stiffness(150)}
          >
            <SectionHeader title="暱稱" />
            <TextInput
              value={nameDraft}
              onChangeText={(t) => setNameDraft(t.slice(0, 20))}
              onBlur={commitName}
              onSubmitEditing={commitName}
              maxLength={20}
              placeholder="輸入暱稱"
              placeholderTextColor="#4A4A4C"
              className="bg-bg-expanded rounded-md px-4 py-4 font-body text-[16px] text-text-primary"
            />
          </Animated.View>

          <Animated.View
            style={{ gap: 8 }}
            entering={FadeInUp.delay(180).springify().damping(20).stiffness(150)}
          >
            <SectionHeader title="帳號資訊" />
            <View className="rounded-card border border-border bg-bg-card overflow-hidden">
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 18,
                  paddingHorizontal: 20,
                  gap: 12,
                }}
              >
                <Coffee size={18} color="#C9A962" strokeWidth={1.5} />
                <Text className="font-body-medium text-[14px] text-text-primary" style={{ flex: 1 }}>
                  咖啡等級
                </Text>
                <Text className="font-body text-[13px] text-text-secondary">
                  {LEVEL_NAMES[user.level]}
                </Text>
              </View>
              <View style={{ height: 1, backgroundColor: "#2A2A2C" }} />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 18,
                  paddingHorizontal: 20,
                  gap: 12,
                }}
              >
                <BarChart3 size={18} color="#C9A962" strokeWidth={1.5} />
                <Text className="font-body-medium text-[14px] text-text-primary" style={{ flex: 1 }}>
                  累積沖煮
                </Text>
                <Text className="font-body text-[13px] text-text-secondary">
                  {user.totalBrews} 杯
                </Text>
              </View>
            </View>
          </Animated.View>

          <Animated.View
            entering={FadeInUp.delay(240).springify().damping(20).stiffness(150)}
          >
            <Pressable
              onPress={() => router.push("/achievements")}
              className="rounded-card border border-border bg-bg-card overflow-hidden"
              accessibilityRole="button"
              accessibilityLabel="查看成就"
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 18,
                  paddingHorizontal: 20,
                  gap: 12,
                }}
              >
                <Trophy size={18} color="#C9A962" strokeWidth={1.5} />
                <Text className="font-body-medium text-[14px] text-text-primary" style={{ flex: 1 }}>
                  查看成就
                </Text>
                <ChevronRight size={16} color="#4A4A4C" strokeWidth={1.5} />
              </View>
            </Pressable>
          </Animated.View>
        </View>
      </ScrollView>

      <AvatarPicker
        visible={pickerOpen}
        selectedId={user.avatarUrl}
        onSelect={handleSelectAvatar}
        onClose={() => setPickerOpen(false)}
      />
    </SafeAreaView>
  );
}
