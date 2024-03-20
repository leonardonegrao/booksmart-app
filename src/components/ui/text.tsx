import { Text as RootText, StyleSheet } from "react-native";
import type { TextProps as RootTextProps } from "react-native";

type FontType = "sansRegular" | "sansMedium" | "sansSemibold" | "sansBold" | "serifRegular" | "serifMedium" | "serifSemibold" | "serifBold";

interface TextProps extends RootTextProps {
  fontType?: FontType;
}

export default function Text({ fontType = "sansRegular", style, ...rest }: TextProps) {
  const aggregatedStyle = [styles[fontType], style];

  return (
    <RootText
    style={aggregatedStyle}
    {...rest}
    />
  );
}

const styles: Record<FontType, any> = StyleSheet.create({
  sansRegular: {
    fontFamily: "sans-regular",
  },
  sansMedium: {
    fontFamily: "sans-medium",
  },
  sansSemibold: {
    fontFamily: "sans-semibold",
  },
  sansBold: {
    fontFamily: "sans-bold",
  },
  serifRegular: {
    fontFamily: "serif-regular",
  },
  serifMedium: {
    fontFamily: "serif-medium",
  },
  serifSemibold: {
    fontFamily: "serif-semibold",
  },
  serifBold: {
    fontFamily: "serif-bold",
  },
});