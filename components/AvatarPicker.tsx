import { Modal, Pressable, Text, View } from "react-native";
import { Cat, Coffee, Dog, Flame, Leaf, Smile } from "lucide-react-native";
import { cn } from "@/utils/cn";
import { PRESET_AVATARS, type PresetAvatar } from "@/constants/avatars";

const ICON_MAP: Record<PresetAvatar["icon"], typeof Smile> = {
  Smile,
  Cat,
  Dog,
  Coffee,
  Leaf,
  Flame,
};

interface AvatarPickerProps {
  visible: boolean;
  selectedId?: string;
  onSelect: (avatarId: string) => void;
  onClose: () => void;
}

export function AvatarPicker({
  visible,
  selectedId,
  onSelect,
  onClose,
}: AvatarPickerProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable className="flex-1 bg-black/50" onPress={onClose}>
        <View className="flex-1" />
      </Pressable>
      <View className="bg-bg-primary rounded-t-[20px] pb-8">
        <View className="items-center pt-3 pb-2">
          <View className="w-10 h-1 rounded-full bg-border" />
        </View>
        <Text
          className="font-display-medium text-[20px] text-text-primary text-center"
        >
          選擇頭像
        </Text>
        <View className="flex-row flex-wrap justify-center gap-4 px-7 py-6">
          {PRESET_AVATARS.map((avatar) => {
            const Icon = ICON_MAP[avatar.icon];
            const isSelected = selectedId === avatar.id;
            return (
              <Pressable
                key={avatar.id}
                onPress={() => onSelect(avatar.id)}
                className={cn(
                  "w-20 h-20 rounded-full bg-bg-card items-center justify-center border",
                  isSelected ? "border-2 border-gold" : "border border-border",
                )}
                accessibilityRole="button"
                accessibilityLabel={avatar.label}
              >
                <Icon
                  size={36}
                  color={isSelected ? "#C9A962" : "#6E6E70"}
                  strokeWidth={1.5}
                />
              </Pressable>
            );
          })}
        </View>
        <View className="items-center px-7 pt-2">
          <Pressable onPress={onClose} className="h-11 px-4 justify-center">
            <Text className="font-body-medium text-[14px] text-gold">取消</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
