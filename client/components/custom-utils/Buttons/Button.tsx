import { StyleSheet, TextStyle, Pressable, Text } from "react-native";

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
            <Text style={styles.buttonText}>{children}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        backgroundColor: "#22311d",
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 20,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontSize: 20,
        fontFamily: "AnonymousPro",
    },
});
