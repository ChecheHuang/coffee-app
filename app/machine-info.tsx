import { useRef, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as Clipboard from "expo-clipboard";
import Animated, { FadeInUp } from "react-native-reanimated";
import { ChevronLeft, Coffee, Copy } from "lucide-react-native";
import { useMachineStore } from "@/stores/machineStore";

const CONNECTION_LABEL: Record<string, string> = {
  ble: "BLE",
  wifi: "WiFi",
  none: "未連線",
};

function SectionLabel({ title }: { title: string }) {
  return (
    <Text
      className="font-body-medium text-[11px] text-text-secondary"
      style={{ letterSpacing: 3 }}
    >
      {title.toUpperCase()}
    </Text>
  );
}

type InfoRowProps = {
  label: string;
  value?: string;
  isLast?: boolean;
  right?: React.ReactNode;
};

function InfoRow({ label, value, isLast, right }: InfoRowProps) {
  return (
    <>
      <View
        className="flex-row items-center"
        style={{ paddingVertical: 14, paddingHorizontal: 20, gap: 12 }}
      >
        <Text className="flex-1 font-body-medium text-[14px] text-text-secondary">
          {label}
        </Text>
        {!!value && (
          <Text className="font-body text-[14px] text-text-primary">
            {value}
          </Text>
        )}
        {right}
      </View>
      {!isLast && <View className="bg-border-divider" style={{ height: 1 }} />}
    </>
  );
}

function InfoCard({ children }: { children: React.ReactNode }) {
  return (
    <View className="overflow-hidden rounded-card border border-border bg-bg-card">
      {children}
    </View>
  );
}

function StatusPill({
  label,
  active,
}: {
  label: string;
  active: boolean;
}) {
  return (
    <View
      style={{
        backgroundColor: active ? "#6E9E6E" : "#FF9800",
        borderRadius: 34,
        paddingHorizontal: 8,
        paddingVertical: 2,
      }}
    >
      <Text className="font-body-semibold text-[10px]" style={{ color: "#FFFFFF" }}>
        {label}
      </Text>
    </View>
  );
}

export default function MachineInfoScreen() {
  const machine = useMachineStore();
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isWarrantyValid = machine.warrantyEndDate > Date.now();
  const formatDate = (ms: number) => new Date(ms).toISOString().split("T")[0];

  function showToast(msg: string) {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastMsg(msg);
    toastTimer.current = setTimeout(() => setToastMsg(null), 2000);
  }

  const handleCopySerial = async () => {
    await Clipboard.setStringAsync(machine.serialNumber);
    showToast("序號已複製");
  };

  const handleCheckUpdate = () => {
    showToast("檢查中…");
    setTimeout(() => {
      showToast(
        machine.isLatestFirmware ? "已是最新版本" : "發現新版本 v2.3.2"
      );
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-bg-primary">
      {/* NavBar */}
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
          咖啡機資訊
        </Text>
        <View style={{ width: 44, height: 44 }} />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: 28, gap: 28 }}>
          {/* Hero */}
          <Animated.View
            style={{ alignItems: "center", gap: 8, paddingVertical: 16 }}
            entering={FadeInUp.delay(60).springify().damping(20).stiffness(150)}
          >
            <Coffee size={80} color="#C9A962" strokeWidth={1.5} />
            <Text className="font-display text-[24px] text-text-primary">
              {machine.model}
            </Text>
          </Animated.View>

          {/* 基本資訊 */}
          <Animated.View
            style={{ gap: 8 }}
            entering={FadeInUp.delay(120).springify().damping(20).stiffness(150)}
          >
            <SectionLabel title="基本資訊" />
            <InfoCard>
              <InfoRow label="型號" value={machine.model} />
              <InfoRow
                label="序號"
                value={machine.serialNumber}
                right={
                  <Pressable onPress={handleCopySerial} hitSlop={8}>
                    <Copy size={14} color="#C9A962" strokeWidth={1.5} />
                  </Pressable>
                }
              />
              <InfoRow
                label="購買日"
                value={formatDate(machine.purchaseDate)}
                isLast
              />
            </InfoCard>
          </Animated.View>

          {/* 連線狀態 */}
          <Animated.View
            style={{ gap: 8 }}
            entering={FadeInUp.delay(180).springify().damping(20).stiffness(150)}
          >
            <SectionLabel title="連線狀態" />
            <InfoCard>
              <InfoRow
                label="連線類型"
                value={CONNECTION_LABEL[machine.connectionType] ?? "未知"}
                isLast
                right={
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: machine.isConnected
                        ? "#6E9E6E"
                        : "#4A4A4C",
                    }}
                  />
                }
              />
            </InfoCard>
          </Animated.View>

          {/* 韌體 */}
          <Animated.View
            style={{ gap: 8 }}
            entering={FadeInUp.delay(240).springify().damping(20).stiffness(150)}
          >
            <SectionLabel title="韌體" />
            <InfoCard>
              <InfoRow
                label="版本"
                value={machine.firmwareVersion}
                isLast
                right={
                  <StatusPill
                    label={machine.isLatestFirmware ? "最新版 ✓" : "可更新"}
                    active={machine.isLatestFirmware}
                  />
                }
              />
              <Pressable
                onPress={handleCheckUpdate}
                className="items-center justify-center"
                style={{ paddingVertical: 12 }}
                accessibilityRole="button"
              >
                <Text className="font-body-medium text-[14px] text-gold">
                  檢查更新
                </Text>
              </Pressable>
            </InfoCard>
          </Animated.View>

          {/* 保固 */}
          <Animated.View
            style={{ gap: 8 }}
            entering={FadeInUp.delay(300).springify().damping(20).stiffness(150)}
          >
            <SectionLabel title="保固" />
            <InfoCard>
              <InfoRow
                label="到期日"
                value={formatDate(machine.warrantyEndDate)}
              />
              <InfoRow
                label="狀態"
                isLast
                right={
                  <StatusPill
                    label={isWarrantyValid ? "有效" : "已過期"}
                    active={isWarrantyValid}
                  />
                }
              />
            </InfoCard>
          </Animated.View>
        </View>
      </ScrollView>

      {/* Toast */}
      {toastMsg ? (
        <View
          style={{
            position: "absolute",
            bottom: 100,
            left: 28,
            right: 28,
            backgroundColor: "#2A2A2C",
            borderRadius: 12,
            paddingVertical: 12,
            paddingHorizontal: 16,
            alignItems: "center",
          }}
        >
          <Text className="font-body text-[14px] text-text-primary">
            {toastMsg}
          </Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
}
