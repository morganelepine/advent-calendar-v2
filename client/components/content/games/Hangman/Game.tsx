import { StyleSheet, View, Pressable, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useEffect, useState } from "react";
import { CustomModal } from "@/components/custom-utils/Modal";

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

    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const handleNextQuestion = () => {
        setCurrentWordIndex(currentWordIndex + 1);
        setModalVisible(false);
    };

    const onClose = () => {
        if (currentWordIndex === words.length - 1) {
            setCurrentWordIndex(0);
            setModalVisible(false);
        } else {
            setCurrentWordIndex(currentWordIndex + 1);
            setModalVisible(false);
        }
    };

    useEffect(() => {
        if (currentWord === hiddenWord.join("")) {
            setModalMessage("Félicitations 🥳");
            setModalVisible(true);
        }
    }, [hiddenWord]);

    useEffect(() => {
        if (mistakes === maxTries) {
            setModalMessage(
                "Dommage, vous avez atteint le nombre maximum d'essais 😟"
            );
            setModalVisible(true);
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
                    Mot n°{currentWordIndex + 1}/{words.length}
                </ThemedText>

                <ThemedText style={[styles.texts, styles.info]}>
                    {mistakes} / {maxTries} erreurs
                </ThemedText>
            </View>

            <ThemedText style={[styles.texts, styles.hiddenWord]}>
                {hiddenWord.join(" ")}
            </ThemedText>

            <View style={styles.alphabet}>
                {alphabet.map((letter) => (
                    <Pressable key={letter} onPress={() => checkLetter(letter)}>
                        <ThemedText style={getLetterStyle(letter)}>
                            {letter}
                        </ThemedText>
                    </Pressable>
                ))}
            </View>

            <CustomModal isVisible={modalVisible} onClose={() => onClose()}>
                <View style={styles.modal}>
                    <ThemedText style={styles.texts}>{modalMessage}</ThemedText>
                    <ThemedText style={styles.texts}>
                        Le mot à trouver était {currentWord}
                    </ThemedText>
                    {currentWordIndex < words.length - 1 ? (
                        <Pressable onPress={handleNextQuestion}>
                            <ThemedText style={[styles.modalButton]}>
                                Partie suivante
                            </ThemedText>
                        </Pressable>
                    ) : (
                        <ThemedText
                            style={[styles.texts, styles.modalFinalText]}
                        >
                            Ce jeu de Noël est terminé 🎅
                        </ThemedText>
                    )}
                </View>
            </CustomModal>
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
    modal: { justifyContent: "center", flex: 1, gap: 20 },
    modalButton: {
        color: "#136F63",
        borderColor: "#136F63",
        borderWidth: 2,
        margin: 5,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 14,
        fontFamily: "AnonymousProBold",
    },
    modalFinalText: {
        fontFamily: "AnonymousProBold",
        fontSize: 14,
        marginTop: 10,
    },
});
