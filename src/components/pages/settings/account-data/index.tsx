import View from "@/src/components/shared/view";
import Text from "@/src/components/ui/text";
import { UserData } from "@/src/context/AuthContext";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";

interface AccountDataProps {
  user: UserData;
}

const getInitials = (fullName: string): string => {
  const words = fullName.trim().split(/\s+/);

  const initials = words.slice(0, 2).map(word => word[0].toUpperCase()).join("");

  return initials;
};

export default function AccountData({ user }: AccountDataProps) {
  return (
    <View direction="row" style={styles.container}>
      <View>
        <View style={styles.picture}>
          <Text fontType="sansSemibold" style={{ fontSize: 32, color: "#FFD7C1" }}>
            {getInitials(user.fullname)}
          </Text>
        </View>
      </View>

      <View style={{ gap: 12 }}>
        <View>
          <Text fontType="sansSemibold" style={{ fontSize: 14, color: "#1E1E1E", opacity: 0.7 }}>
            {user.fullname}
          </Text>
          <View>
            <Text fontType="sansRegular" style={{ fontSize: 12, color: "#1E1E1E", opacity: 0.5 }}>
              @{user.username}
            </Text>
          </View>
        </View>

        <View direction="row" style={styles.link}>
          <Link href="/" style={{ fontSize: 12, fontFamily: "sans-medium", color: "#FF9D42" }}>
            Change account information
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    gap: 8,
  },
  picture: {
    width: 78,
    height: 78,
    borderRadius: 16,
    backgroundColor: "#FF9D42",
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    width: "100%",
    fontSize: 12,
    fontFamily: "sans-medium",
    color: "#FF9D42",
  },
});
