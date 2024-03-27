import { ChevronRight } from "@/src/components/icons";
import View from "@/src/components/shared/view";
import Text from "@/src/components/ui/text";
import { StyleSheet } from "react-native";

interface SettingsBlockProps {
  title?: string;
  type?: "default" | "custom";
  children?: React.ReactNode;
  items?: {
    id: string;
    label: string;
    subtitle: string;
    href: string;
  }[];
}

export default function SettingsBlock({ title, type = "default", children, items = [] }: SettingsBlockProps) {
  if (type === "custom" && children) {
    return (
      <View style={{ width: "100%", gap: 14 }}>
        {title && (
          <Text fontType="serifBold" style={{ fontSize: 17, color: "#1E1E1E" }}>
            {title}
          </Text>
        )}

        <View style={styles.itemContainer}>
          {children}
        </View>
      </View>
    );
  }
  
  return (
    <View style={{ width: "100%", gap: 14 }}>
      {title && (
        <Text fontType="serifBold" style={{ fontSize: 17, color: "#1E1E1E" }}>
          {title}
        </Text>
      )}

      <View style={styles.itemContainer}>
        {items.map(item => (
          <View key={item.id} direction="row" style={styles.item}>
            <View>
              <Text fontType="sansMedium" style={styles.itemLabel}>{item.label}</Text>
              <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
            </View>
            <View>
              <ChevronRight color="#FF9D42" fontSize={24} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 15,
    backgroundColor: "#FFF",
    padding: 12,
    gap: 16,
    borderColor: "#93939359",
    borderWidth: 1,
    marginBottom: 24,
    width: "100%",
  },
  item: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemLabel: {
    fontSize: 14,
    color: "#1E1E1E",
    opacity: 0.8,
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 12,
    color: "#1E1E1E",
    opacity: 0.6,
  },
});
