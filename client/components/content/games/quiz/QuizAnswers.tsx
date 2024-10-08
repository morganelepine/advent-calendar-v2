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
    const getAnswerStyle = (answer: string) => {
        if (selectedAnswer === null) {
            return styles.answer;
        }
        if (answer.trim() === currentGame.content3.trim()) {
            return styles.answer;
        } else {
            return [styles.answer, styles.isNotCorrect];
        }
    };

    return (
        <>
            {answers.map((answer) => (
                <Pressable
                    key={answer}
                    onPress={() => {
                        handleAnswer(answer);
                    }}
                >
                    <ThemedText style={getAnswerStyle(answer)}>
                        {answer}
                    </ThemedText>
                </Pressable>
            ))}
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
        color: "white",
        fontSize: 18,
    },
    isNotCorrect: {
        backgroundColor: "white",
        color: "#136F63",
        opacity: 0.4,
    },
});
