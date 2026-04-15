import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from "react-native-reanimated";

type PressType = "scale" | "opacity";

interface UseAnimatedPressOptions {
  type: PressType;
  disabled?: boolean;
}

export function useAnimatedPress({ type, disabled }: UseAnimatedPressOptions) {
  const value = useSharedValue(type === "scale" ? 1 : 1);

  const animatedStyle = useAnimatedStyle(() => {
    if (type === "scale") {
      return { transform: [{ scale: value.value }] };
    }
    return { opacity: value.value };
  });

  const pressHandlers = disabled
    ? {}
    : {
        onPressIn: () => {
          value.value = withTiming(type === "scale" ? 0.97 : 0.7, {
            duration: 100,
          });
        },
        onPressOut: () => {
          if (type === "scale") {
            value.value = withSpring(1, { damping: 15, stiffness: 150 });
          } else {
            value.value = withTiming(1, { duration: 150 });
          }
        },
      };

  return { animatedStyle, pressHandlers };
}
