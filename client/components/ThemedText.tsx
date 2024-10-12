import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
    lightColor?: string;
    darkColor?: string;
    type?:
        | "default"
        | "calendarDay"
        | "homeTitle"
        | "subtitle"
        | "link"
        | "modalTitle"
        | "headerTab";
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
                type === "homeTitle" ? styles.homeTitle : undefined,
                type === "subtitle" ? styles.subtitle : undefined,
                type === "link" ? styles.link : undefined,
                type === "modalTitle" ? styles.modalTitle : undefined,
                type === "headerTab" ? styles.headerTab : undefined,

                style,
            ]}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    default: {
        fontSize: 16,
        fontFamily: "Poppins",
        textAlign: "center",
        color: "#22311d",
    },
    calendarDay: {
        fontSize: 40,
        fontFamily: "SpecialElite",
        textAlign: "center",
        color: "white",
    },
    homeTitle: {
        fontSize: 50,
        fontFamily: "SpecialElite",
        textAlign: "center",
        color: "white",
    },
    subtitle: {
        fontSize: 22,
        fontFamily: "AnonymousProBold",
        textAlign: "center",
    },
    link: {
        fontSize: 20,
        fontFamily: "AnonymousPro",
        color: "white",
    },
    modalTitle: {
        color: "#22311d",
        fontSize: 32,
        fontFamily: "AnonymousProBold",
        textAlign: "center",
        marginVertical: 20,
    },
    headerTab: {
        fontSize: 15,
        fontFamily: "AnonymousPro",
    },
});
