import { View } from "react-native";
import { Coffee, Wifi, User } from "lucide-react-native";

const ICONS = { coffee: Coffee, wifi: Wifi, user: User } as const;

export function GlowIcon({ icon }: { icon: keyof typeof ICONS }) {
  const Icon = ICONS[icon];
  return (
    <View
      style={{
        width: 140,
        height: 140,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          position: "absolute",
          width: 140,
          height: 140,
          borderRadius: 70,
          backgroundColor: "#C9A962",
          opacity: 0.15,
        }}
      />
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#C9A962",
        }}
      >
        <Icon size={44} color="#1A1A1C" strokeWidth={1.5} />
      </View>
    </View>
  );
}
