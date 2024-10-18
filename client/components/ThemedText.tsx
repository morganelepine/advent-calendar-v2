import { Text, type TextProps, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
    lightColor?: string;
    darkColor?: string;
    type?:
        | "default"
        | "homeTitle"
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
                type === "homeTitle" ? styles.homeTitle : undefined,
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
        color: Colors.darkGreen,
    },
    homeTitle: {
        fontSize: 55,
        fontFamily: "PallyBold",
        textAlign: "center",
        color: "white",
    },
    sectionSubtitle: {
        fontFamily: "PallyBold",
        letterSpacing: 1,
        color: Colors.green,
        textAlign: "left",
        fontSize: 18,
    },
    sectionText: {
        fontSize: 16,
        fontFamily: "Poppins",
        textAlign: "left",
        color: Colors.darkGreen,
    },
    link: {
        fontSize: 20,
        fontFamily: "Pally",
        color: "white",
    },
    modalTitle: {
        color: Colors.green,
        fontSize: 32,
        fontFamily: "PallyBold",
        textAlign: "center",
        letterSpacing: 3,
        marginVertical: 20,
    },
    modalSubtitle: {
        color: Colors.darkGreen,
        fontSize: 22,
        fontFamily: "PallyBold",
        textAlign: "center",
        letterSpacing: 1,
    },
});
