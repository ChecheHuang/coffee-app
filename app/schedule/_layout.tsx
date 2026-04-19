import { Stack } from "expo-router";

export default function ScheduleLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="new"
        options={{ headerShown: false, presentation: "modal" }}
      />
      <Stack.Screen
        name="edit"
        options={{ headerShown: false, presentation: "modal" }}
      />
    </Stack>
  );
}
