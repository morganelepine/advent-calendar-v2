import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { Content } from "@/interfaces/contentInterface";

interface QuizAnswersProps {
    currentGame: Content;
    answers: string[];
    handleAnswer: (answer: string) => void;
    selectedAnswer: string | null;
    answerButtonIsDisabled: boolean;
}

export const QuizAnswers: React.FC<QuizAnswersProps> = ({
    currentGame,
    answers,
    handleAnswer,
    selectedAnswer,
    answerButtonIsDisabled,
}) => {
    const getStyles = (answer: string) => {
        const isCorrect = answer.trim() === currentGame.content3.trim();
        const isSelected = selectedAnswer !== null;

        let color;
        if (isCorrect) {
            color = Colors.snow;
        } else {
            color = isSelected ? Colors.green : Colors.snow;
        }

        return {
            buttonStyle: [
                styles.answer,
                isSelected && !isCorrect ? styles.isNotCorrect : null,
            ],
            textStyle: {
                color: color,
                fontSize: 16,
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
                        disabled={answerButtonIsDisabled}
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
        backgroundColor: Colors.green,
        marginVertical: 5,
        borderRadius: 50,
        paddingHorizontal: 15,
        justifyContent: "center",
        minHeight: 48,
    },
    isNotCorrect: {
        backgroundColor: Colors.snow,
        color: Colors.green,
        opacity: 0.4,
        borderColor: Colors.green,
        borderWidth: 0.6,
    },
});
