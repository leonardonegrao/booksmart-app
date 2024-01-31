import { StyleSheet, Text, TouchableOpacity } from "react-native"

export default function Button({ label }: { label: string }) {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={{ fontSize: 12, fontFamily: 'Bitter_700Bold', color: '#FFE4CB' }}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#FD7900',
    borderRadius: 7,
  },
})