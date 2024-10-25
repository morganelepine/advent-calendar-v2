import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useEffect, useState } from "react";
import { Infos } from "@/components/content/games/hangman/Infos";
import { Alphabet } from "@/components/content/games/hangman/Alphabet";
import { Modal } from "@/components/content/games/hangman/Modal";

interface Content {
    id: number;
    dayNumber: number;
    type: string;
    title: string;
    content1: string;
    content2: string;
    content3: string;
    content4: string;
    content5: string;
}

interface HangmanProps {
    game: Content;
    setScore: () => Promise<void>;
}

export const Hangman: React.FC<HangmanProps> = ({ game, setScore }) => {
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
    }, [currentWord]);

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
            setScore();
            setModalMessage("Félicitations 🥳");
            setModalVisible(true);
        }
    }, [hiddenWord, currentWord, setScore]);

    useEffect(() => {
        if (mistakes === maxTries) {
            setModalMessage(
                "Dommage, vous avez atteint le nombre maximum d'essais 😟"
            );
            setModalVisible(true);
        }
    }, [mistakes]);

    return (
        <View key={game.id}>
            <ThemedText style={styles.quizTitle}>
                Trouvez 4 mots autour de l'hiver et de Noël
            </ThemedText>

            <Infos
                currentWordIndex={currentWordIndex}
                words={words}
                mistakes={mistakes}
                maxTries={maxTries}
            />

            <ThemedText style={styles.hiddenWord}>
                {hiddenWord.join(" ")}
            </ThemedText>

            <Alphabet
                clickedLetters={clickedLetters}
                checkLetter={checkLetter}
            />

            <Modal
                modalVisible={modalVisible}
                modalMessage={modalMessage}
                onClose={onClose}
                words={words}
                currentWord={currentWord}
                currentWordIndex={currentWordIndex}
                handleNextQuestion={handleNextQuestion}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    quizTitle: {
        marginVertical: 10,
        fontFamily: "PallyBold",
        fontSize: 22,
    },
    hiddenWord: { fontSize: 30, marginVertical: 20 },
});
