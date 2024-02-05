import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Redirect, Slot, router } from "expo-router";
import { Pressable } from "react-native";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { BookmarkIcon, LibraryIcon, SettingsIcon, UploadBookIcon } from "@/components/icons";
import { useAuth } from "@/context/AuthContext";

type Tab = "library" | "upload" | "history" | "settings"

const tabList = [
  { id: "library", label: "Library", href: "/", icon: LibraryIcon },
  { id: "upload", label: "Upload", href: "/upload", icon: UploadBookIcon },
  { id: "history", label: "History", href: "/history", icon: BookmarkIcon },
  { id: "settings", label: "Settings", href: "/settings", icon: SettingsIcon },
];

function TabItem({ children, label, isActive }: { children: React.ReactNode; label: string; isActive: boolean; }) {
  return (
    <View style={styles.tab}>
      {children}
      <Text
        style={{
          ...styles.tabLabel,
          color: isActive ? "#FF9D42" : "#939393",
          fontFamily: isActive ? "sans-semibold" : "sans-regular",
        }}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  const [activeTab, setActiveTab] = useState<Tab>("library");
  const { authState } = useAuth();
  const isLoading = authState?.authenticated === null;

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!authState?.authenticated && !isLoading) {
    return <Redirect href="/login" />;
  }

  const handleTabPress = (tab: Tab) => {
    setActiveTab(tab);
    
    if (tab === "library")
      router.push("/(tabs)/");
    else if (tab === "settings")
      router.push("/(tabs)/settings");
    else
      router.push("/(tabs)/upload");
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.layout}>
        <Slot />
        <View style={styles.tabsContainer}>
          <View style={styles.tabs}>
            {tabList.map(({ id, label, icon }) => (
              <Pressable key={id} onPress={() => handleTabPress(id as Tab)} style={styles.tabContainer}>
                <TabItem label={label} isActive={activeTab === id}>
                    {icon({
                      color: activeTab === id ? "#FF9D42" : "#939393",
                      strokeWidth: activeTab === id ? 1.5 : 1.0,
                    })}
                </TabItem>
              </Pressable>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: "flex-end",
    height: "100%",
    backgroundColor: "#FAFAFA",
  },
  tabsContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flex: 1,
    gap: 16,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EFEFEF",
    paddingVertical: 4,
    height: 56,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#3F3F3F0A",
    shadowColor: "#1e1e1e",
    shadowRadius: 18,
    shadowOpacity: 0.15,
    shadowOffset: {
      height: 8,
      width: 0,
    },
  },
  tabContainer: {
    flex: 1,
    alignItems: "center",
  },
  tab: {
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  tabLabel: {
    fontSize: 12,
  },
});