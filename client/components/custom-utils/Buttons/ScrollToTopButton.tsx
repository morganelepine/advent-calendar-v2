import {
    StyleSheet,
    TextStyle,
    Pressable,
    Text,
    ScrollView,
    View,
} from "react-native";
import { forwardRef } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

interface ScrollToTopButtonProps {
    children?: React.ReactNode;
    style?: TextStyle;
}

export const ScrollToTopButton = forwardRef<ScrollView, ScrollToTopButtonProps>(
    ({ children, style = {} }, ref) => {
        const scrollToTop = () => {
            if (ref && "current" in ref && ref.current) {
                ref.current.scrollTo({ y: 0, animated: true });
            }
        };

        return (
            <Pressable
                onPress={scrollToTop}
                style={{ ...styles.button, ...style }}
            >
                <View style={styles.buttonBackground} />
                <Text style={styles.buttonText}>
                    {children}
                    <Ionicons
                        name={"chevron-up-outline"}
                        size={25}
                        color={"#22311d"}
                    />
                </Text>
            </Pressable>
        );
    }
);

const styles = StyleSheet.create({
    button: {
        padding: 8,
        alignSelf: "center",
        position: "absolute",
        bottom: 10,
        right: 10,
    },
    buttonBackground: {
        ...StyleSheet.absoluteFillObject, // Remplit tout l'espace du parent
        backgroundColor: "white",
        opacity: 0.5,
        borderRadius: 50,
    },
    buttonText: {
        textAlign: "center",
        fontSize: 20,
    },
});
