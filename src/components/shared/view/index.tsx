import { View as NativeView, StyleSheet } from "react-native";
import type { ViewProps as NativeViewProps } from "react-native";

interface ViewProps extends NativeViewProps {
  direction?: "row" | "column";
  center?: boolean;
}

export default function View({ direction = "column", center = false, style, children, ...rest }: ViewProps) {
  const combinedStyles = [
    styles.container,
    { flexDirection: direction },
    center ? styles.centered : {},
    style,
  ];
  
  return (
    <NativeView
      style={combinedStyles}
      {...rest}
    >
      {children}
    </NativeView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
  },  
});
