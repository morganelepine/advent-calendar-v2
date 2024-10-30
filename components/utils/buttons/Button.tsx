import { StyleSheet, TextStyle, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

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
        backgroundColor: Colors.red,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
    },
});
