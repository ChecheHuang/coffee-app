import { View, Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

const KNOB_SIZE = 24;
const TRACK_H = 4;

interface SliderProps {
  label: string;
  value: string;
  progress: number;
  disabled?: boolean;
  onProgressChange?: (progress: number) => void;
}

export function Slider({
  label,
  value,
  progress: initialProgress,
  disabled = false,
  onProgressChange,
}: SliderProps) {
  const progress = useSharedValue(initialProgress);
  const startProgress = useSharedValue(0);
  const trackWidth = useSharedValue(0);
  const isActive = useSharedValue(false);

  const clamp = (v: number) => {
    "worklet";
    return Math.max(0, Math.min(1, v));
  };

  const tapGesture = Gesture.Tap()
    .enabled(!disabled)
    .onEnd((e) => {
      if (trackWidth.value <= 0) return;
      const p = clamp(e.x / trackWidth.value);
      progress.value = withSpring(p, { damping: 20, stiffness: 300 });
      if (onProgressChange) runOnJS(onProgressChange)(p);
    });

  const panGesture = Gesture.Pan()
    .enabled(!disabled)
    .hitSlop({ top: 10, bottom: 10 })
    .onStart(() => {
      startProgress.value = progress.value;
      isActive.value = true;
    })
    .onUpdate((e) => {
      if (trackWidth.value <= 0) return;
      progress.value = clamp(
        startProgress.value + e.translationX / trackWidth.value,
      );
    })
    .onEnd(() => {
      isActive.value = false;
      if (onProgressChange) runOnJS(onProgressChange)(progress.value);
    });

  const gesture = Gesture.Exclusive(panGesture, tapGesture);

  const fillStyle = useAnimatedStyle(() => ({
    width: progress.value * trackWidth.value,
  }));

  const knobStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: progress.value * trackWidth.value - KNOB_SIZE / 2 },
      { scale: withSpring(isActive.value ? 1.15 : 1, { damping: 15 }) },
    ],
  }));

  return (
    <View style={disabled ? { opacity: 0.4 } : undefined} className="gap-2.5">
      {/* Label Row */}
      <View className="flex-row items-center justify-between">
        <Text
          className={`font-body-medium text-sm ${disabled ? "text-text-tertiary" : "text-text-primary"}`}
        >
          {label}
        </Text>
        <Text
          className={`font-display-medium text-xl ${disabled ? "text-text-tertiary" : "text-gold"}`}
        >
          {value}
        </Text>
      </View>

      {/* Track Area */}
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={{ height: KNOB_SIZE }}
          onLayout={(e) => {
            trackWidth.value = e.nativeEvent.layout.width;
          }}
        >
          {/* Background Track */}
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: (KNOB_SIZE - TRACK_H) / 2,
              height: TRACK_H,
              borderRadius: 2,
              backgroundColor: "#2A2A2C",
            }}
          />

          {/* Fill Track */}
          {!disabled && (
            <Animated.View
              style={[
                {
                  position: "absolute",
                  top: (KNOB_SIZE - TRACK_H) / 2,
                  height: TRACK_H,
                  borderRadius: 2,
                  overflow: "hidden",
                },
                fillStyle,
              ]}
            >
              <LinearGradient
                colors={["#C9A962", "#8B7845"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1 }}
              />
            </Animated.View>
          )}

          {/* Knob */}
          {!disabled && (
            <Animated.View
              style={[
                {
                  position: "absolute",
                  top: 0,
                  width: KNOB_SIZE,
                  height: KNOB_SIZE,
                  borderRadius: KNOB_SIZE / 2,
                  backgroundColor: "#C9A962",
                  borderWidth: 2,
                  borderColor: "#1A1A1C",
                },
                knobStyle,
              ]}
            />
          )}
        </Animated.View>
      </GestureDetector>
    </View>
  );
}
