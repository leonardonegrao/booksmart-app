import { MenuDotsVertical } from "@/components/icons";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

interface BookMenuProps {
  bookId: string;
}

export default function BookMenu({ bookId }: BookMenuProps) {
  return (
    <Link href={{ pathname: "/book/[id]", params: { id: bookId } }}>
        <View style={styles.menuOption}>
          <MenuDotsVertical fontSize={20} color="#1E1E1E" />
        </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  menuOption: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1F1F1",
    borderRadius: 50,
    padding: 6,
    opacity: 0.5,
  },
});
