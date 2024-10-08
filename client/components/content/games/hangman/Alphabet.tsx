import { StyleSheet, View, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";

interface AlphabetProps {
    clickedLetters: string[];
    checkLetter: (letter: string) => void;
}

export const Alphabet: React.FC<AlphabetProps> = ({
    clickedLetters,
    checkLetter,
}) => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    const getLetterStyle = (letter: string) => {
        return clickedLetters.includes(letter)
            ? [styles.letter, styles.clickedLetter]
            : styles.letter;
    };

    return (
        <View style={styles.alphabet}>
            {alphabet.map((letter) => (
                <Pressable key={letter} onPress={() => checkLetter(letter)}>
                    <ThemedText style={getLetterStyle(letter)}>
                        {letter}
                    </ThemedText>
                </Pressable>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    alphabet: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: 20,
    },
    letter: {
        fontFamily: "AnonymousProBold",
        fontSize: 28,
        paddingHorizontal: 16,
        paddingVertical: 8,
        margin: 5,
        backgroundColor: "#22311d",
        borderRadius: 50,
        alignItems: "center",
        color: "white",
    },
    clickedLetter: {
        color: "#22311d",
        backgroundColor: "white",
        opacity: 0.4,
    },
});
