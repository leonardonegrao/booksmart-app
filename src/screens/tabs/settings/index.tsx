import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import { ChevronRight } from "@/src/components/icons";
import { useAuth } from "@/src/context/AuthContext";
import api from "@/src/services/api";

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
  const { onLogout } = useAuth();

  const handleLogout = async () => {
    try {
      await onLogout!();
    } catch (e) {
      alert("There was an issue logging out, please try again.");
    }
  };

  const handleClearLibrary = async () => {
    try {
      await api.clearLibrary();
    } catch (error) {
      alert("There was an issue clearing the library, please try again.");
    }

    alert("Library cleared");
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>
          Account
        </Text>

        <View style={styles.profile}>
          <View>
            <View style={styles.profilePicture}>
              <Text style={styles.profilePictureText}>JD</Text>
            </View>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileInfoName}>John S. Doe</Text>
            <View>
              <Text style={styles.profileInfoHandle}>@johndoe</Text>
              <Text style={styles.profileInfoMail}>john.doe@gmail.com</Text>
            </View>

            <View style={styles.profileInfoLink}>
              <Link href="/" style={{ color: "#FF9D42", fontSize: 12, fontFamily: "sans-medium" }}>
                Change account information
              </Link>
              <ChevronRight color="#FF9D42" />
            </View>
          </View>
        </View>
      </View>

      {settingsList.map(settingsItem => (
          <View key={settingsItem.id} style={styles.section}>
            <Text style={styles.title}>
              {settingsItem.label}
            </Text>

            <View style={styles.settingsItemContainer}>
              {settingsItem.items.map(item => (
                <View
                  key={item.id}
                  style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center" }}
                >
                  <View>
                    <Text style={styles.settingsItemTitle}>{item.label}</Text>
                    <Text style={styles.settingsItemSubtitle}>{item.subtitle}</Text>
                  </View>
                  <View>
                    <ChevronRight color="#FF9D42" />
                  </View>
                </View>
              ))}
            </View>
          </View>
      ))}

      <View style={{ ...styles.settingsItemContainer, width: "100%" }}>
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
      </View>

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
  section: {
    width: "100%",
    gap: 14,
  },
  title: {
    fontSize: 17,
    fontFamily: "serif-bold",
    color: "#1E1E1E",
  },
  profile: {
    flexDirection: "row",
    width: "100%",
    borderRadius: 15,
    backgroundColor: "#FFF",
    padding: 12,
    alignItems: "center",
    gap: 8,
    borderColor: "#93939359",
    borderWidth: 1,
    marginBottom: 24,
  },
  profilePicture: {
    width: 78,
    height: 78,
    borderRadius: 16,
    backgroundColor: "#FF9D42",
    alignItems: "center",
    justifyContent: "center",
  },
  profilePictureText: {
    fontSize: 32,
    fontFamily: "sans-semibold",
    color: "#FFD7C1",
  },
  profileInfo: {
    gap: 8,
    flex: 1,
  },
  profileInfoName: {
    fontSize: 14,
    fontFamily: "sans-semibold",
    color: "#1E1E1E",
    opacity: 0.7,
  },
  profileInfoHandle: {
    fontSize: 12,
    fontFamily: "sans-regular",
    color: "#1E1E1E",
    opacity: 0.5,
  },
  profileInfoMail: {
    fontSize: 12,
    fontFamily: "sans-regular",
    color: "#1E1E1E",
    opacity: 0.5,
  },
  profileInfoLink: {
    flexDirection: "row",
    fontSize: 12,
    fontFamily: "sans-medium",
    color: "#FF9D42",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  settingsItemContainer: {
    borderRadius: 15,
    backgroundColor: "#FFF",
    padding: 12,
    gap: 16,
    borderColor: "#93939359",
    borderWidth: 1,
    marginBottom: 24,
  },
  settingsItemTitle: {
    fontSize: 14,
    fontFamily: "sans-medium",
    color: "#1E1E1E",
    opacity: 0.8,
    marginBottom: 4,
  },
  settingsItemSubtitle: {
    fontSize: 12,
    fontFamily: "sans-regular",
    color: "#1E1E1E",
    opacity: 0.6,
  },
});
