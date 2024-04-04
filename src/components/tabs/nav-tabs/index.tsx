import { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { router, usePathname } from "expo-router";

import { BookmarkIcon, LibraryIcon, SettingsIcon, UploadBookIcon } from "@/src/components/icons";
import View from "../../shared/view";
import TabItem from "./tab-item";

type Tab = "library" | "upload" | "history" | "settings"

const tabsList = [
  { id: "library", label: "Library", href: "/", icon: LibraryIcon },
  { id: "upload", label: "Upload", href: "/upload", icon: UploadBookIcon },
  { id: "history", label: "History", href: "/history", icon: BookmarkIcon },
  { id: "settings", label: "Settings", href: "/settings", icon: SettingsIcon },
];

export default function NavTabs() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<Tab>("library");

  useEffect(() => {
    const currentTab = tabsList.find((tab) => tab.href === pathname);
    setActiveTab(currentTab?.id as Tab);
  }, [pathname]);

  const handleTabPress = (tab: Tab) => {
    if (tab === "library")
      router.push("/(tabs)/");
    else if (tab === "settings")
      router.push("/(tabs)/settings");
    else
      router.push("/(tabs)/upload");
  };

  return (
  <View direction="row" style={styles.container}>
    <View direction="row" style={styles.tabs}>
      {tabsList.map(({ id, label, icon }) => (
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
 ); 
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flex: 1,
    gap: 16,
    paddingBottom: 24,
    backgroundColor: "#FAFAFA",
  },
  tabs: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
    height: 56,
    borderTopWidth: 1.5,
    borderColor: "#3F3F3F0A",
    width: "100%",
  },
  tabContainer: {
    flex: 1,
    alignItems: "center",
  },
});
