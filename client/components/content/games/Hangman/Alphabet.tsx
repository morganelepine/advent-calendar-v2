import { StyleSheet, View, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";

interface AlphabetProps {
    onPress: Function;
}

export const Alphabet: React.FC<AlphabetProps> = ({ onPress }) => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase().split("");

    return (
        <View style={styles.alphabet}>
            {alphabet.map((letter, index) => (
                <Pressable>
                    <ThemedText key={index} style={styles.letter}>
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
        marginTop: 30,
    },
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
