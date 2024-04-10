import { router } from "expo-router";
import type { Href } from "expo-router";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";
import type { GestureResponderEvent } from "react-native";

interface ButtonProps {
  label: string;
  // eslint-disable-next-line no-unused-vars
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  state?: "default" | "loading" | "disabled";
  href?: Href<string>;
}

export default function Button({ label, onPress, state = "default", href }: ButtonProps) {

  const onPressHandler = (e: GestureResponderEvent) => {
    if (href) {
      router.push(href);
    }

    if (onPress) {
      onPress(e);
    }
  };

  return (
    <TouchableOpacity
      style={state !== "default" ? { ...styles.button, ...styles.disabled } : styles.button}
      onPress={onPressHandler}
    >
      {state === "loading" ? (
        <ActivityIndicator color="#939393" />
      ) : (
        <Text
          style={state !== "default" ? { ...styles.label, ...styles.labelDisabled } : styles.label}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: "#FD7900",
    borderRadius: 7,
  },
  disabled: {
    backgroundColor: "#F2F2F2",
  },
  label: {
    fontSize: 14,
    fontFamily: "sans-medium",
    color: "#FFE4CB",
  },
  labelDisabled: {
    color: "#939393",
  },
});
