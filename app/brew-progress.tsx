import { useEffect, useState, useRef, useCallback } from "react";
import { View, Text, Pressable, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { X, Check, Coffee } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  withDelay,
  withSpring,
  Easing,
  FadeIn,
  FadeInUp,
} from "react-native-reanimated";

/* ── Constants ─────────────────────────────────────────── */

const STAGES = ["研磨", "預浸", "萃取", "完成"] as const;
const TOTAL_DURATION = 120;

const STAGE_WEIGHTS = [0.15, 0.25, 0.35, 0.25];
const STAGE_THRESHOLDS = STAGE_WEIGHTS.reduce<number[]>((acc, w, i) => {
  acc.push((acc[i - 1] ?? 0) + w);
  return acc;
}, []);

function getStageIndex(progress: number): number {
  for (let i = 0; i < STAGE_THRESHOLDS.length; i++) {
    if (progress < STAGE_THRESHOLDS[i]) return i;
  }
  return STAGES.length - 1;
}

type Phase = "idle" | "brewing" | "complete";

/** Screen 4: 沖煮進度 (Brew Progress — Full-screen Modal) */
export default function BrewProgressScreen() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const progress = Math.min(elapsed / TOTAL_DURATION, 1);
  const currentStage =
    phase === "idle"
      ? -1
      : progress >= 1
        ? STAGES.length
        : getStageIndex(progress);
  const remaining = Math.max(TOTAL_DURATION - elapsed, 0);
  const pct = Math.round(progress * 100);

  // Completion animation
  const completeFade = useSharedValue(0);
  const completeScale = useSharedValue(0.8);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startBrew = useCallback(() => {
    setPhase("brewing");
    setElapsed(0);
    intervalRef.current = setInterval(() => {
      setElapsed((prev) => {
        if (prev >= TOTAL_DURATION) {
          return TOTAL_DURATION;
        }
        return prev + 1;
      });
    }, 1000);
  }, []);

  // Watch for completion
  useEffect(() => {
    if (phase === "brewing" && progress >= 1) {
      stopTimer();
      setPhase("complete");
      completeFade.value = withTiming(1, { duration: 500 });
      completeScale.value = withSpring(1, { damping: 12, stiffness: 150 });
    }
  }, [progress, phase]);

  // Cleanup on unmount
  useEffect(() => {
    return () => stopTimer();
  }, []);

  const handleCancelPress = useCallback(() => {
    setShowCancelModal(true);
  }, []);

  const handleCancelConfirm = useCallback(() => {
    stopTimer();
    setShowCancelModal(false);
    router.back();
  }, []);

  const handleCancelDismiss = useCallback(() => {
    setShowCancelModal(false);
  }, []);

  const completeOverlayStyle = useAnimatedStyle(() => ({
    opacity: completeFade.value,
    transform: [{ scale: completeScale.value }],
  }));

  return (
    <SafeAreaView className="flex-1 bg-bg-primary">
      {/* Close / X Button */}
      <Animated.View
        entering={FadeIn.delay(200).duration(300)}
        className="items-end px-7 py-2"
      >
        <Pressable
          onPress={phase === "brewing" ? handleCancelPress : () => router.back()}
          className="h-11 w-11 items-center justify-center rounded-full bg-bg-card border border-border"
        >
          <X size={18} color="#6E6E70" strokeWidth={1.5} />
        </Pressable>
      </Animated.View>

      {/* Main Content */}
      <View className="flex-1 justify-center px-7" style={{ gap: 32 }}>
        {/* Coffee Cup */}
        <Animated.View
          entering={FadeInUp.delay(100).springify().damping(18)}
          style={{ alignSelf: "center" }}
        >
          <CupIllustration showSteam={phase === "brewing"} />
        </Animated.View>

        {/* Title & Subtitle */}
        <Animated.View
          entering={FadeInUp.delay(200).springify().damping(18)}
          style={{ alignItems: "center", gap: 8 }}
        >
          <Text className="font-display-medium text-[22px] text-text-primary">
            {phase === "idle"
              ? "準備沖煮"
              : phase === "complete"
                ? "沖煮完成！"
                : "正在為您沖煮..."}
          </Text>
          <Text className="font-body text-sm text-text-secondary">
            Espresso · 92°C
          </Text>
        </Animated.View>

        {/* Stage Stepper */}
        <Animated.View
          entering={FadeInUp.delay(350).springify().damping(18)}
          style={{ alignSelf: "center" }}
        >
          <StageStepper currentStage={currentStage} />
        </Animated.View>

        {/* Progress Section */}
        <Animated.View
          entering={FadeInUp.delay(450).springify().damping(18)}
          style={{ alignItems: "center", gap: 12 }}
        >
          <ProgressBar progress={progress} />
          <Text className="font-display-light text-[28px] text-gold">
            {pct}%
          </Text>
          <Text className="font-body text-xs text-text-secondary">
            {phase === "idle"
              ? "按下開始沖煮"
              : phase === "complete"
                ? "享受您的咖啡吧"
                : `預計剩餘 ${remaining} 秒`}
          </Text>
        </Animated.View>

        {/* Action Button */}
        <Animated.View
          entering={FadeInUp.delay(550).springify().damping(18)}
          style={{ alignSelf: "center" }}
        >
          {phase === "idle" && (
            <Pressable
              onPress={startBrew}
              className="h-12 w-[200px] overflow-hidden rounded-pill"
            >
              <LinearGradient
                colors={["#C9A962", "#8B7845"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="flex-1 flex-row items-center justify-center gap-2"
              >
                <Coffee size={16} color="#1A1A1C" strokeWidth={2} />
                <Text className="font-body-semibold text-sm text-bg-primary">
                  開始沖煮
                </Text>
              </LinearGradient>
            </Pressable>
          )}
          {phase === "brewing" && (
            <Pressable
              onPress={handleCancelPress}
              className="h-12 w-[200px] items-center justify-center rounded-pill border border-border"
            >
              <Text className="font-body-medium text-sm text-text-secondary">
                取消沖煮
              </Text>
            </Pressable>
          )}
          {phase === "complete" && (
            <Animated.View style={completeOverlayStyle}>
              <Pressable
                onPress={() => router.back()}
                className="h-12 w-[200px] overflow-hidden rounded-pill"
              >
                <LinearGradient
                  colors={["#C9A962", "#8B7845"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="flex-1 flex-row items-center justify-center gap-2"
                >
                  <Check size={16} color="#1A1A1C" strokeWidth={2} />
                  <Text className="font-body-semibold text-sm text-bg-primary">
                    完成
                  </Text>
                </LinearGradient>
              </Pressable>
            </Animated.View>
          )}
        </Animated.View>
      </View>

      {/* Cancel Confirm Modal */}
      <Modal
        visible={showCancelModal}
        transparent
        animationType="fade"
        onRequestClose={handleCancelDismiss}
      >
        <Pressable
          className="flex-1 items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          onPress={handleCancelDismiss}
        >
          <Pressable
            className="w-[300px] rounded-card bg-bg-card border border-border p-6"
            onPress={() => {}}
          >
            <Text className="font-display-medium text-xl text-text-primary text-center">
              確定要取消沖煮嗎？
            </Text>
            <Text className="font-body text-sm text-text-secondary text-center mt-2">
              目前進度將不會保留
            </Text>
            <View className="mt-6 gap-3">
              {/* Confirm Cancel */}
              <Pressable
                onPress={handleCancelConfirm}
                className="h-12 items-center justify-center rounded-[14px] border border-error"
              >
                <Text className="font-body-semibold text-sm text-error">
                  確定取消
                </Text>
              </Pressable>
              {/* Continue Brewing */}
              <Pressable
                onPress={handleCancelDismiss}
                className="h-12 overflow-hidden rounded-[14px]"
              >
                <LinearGradient
                  colors={["#C9A962", "#8B7845"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="flex-1 items-center justify-center"
                >
                  <Text className="font-body-semibold text-sm text-bg-primary">
                    繼續沖煮
                  </Text>
                </LinearGradient>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

/* ── Stage Stepper ─────────────────────────────────────── */

function StageStepper({ currentStage }: { currentStage: number }) {
  return (
    <View className="flex-row items-center">
      {STAGES.map((label, i) => {
        const isActive = i === currentStage;
        const isDone = i < currentStage;

        return (
          <View key={label} className="flex-row items-center">
            {i > 0 && (
              <View
                className="w-10 items-center justify-center"
                style={{ height: 34 }}
              >
                <View
                  className="h-[2px] w-full"
                  style={{
                    backgroundColor: isDone ? "#C9A962" : "#3A3A3C",
                  }}
                />
              </View>
            )}
            <View className="items-center" style={{ width: 22 }}>
              {isActive ? (
                <ActiveDot />
              ) : isDone ? (
                <View
                  className="items-center justify-center rounded-full"
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor: "#C9A962",
                    marginVertical: 11,
                  }}
                />
              ) : (
                <View
                  className="items-center justify-center rounded-full"
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor: "#3A3A3C",
                    marginVertical: 11,
                  }}
                />
              )}
              <Text
                className="mt-1.5"
                style={{
                  fontSize: 11,
                  fontFamily: isActive
                    ? "Inter_600SemiBold"
                    : "Inter_500Medium",
                  color: isActive
                    ? "#C9A962"
                    : isDone
                      ? "#F5F5F0"
                      : "#4A4A4C",
                }}
              >
                {label}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

/* ── Active Stage Dot with pulse ───────────────────────── */

function ActiveDot() {
  const pulseScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(0.6);

  useEffect(() => {
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.8, { duration: 1200, easing: Easing.out(Easing.ease) }),
        withTiming(1, { duration: 0 }),
      ),
      -1,
    );
    pulseOpacity.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 1200, easing: Easing.out(Easing.ease) }),
        withTiming(0.6, { duration: 0 }),
      ),
      -1,
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: pulseOpacity.value,
  }));

  return (
    <View
      className="items-center justify-center"
      style={{ width: 22, height: 34 }}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            width: 18,
            height: 18,
            borderRadius: 9,
            borderWidth: 2,
            borderColor: "#C9A962",
          },
          pulseStyle,
        ]}
      />
      <View
        style={{
          width: 18,
          height: 18,
          borderRadius: 9,
          borderWidth: 2,
          borderColor: "#C9A962",
        }}
      />
    </View>
  );
}

/* ── Progress Bar ──────────────────────────────────────── */

function ProgressBar({ progress }: { progress: number }) {
  const animatedWidth = useSharedValue(0);

  useEffect(() => {
    animatedWidth.value = withTiming(progress, {
      duration: 800,
      easing: Easing.out(Easing.ease),
    });
  }, [progress]);

  const barStyle = useAnimatedStyle(() => ({
    width: `${animatedWidth.value * 100}%`,
  }));

  return (
    <View
      className="w-full overflow-hidden"
      style={{ height: 6, borderRadius: 3, backgroundColor: "#2A2A2C" }}
    >
      <Animated.View style={[{ height: 6, borderRadius: 3 }, barStyle]}>
        <LinearGradient
          colors={["#C9A962", "#8B7845"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1, borderRadius: 3 }}
        />
      </Animated.View>
    </View>
  );
}

/* ── Cup Illustration ──────────────────────────────────── */

function CupIllustration({ showSteam = true }: { showSteam?: boolean }) {
  const steam1Opacity = useSharedValue(0);
  const steam2Opacity = useSharedValue(0);
  const steam1Y = useSharedValue(0);
  const steam2Y = useSharedValue(0);

  useEffect(() => {
    if (!showSteam) {
      steam1Opacity.value = withTiming(0, { duration: 300 });
      steam2Opacity.value = withTiming(0, { duration: 300 });
      return;
    }
    steam1Opacity.value = withRepeat(
      withSequence(
        withTiming(0.3, {
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(0.08, {
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
        }),
      ),
      -1,
      true,
    );
    steam1Y.value = withRepeat(
      withSequence(
        withTiming(-6, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
    steam2Opacity.value = withDelay(
      700,
      withRepeat(
        withSequence(
          withTiming(0.2, {
            duration: 2500,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(0.05, {
            duration: 2500,
            easing: Easing.inOut(Easing.ease),
          }),
        ),
        -1,
        true,
      ),
    );
    steam2Y.value = withDelay(
      700,
      withRepeat(
        withSequence(
          withTiming(-7, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        true,
      ),
    );
  }, [showSteam]);

  const steam1Style = useAnimatedStyle(() => ({
    opacity: steam1Opacity.value,
    transform: [{ translateY: steam1Y.value }, { rotate: "3deg" }],
  }));

  const steam2Style = useAnimatedStyle(() => ({
    opacity: steam2Opacity.value,
    transform: [{ translateY: steam2Y.value }, { rotate: "-3deg" }],
  }));

  return (
    <View style={{ width: 200, height: 200 }}>
      <View
        style={{
          position: "absolute",
          width: 200,
          height: 200,
          borderRadius: 100,
          backgroundColor: "#C9A962",
          opacity: 0.06,
        }}
      />
      <Animated.View
        style={[
          {
            position: "absolute",
            width: 2,
            height: 28,
            backgroundColor: "#6E6E70",
            borderRadius: 1,
            top: 20,
            left: 82,
          },
          steam1Style,
        ]}
      />
      <Animated.View
        style={[
          {
            position: "absolute",
            width: 2,
            height: 32,
            backgroundColor: "#6E6E70",
            borderRadius: 1,
            top: 16,
            left: 104,
          },
          steam2Style,
        ]}
      />
      <View
        style={{
          position: "absolute",
          width: 108,
          height: 10,
          borderRadius: 5,
          backgroundColor: "#242426",
          borderWidth: 1.5,
          borderColor: "#3A3A3C",
          top: 54,
          left: 46,
        }}
      />
      <View
        style={{
          position: "absolute",
          width: 90,
          height: 110,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          overflow: "hidden",
          top: 60,
          left: 55,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#5D4037",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        >
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "40%",
              backgroundColor: "#8B6914",
              opacity: 0.5,
            }}
          />
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          width: 24,
          height: 50,
          borderRightWidth: 3,
          borderTopWidth: 3,
          borderBottomWidth: 3,
          borderColor: "#3A3A3C",
          borderTopRightRadius: 14,
          borderBottomRightRadius: 14,
          top: 80,
          left: 145,
        }}
      />
    </View>
  );
}
