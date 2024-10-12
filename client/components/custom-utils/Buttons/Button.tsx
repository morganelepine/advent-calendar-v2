import { StyleSheet, TextStyle, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";

interface CustomButtonProps {
    children?: React.ReactNode;
    style?: TextStyle;
    onPress: () => void;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
    children,
    style = {},
    onPress,
}) => {
    return (
        <Pressable onPress={onPress} style={{ ...styles.button, ...style }}>
            <ThemedText style={styles.buttonText}>{children}</ThemedText>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 50,
        backgroundColor: "#22311d",
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 20,
    },
    buttonText: {
        color: "white",
    },
});
