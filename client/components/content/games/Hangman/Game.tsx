import { StyleSheet, View, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useEffect, useState } from "react";
import { Letter } from "@/components/content/games/Hangman/Letter";

interface Content {
    id: number;
    type: "quote" | "recipe" | "anecdote" | "idea" | "game";
    title: string;
    content1: string;
    content2: string;
    content3: string;
    content4: string;
    content5: string;
}

interface GameProps {
    game: Content;
}

export const Game: React.FC<GameProps> = ({ game }) => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    const words = game.content1.toUpperCase().split(",");
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const currentWord = words[currentWordIndex];
    console.log({ currentWord });

    const maxTries = 7;
    const [mistakes, setMistakes] = useState(0);
    const [clickedLetters, setClickedLetters] = useState<string[]>([]);
    const [hiddenWord, setHiddenWord] = useState<string[]>([]);

    useEffect(() => {
        setHiddenWord(currentWord.split("").map(() => "_"));
        setClickedLetters([]);
        setMistakes(0);
    }, [currentWordIndex]);

    const checkLetter = (letter: string) => {
        if (clickedLetters.includes(letter)) {
            return;
        }

        setClickedLetters([...clickedLetters, letter]);

        if (currentWord.includes(letter)) {
            const updatedHiddenWord = currentWord
                .split("")
                .map((char, index) =>
                    char === letter ? char : hiddenWord[index]
                );
            setHiddenWord(updatedHiddenWord);
        } else {
            setMistakes(mistakes + 1);
        }
    };

    useEffect(() => {
        if (currentWord === hiddenWord.join("")) {
            if (currentWordIndex < words.length - 1) {
                setCurrentWordIndex(currentWordIndex + 1);
            } else {
                alert("Félicitations, vous avez trouvé les 4 mots !");
            }
        }
    }, [hiddenWord]);

    useEffect(() => {
        if (mistakes === maxTries) {
            if (currentWordIndex < words.length - 1) {
                alert(
                    `Dommage, vous avez atteint le nombre maximum d'essais :( Le mot à trouver était ${currentWord}.`
                );
                setCurrentWordIndex(currentWordIndex + 1);
            } else {
                alert(
                    `Dommage, vous avez atteint le nombre maximum d'essais :( Le mot à trouver était ${currentWord}.`
                );
            }
        }
    }, [mistakes]);

    const getLetterStyle = (letter: string) => {
        return clickedLetters.includes(letter)
            ? [styles.letter, styles.clickedLetter]
            : styles.letter;
    };

    return (
        <>
            <View style={styles.infos}>
                <ThemedText style={[styles.texts, styles.info]}>
                    Mot n°{currentWordIndex + 1}
                </ThemedText>

                <ThemedText style={[styles.texts, styles.info]}>
                    {mistakes} / {maxTries} erreurs
                </ThemedText>
            </View>

            <ThemedText style={[styles.texts, styles.hiddenWord]}>
                {hiddenWord.join(" ")}
            </ThemedText>

            <View style={styles.alphabet}>
                {alphabet.map((letter, index) => (
                    <Pressable key={index} onPress={() => checkLetter(letter)}>
                        <ThemedText style={getLetterStyle(letter)}>
                            {letter}
                        </ThemedText>
                    </Pressable>
                ))}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    texts: {
        color: "#22311d",
        textAlign: "center",
        fontFamily: "AnonymousPro",
    },
    infos: {
        marginTop: 5,
        marginBottom: 20,
    },
    info: {
        fontSize: 16,
    },
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
    },
    clickedLetter: {
        color: "#22311d",
        backgroundColor: "white",
        opacity: 0.4,
    },
    hiddenWord: { fontSize: 30, marginVertical: 20 },
});
