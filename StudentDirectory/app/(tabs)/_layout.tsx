import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Directory",
          tabBarIcon: ({ color, size }) => <Ionicons name="people" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="add-student"
        options={{
          title: "Add Student",
          href: null, // Hides from tab bar
          headerShown: true,
          headerTitle: "Join the Directory",
          headerStyle: { backgroundColor: "#0D1F4E" },
          headerTintColor: "#FFFFFF",
        }}
      />
    </Tabs>
  );
}