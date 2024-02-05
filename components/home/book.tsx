import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";

interface BookItemProps {
  percentageRead: number
  title: string
  coverUrl: string
}

export default function BookItem({ title, coverUrl, percentageRead }: BookItemProps) {
  return (
    <View style={styles.container}>
      <Image
        source={coverUrl}
        style={styles.cover}
      />

      <Text style={styles.title}>
        {title}
      </Text>

      <View style={{ backgroundColor: "transparent", gap: 4, alignItems: "flex-end" }}>
        <View style={styles.progressBackground}>
          <View style={{ ...styles.progress, width: `${percentageRead}%` }} />
        </View>

        <Text style={styles.progressLabel}>
          {percentageRead}% read
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 171,
    height: 311,
    // aspectRatio: 171 / 261,
    borderRadius: 7,

    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 18,
    shadowColor: "#1E1E1E",
    shadowOpacity: 0.15,
    backgroundColor: "transparent",
  },
  cover: {
    flex: 1,
    width: 171,
    height: 311,
    // aspectRatio: 171 / 261,
    borderRadius: 7,
    marginBottom: 6,
  },
  title: {
    fontSize: 14,
    fontFamily: "Bitter_700Bold",
    color: "#1E1E1E",
    marginBottom: 5,
  },
  progressBackground: {
    position: "relative",
    width: "100%",
    height: 6,
    backgroundColor: "#FFD7C1",
    borderRadius: 2,
  },
  progress: {
    position: "absolute",
    bottom: 0,
    height: 6,
    backgroundColor: "#FF9D42",
    borderRadius: 2,
  },
  progressLabel: {
    fontSize: 12,
    fontFamily: "Bitter_700Bold",
    color: "#1E1E1E",
    opacity: 0.5,
  },
});