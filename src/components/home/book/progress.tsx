import { StyleSheet, View, Text } from "react-native";

interface BookProgressProps {
  percentageRead: number;
}

export default function BookProgress({ percentageRead }: BookProgressProps) {
  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <View style={{ ...styles.progressBar, width: `${percentageRead}%` }} />
      </View>

      <Text style={styles.label}>{percentageRead}% read</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    gap: 4,
    alignItems: "flex-end",
  },
  progressBarContainer: {
    position: "relative",
    width: "100%",
    height: 6,
    backgroundColor: "#FFD7C1",
    borderRadius: 2,
  },
  progressBar: {
    position: "absolute",
    bottom: 0,
    height: 6,
    backgroundColor: "#FFA177",
    borderRadius: 2,
  },
  label: {
    fontSize: 12,
    fontFamily: "serif-bold",
    color: "#1E1E1E",
    opacity: 0.5,
  },
});
