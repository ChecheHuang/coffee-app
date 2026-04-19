import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Pressable } from "react-native";
import { ChevronLeft, Plus } from "lucide-react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useUserStore } from "@/stores/userStore";
import { MemberCard } from "../../components/MemberCard";

export default function FamilyScreen() {
  const { members, currentUserId, removeMember } = useUserStore();
  const atLimit = members.length >= 6;

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
          家庭成員
        </Text>

        <Pressable
          onPress={() => {
            if (!atLimit) router.push("/family/edit");
          }}
          className="h-11 w-11 items-center justify-center rounded-full border border-border bg-bg-card"
          style={{ opacity: atLimit ? 0.35 : 1 }}
          accessibilityRole="button"
          accessibilityLabel="新增成員"
          disabled={atLimit}
        >
          <Plus size={20} color="#C9A962" strokeWidth={1.5} />
        </Pressable>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 28, paddingTop: 8, paddingBottom: 28, gap: 12 }}
        showsVerticalScrollIndicator={false}
      >
        {members.map((member, i) => (
          <Animated.View
            key={member.id}
            entering={FadeInUp.delay(i * 60).springify().damping(20).stiffness(150)}
          >
            <MemberCard
              member={member}
              isSelf={member.id === currentUserId}
              onRemove={removeMember}
            />
          </Animated.View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
