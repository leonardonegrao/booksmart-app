import { useAuth } from "@/context/AuthContext";
import { Redirect, Stack } from "expo-router";
import { Text } from "react-native";

export default function AppLayout() {
  const { authState, onLogout } = useAuth();
  const isLoading = authState?.authenticated === null;

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  if (!authState?.authenticated && !isLoading) {
    return <Redirect href='/login' />
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
  );
}