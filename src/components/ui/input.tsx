import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

interface InputProps extends TextInputProps {
  children?: React.ReactNode;
}

export default function Input({children, ...rest}: InputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholderTextColor="#939393"
        {...rest}
      />

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#F2F2F2",
    padding: 15,
    borderRadius: 7,
    width: "100%",
    height: 52,
  },
  input: {
    flex: 1,
    height: "100%",
  },
});
