import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
    lightColor?: string;
    darkColor?: string;
    type?: "default" | "calendarDay" | "title" | "subtitle" | "link";
};

export function ThemedText({
    style,
    lightColor,
    darkColor,
    type = "default",
    ...rest
}: ThemedTextProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

    return (
        <Text
            style={[
                { color },
                type === "default" ? styles.default : undefined,
                type === "calendarDay" ? styles.calendarDay : undefined,
                type === "title" ? styles.title : undefined,
                type === "subtitle" ? styles.subtitle : undefined,
                type === "link" ? styles.link : undefined,
                style,
            ]}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    default: {
        fontSize: 20,
        fontFamily: "AnonymousPro",
        textAlign: "center",
    },
    calendarDay: {
        fontSize: 40,
        fontFamily: "SpecialElite",
        textAlign: "center",
    },
    title: {
        fontSize: 32,
        fontFamily: "AnonymousProBold",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 22,
        fontFamily: "AnonymousProBold",
        textAlign: "center",
    },
    link: {
        fontSize: 16,
        color: "#0a7ea4",
        fontFamily: "AnonymousPro",
    },
});
