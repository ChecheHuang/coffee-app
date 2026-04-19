import { Alert, Pressable, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { Cat, Coffee, Dog, Flame, Leaf, Smile } from "lucide-react-native";
import { router } from "expo-router";
import type { User } from "@/types/user";
import { LEVEL_NAMES } from "@/types/user";
import { PRESET_AVATARS, type PresetAvatar } from "@/constants/avatars";
import { useAnimatedPress } from "@/hooks/useAnimatedPress";
import { cn } from "@/utils/cn";

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

type Props = {
  member: User;
  isSelf: boolean;
  onRemove: (id: string) => void;
};

export function MemberCard({ member, isSelf, onRemove }: Props) {
  const { animatedStyle, pressHandlers } = useAnimatedPress({ type: "scale" });
  const AvatarIcon = getAvatarIcon(member.avatarUrl);

  const handleLongPress = () => {
    const options = isSelf
      ? [
          {
            text: "編輯",
            onPress: () =>
              router.push(`/family/edit?userId=${member.id}`),
          },
          { text: "取消", style: "cancel" as const },
        ]
      : [
          {
            text: "編輯",
            onPress: () =>
              router.push(`/family/edit?userId=${member.id}`),
          },
          {
            text: "刪除",
            style: "destructive" as const,
            onPress: () =>
              Alert.alert("確認刪除", `刪除成員「${member.name}」？`, [
                { text: "取消", style: "cancel" },
                {
                  text: "刪除",
                  style: "destructive",
                  onPress: () => onRemove(member.id),
                },
              ]),
          },
          { text: "取消", style: "cancel" as const },
        ];

    Alert.alert(member.name, undefined, options);
  };

  const handlePress = () => router.push(`/family/edit?userId=${member.id}`);

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        className="flex-row items-center rounded-card border border-border bg-bg-card"
        style={{ padding: 16, gap: 12 }}
        onPress={handlePress}
        onLongPress={handleLongPress}
        {...pressHandlers}
      >
        <View
          className="items-center justify-center rounded-full border-2 border-gold bg-bg-card"
          style={{ width: 56, height: 56 }}
        >
          <AvatarIcon size={24} color="#C9A962" strokeWidth={1.5} />
        </View>

        <View style={{ flex: 1, gap: 4 }}>
          <View className="flex-row items-center justify-between">
            <Text className="font-body-semibold text-[16px] text-text-primary">
              {member.name}
            </Text>
            {isSelf && (
              <View
                className="rounded-pill"
                style={{
                  backgroundColor: "#C9A962",
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                }}
              >
                <Text
                  style={{
                    color: "#1A1A1C",
                    fontSize: 10,
                    fontWeight: "700",
                    fontFamily: "Inter",
                  }}
                >
                  本人
                </Text>
              </View>
            )}
          </View>
          <Text className="font-body text-[12px] text-text-secondary">
            ☕ {LEVEL_NAMES[member.level]}  ·  {member.totalBrews} 杯
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}
