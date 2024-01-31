import { StyleSheet, TextInput } from "react-native"

export default function Input({ placeholder }: { placeholder: string }) {
  return (
    <TextInput
      placeholder={placeholder}
      style={styles.input}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#F2F2F2',
    padding: 15,
    borderRadius: 7,
    width: '100%',
  }
})