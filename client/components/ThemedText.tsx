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
        | "sectionSubtitle"
        | "sectionText"
        | "link"
        | "modalTitle"
        | "modalSubtitle";
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
                type === "sectionSubtitle" ? styles.sectionSubtitle : undefined,
                type === "sectionText" ? styles.sectionText : undefined,
                type === "link" ? styles.link : undefined,
                type === "modalTitle" ? styles.modalTitle : undefined,
                type === "modalSubtitle" ? styles.modalSubtitle : undefined,

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
        fontSize: 55,
        fontFamily: "PallyBold",
        textAlign: "center",
        color: "white",
    },
    subtitle: {
        fontSize: 16,
        fontFamily: "Poppins",
        textAlign: "center",
        letterSpacing: 1,
    },
    sectionSubtitle: {
        fontFamily: "PallyBold",
        letterSpacing: 1,
        color: "#165d4b",
        textAlign: "left",
        fontSize: 18,
    },
    sectionText: {
        fontSize: 16,
        fontFamily: "Poppins",
        textAlign: "left",
        color: "#22311d",
    },
    link: {
        fontSize: 20,
        fontFamily: "Pally",
        color: "white",
    },
    modalTitle: {
        color: "#165d4b",
        fontSize: 32,
        fontFamily: "PallyBold",
        textAlign: "center",
        letterSpacing: 3,
        marginVertical: 20,
    },
    modalSubtitle: {
        color: "#22311d",
        fontSize: 22,
        fontFamily: "PallyBold",
        textAlign: "left",
        letterSpacing: 1,
    },
});
