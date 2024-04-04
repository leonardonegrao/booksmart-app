import { StyleSheet } from "react-native";
import View from "../../shared/view";
import Text from "../../ui/text";

export default function TabItem({ children, label, isActive }: { children: React.ReactNode; label: string; isActive: boolean; }) {
  return (
    <View style={styles.tab} center>
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

const styles = StyleSheet.create({
  tab: {
    gap: 4,
  },
  tabLabel: {
    fontSize: 12,
  },
});
