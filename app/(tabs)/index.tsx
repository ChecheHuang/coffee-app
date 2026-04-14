import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/** Screen 1: 首頁 (Home) */
export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>BrewMaster Pro</Text>
        <Text style={styles.subtitle}>
          首頁 — 一鍵沖煮、AI 推薦、機器狀態
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1A1A1C" },
  content: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 28 },
  title: { fontSize: 30, color: "#C9A962", fontFamily: "CormorantGaramond_500Medium" },
  subtitle: { fontSize: 14, color: "#6E6E70", fontFamily: "Inter_400Regular", marginTop: 8 },
});
