import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";

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

interface QuizAnswersProps {
    currentGame: Content;
    answers: string[];
    handleAnswer: (answer: string) => void;
    selectedAnswer: string | null;
}

export const QuizAnswers: React.FC<QuizAnswersProps> = ({
    currentGame,
    answers,
    handleAnswer,
    selectedAnswer,
}) => {
    const getStyles = (answer: string) => {
        const isCorrect = answer.trim() === currentGame.content3.trim();
        const isSelected = selectedAnswer !== null;

        return {
            buttonStyle: [
                styles.answer,
                isSelected && !isCorrect ? styles.isNotCorrect : null,
            ],
            textStyle: {
                color: isCorrect ? "white" : isSelected ? "#136F63" : "white",
                fontSize: 18,
            },
        };
    };

    return (
        <>
            {answers.map((answer) => {
                const { buttonStyle, textStyle } = getStyles(answer);
                return (
                    <Pressable
                        key={answer}
                        onPress={() => {
                            handleAnswer(answer);
                        }}
                        style={buttonStyle}
                    >
                        <ThemedText style={textStyle}>{answer}</ThemedText>
                    </Pressable>
                );
            })}
        </>
    );
};

const styles = StyleSheet.create({
    answer: {
        backgroundColor: "#136F63",
        marginVertical: 5,
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    isNotCorrect: {
        backgroundColor: "white",
        color: "#136F63",
        opacity: 0.4,
        borderColor: "#136F63",
        borderWidth: 0.3,
    },
});
