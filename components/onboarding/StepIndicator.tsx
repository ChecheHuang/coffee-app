import { View } from "react-native";

export function StepIndicator({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <View className="flex-row items-center justify-center gap-2">
      {Array.from({ length: total }, (_, i) => {
        const isActive = i + 1 === current;
        return isActive ? (
          <View
            key={i}
            style={{
              width: 24,
              height: 8,
              borderRadius: 4,
              backgroundColor: "#C9A962",
            }}
          />
        ) : (
          <View
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: "#3A3A3C",
            }}
          />
        );
      })}
    </View>
  );
}
