import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Animated, { FadeInUp } from "react-native-reanimated";
import {
  User,
  Users,
  Coffee,
  Wifi,
  RefreshCw,
  Wrench,
  Droplets,
  Package,
  ChevronRight,
} from "lucide-react-native";
import { useAnimatedPress } from "@/hooks/useAnimatedPress";

type SettingsRowProps = {
  icon: React.ReactNode;
  label: string;
  badge?: React.ReactNode;
  isLast?: boolean;
  onPress?: () => void;
};

function SettingsRow({ icon, label, badge, isLast, onPress }: SettingsRowProps) {
  const { animatedStyle, pressHandlers } = useAnimatedPress({ type: "scale" });

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        className={`flex-row items-center ${!isLast ? "border-b border-border" : ""}`}
        style={{ paddingVertical: 18, paddingHorizontal: 20, gap: 12 }}
        onPress={onPress}
        {...pressHandlers}
      >
        {icon}
        <Text className="flex-1 font-body-medium text-[14px] text-text-primary">
          {label}
        </Text>
        {badge}
        <ChevronRight size={18} color="#6E6E70" strokeWidth={1.5} />
      </Pressable>
    </Animated.View>
  );
}

type SectionProps = {
  title: string;
  children: React.ReactNode;
  index: number;
};

function SettingsSection({ title, children, index }: SectionProps) {
  return (
    <Animated.View
      entering={FadeInUp.delay(index * 100)
        .springify()
        .damping(20)
        .stiffness(150)}
    >
      <Text
        className="font-body-medium text-[11px] text-text-secondary"
        style={{ marginBottom: 10 }}
      >
        {title}
      </Text>
      <View className="overflow-hidden rounded-card border border-border bg-bg-card">
        {children}
      </View>
    </Animated.View>
  );
}

/** Screen 7: 設定頁 (Settings) — 對應 Pencil 設計稿 */
export default function SettingsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-bg-primary">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 28 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-7">
          <Text className="font-display text-[36px] text-text-primary">
            設定
          </Text>
        </View>

        {/* Sections */}
        <View className="px-7" style={{ marginTop: 20, gap: 20 }}>
          {/* 用戶 */}
          <SettingsSection title="用戶" index={0}>
            <SettingsRow
              icon={<User size={18} color="#C9A962" strokeWidth={1.5} />}
              label="Bennett"
              onPress={() => Alert.alert("個人資料", "個人資料頁面即將推出")}
            />
            <SettingsRow
              icon={<Users size={18} color="#6E6E70" strokeWidth={1.5} />}
              label="家庭成員管理"
              isLast
              onPress={() => Alert.alert("家庭成員", "家庭成員管理即將推出")}
            />
          </SettingsSection>

          {/* 咖啡機 */}
          <SettingsSection title="咖啡機" index={1}>
            <SettingsRow
              icon={<Coffee size={18} color="#C9A962" strokeWidth={1.5} />}
              label="BrewMaster Pro"
              badge={
                <View
                  className="rounded-pill"
                  style={{
                    backgroundColor: "#6E9E6E",
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                  }}
                >
                  <Text className="font-body-medium text-[10px] text-bg-primary">
                    已連線
                  </Text>
                </View>
              }
              onPress={() => Alert.alert("咖啡機資訊", "咖啡機詳細資訊即將推出")}
            />
            <SettingsRow
              icon={<Wifi size={18} color="#6E6E70" strokeWidth={1.5} />}
              label="WiFi 設定"
              onPress={() => Alert.alert("WiFi 設定", "WiFi 設定頁面即將推出")}
            />
            <SettingsRow
              icon={<RefreshCw size={18} color="#6E6E70" strokeWidth={1.5} />}
              label="韌體更新"
              badge={
                <Text className="font-body-medium text-[10px] text-gold">
                  最新版 ✓
                </Text>
              }
              isLast
              onPress={() => Alert.alert("韌體更新", "已是最新版本")}
            />
          </SettingsSection>

          {/* 維護 */}
          <SettingsSection title="維護" index={2}>
            <SettingsRow
              icon={<Wrench size={18} color="#C9A962" strokeWidth={1.5} />}
              label="維護中心"
              onPress={() => Alert.alert("維護中心", "維護中心頁面即將推出")}
            />
            <SettingsRow
              icon={<Droplets size={18} color="#6E6E70" strokeWidth={1.5} />}
              label="引擎式清潔"
              onPress={() =>
                Alert.alert("引擎式清潔", "確定要執行清潔程序嗎？", [
                  { text: "取消", style: "cancel" },
                  { text: "執行", onPress: () => Alert.alert("清潔中", "清潔程序已啟動") },
                ])
              }
            />
            <SettingsRow
              icon={<Package size={18} color="#6E6E70" strokeWidth={1.5} />}
              label="耗材紀錄"
              isLast
              onPress={() => Alert.alert("耗材紀錄", "耗材紀錄頁面即將推出")}
            />
          </SettingsSection>

          {/* 其他 */}
          <Animated.View
            entering={FadeInUp.delay(300)
              .springify()
              .damping(20)
              .stiffness(150)}
          >
            <Text className="font-body-medium text-[11px] text-text-secondary">
              其他
            </Text>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
