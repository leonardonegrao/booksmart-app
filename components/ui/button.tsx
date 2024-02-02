import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native"
import type { GestureResponderEvent } from "react-native"

interface ButtonProps {
  label: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  state?: 'default' | 'loading' | 'disabled';
}

export default function Button({ label, onPress, state = 'default' }: ButtonProps) {
  return (
    <TouchableOpacity
      style={state !== 'default' ? { ...styles.button, ...styles.disabled } : styles.button}
      onPress={onPress}
    >
      {state === 'loading' ? (
        <ActivityIndicator color="#939393" />
      ) : (
        <Text
          style={state !== 'default' ? { ...styles.label, ...styles.labelDisabled } : styles.label}
        >
          {label}
        </Text>
      )}
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
  disabled: {
    backgroundColor: '#F2F2F2',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#FFE4CB'
  },
  labelDisabled: {
    color: '#939393',
  },
})