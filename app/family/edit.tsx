import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft, Smile, Cat, Dog, Coffee, Leaf, Flame } from "lucide-react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useUserStore } from "@/stores/userStore";
import { PRESET_AVATARS, type PresetAvatar } from "@/constants/avatars";
import { AvatarPicker } from "../../components/AvatarPicker";

const ICON_MAP: Record<PresetAvatar["icon"], typeof Smile> = {
  Smile, Cat, Dog, Coffee, Leaf, Flame,
};

function getAvatarIcon(avatarId?: string) {
  const preset = PRESET_AVATARS.find((a) => a.id === avatarId);
  return preset ? ICON_MAP[preset.icon] : Smile;
}

export default function FamilyEditScreen() {
  const { userId } = useLocalSearchParams<{ userId?: string }>();
  const { members, addMember, updateMember } = useUserStore();

  const isEditMode = !!userId;
  const existing = isEditMode ? members.find((m) => m.id === userId) : undefined;

  const [name, setName] = useState(existing?.name ?? "");
  const [avatarId, setAvatarId] = useState(existing?.avatarUrl);
  const [pickerOpen, setPickerOpen] = useState(false);

  const AvatarIcon = getAvatarIcon(avatarId);

  const handleSave = () => {
    const trimmed = name.trim().slice(0, 20);
    if (!trimmed) {
      Alert.alert("請輸入暱稱");
      return;
    }
    if (isEditMode && existing) {
      updateMember(existing.id, { name: trimmed, avatarUrl: avatarId });
    } else {
      if (members.length >= 6) {
        Alert.alert("已達成員上限（6 人）");
        return;
      }
      addMember({ name: trimmed, avatarUrl: avatarId });
    }
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-bg-primary">
      {/* Nav Header */}
      <View
        className="flex-row items-center justify-between"
        style={{ paddingHorizontal: 28, paddingVertical: 8 }}
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
          {isEditMode ? "編輯成員" : "新增成員"}
        </Text>

        <Pressable
          onPress={handleSave}
          accessibilityRole="button"
          accessibilityLabel="保存"
        >
          <Text className="font-body-semibold text-[16px] text-gold">
            保存
          </Text>
        </Pressable>
      </View>

      {/* Content */}
      <View style={{ paddingHorizontal: 28, paddingTop: 20, gap: 32, alignItems: "center" }}>
        {/* Avatar block */}
        <Animated.View
          style={{ alignItems: "center", gap: 16 }}
          entering={FadeInUp.delay(60).springify().damping(20).stiffness(150)}
        >
          <Pressable
            onPress={() => setPickerOpen(true)}
            className="items-center justify-center rounded-full border-2 border-gold bg-bg-card"
            style={{ width: 120, height: 120 }}
            accessibilityRole="button"
            accessibilityLabel="更換頭像"
          >
            <AvatarIcon size={48} color="#C9A962" strokeWidth={1.5} />
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

        {/* Nickname section */}
        <Animated.View
          style={{ gap: 12, width: "100%" }}
          entering={FadeInUp.delay(120).springify().damping(20).stiffness(150)}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
          >
            <View style={{ flex: 1, height: 1, backgroundColor: "#3A3A3C" }} />
            <Text
              className="font-body-medium text-[11px] text-text-secondary"
              style={{ letterSpacing: 3 }}
            >
              暱稱
            </Text>
            <View style={{ flex: 1, height: 1, backgroundColor: "#3A3A3C" }} />
          </View>
          <TextInput
            value={name}
            onChangeText={(t) => setName(t.slice(0, 20))}
            onSubmitEditing={handleSave}
            maxLength={20}
            placeholder="請輸入暱稱"
            placeholderTextColor="#4A4A4C"
            className="bg-bg-expanded rounded-md px-4 py-4 font-body text-[16px] text-text-primary"
          />
        </Animated.View>
      </View>

      <AvatarPicker
        visible={pickerOpen}
        selectedId={avatarId}
        onSelect={(id) => {
          setAvatarId(id);
          setPickerOpen(false);
        }}
        onClose={() => setPickerOpen(false)}
      />
    </SafeAreaView>
  );
}
