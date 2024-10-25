import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

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
            color = isSelected ? Colors.red : Colors.snow;
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
        backgroundColor: Colors.red,
        marginVertical: 5,
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        width: "100%",
    },
    isNotCorrect: {
        backgroundColor: Colors.snow,
        color: Colors.red,
        opacity: 0.4,
        borderColor: Colors.red,
        borderWidth: 0.6,
    },
});
