import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { UserData, useAuth } from "@/src/context/AuthContext";
import { useStorage } from "@/src/context/StorageContext";
import AccountData from "@/src/components/pages/settings/account-data";
import SettingsBlock from "@/src/components/pages/settings/settings-block";

const settingsList = [
  {
    id: "language",
    label: "Language",
    items: [
      {
        id: "app-lang",
        label: "Application language",
        subtitle: "English",
        href: "/settings/language/app-lang",
      },
      {
        id: "translation-lang",
        label: "Translate to",
        subtitle: "Portuguese",
        href: "/settings/language/translation-lang",
      },
    ],
  },
  {
    id: "ai-settings",
    label: "AI Settings",
    items: [
      {
        id: "ai-lang",
        label: "AI response language",
        subtitle: "English",
        href: "/settings/ai/lang",
      },
      {
        id: "gpt-key",
        label: "ChatGPT Key",
        subtitle: "********",
        href: "/settings/ai/gpt-key",
      },
    ],
  },
];

export default function SettingsScreen() {
  const { onLogout, authState } = useAuth();
  const storage = useStorage();

  const handleLogout = async () => {
    try {
      await onLogout!();
    } catch (e) {
      alert("There was an issue logging out, please try again.");
    }
  };

  const handleClearLibrary = async () => {
    try {
      console.log("clear library");
      //storage.actions.drop("book");
    } catch (error) {
      alert("There was an issue clearing the library, please try again.");
    }

    alert("Library cleared");
  };

  return (
    <View style={styles.container}>
      <SettingsBlock type="custom" title="Account">
        <AccountData
          user={authState!.userData as UserData}
        />
      </SettingsBlock>

      {settingsList.map(settingsItem => (
        <SettingsBlock
          key={settingsItem.id}
          title={settingsItem.label}
          items={settingsItem.items}
        />
      ))}

      <SettingsBlock type="custom">
        <TouchableOpacity onPress={handleClearLibrary}>
          <Text style={{ color: "#ED7979", fontSize: 14, fontFamily: "sans-medium", paddingVertical: 12 }}>
            Clear library
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ color: "#ED7979", fontSize: 14, fontFamily: "sans-medium", paddingVertical: 12 }}>
            Delete account
          </Text>
        </TouchableOpacity>
      </SettingsBlock>

      <View style={{ flexDirection: "row", width: "100%", justifyContent: "center" }}>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={{ color: "#ED7979", fontSize: 14, fontFamily: "sans-medium" }}>
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 16,
  },
});
