import { StyleSheet, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";

interface LetterProps {
    letter: string;
}

export const Letter: React.FC<LetterProps> = ({ letter }) => {
    return <ThemedText style={styles.letter}>{letter}</ThemedText>;
};

const styles = StyleSheet.create({
    letter: {
        // color: "#22311d",
        fontFamily: "AnonymousProBold",
        fontSize: 32,
        paddingHorizontal: 15,
        paddingVertical: 10,
        margin: 5,
        backgroundColor: "#22311d",
        borderRadius: 10,
        alignItems: "center",
    },
});
