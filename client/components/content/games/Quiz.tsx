import { Pressable, StyleSheet, View, TextStyle } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import Markdown from "react-native-markdown-display";
import { Video } from "@/components/custom-utils/Video";

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

interface QuizProps {
    games: Content[];
}

export const Quiz: React.FC<QuizProps> = ({ games }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const currentGame = games[currentQuestionIndex];
    const answers = currentGame.content2.split(",");

    const handleAnswer = (answer: string) => {
        setSelectedAnswer(answer);
    };

    const handleNextQuestion = () => {
        setSelectedAnswer(null);
        setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % games.length);
    };

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
            <Markdown
                style={{
                    body: [styles.texts, styles.question] as TextStyle,
                }}
            >
                {currentGame.content1}
            </Markdown>

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

            {selectedAnswer !== null && (
                <View>
                    <View style={[styles.answerContainer]}>
                        {selectedAnswer === currentGame.content3 ? (
                            <ThemedText
                                style={[
                                    styles.texts,
                                    { fontFamily: "AnonymousProBold" },
                                ]}
                            >
                                Bonne réponse !
                            </ThemedText>
                        ) : (
                            <ThemedText
                                style={[
                                    styles.texts,
                                    { fontFamily: "AnonymousProBold" },
                                ]}
                            >
                                Oops... La bonne réponse était "
                                {currentGame.content3}"
                            </ThemedText>
                        )}

                        {currentGame.content5 === "quiz-citation" &&
                            currentGame.content4 && (
                                <View style={[styles.videoContainer]}>
                                    <Video videoId={currentGame.content4} />
                                </View>
                            )}
                    </View>

                    {currentQuestionIndex === games.length - 1 ? (
                        <ThemedText style={[styles.texts, styles.finalText]}>
                            Ce quiz de Noël est terminé 🎅
                        </ThemedText>
                    ) : (
                        <Pressable onPress={handleNextQuestion}>
                            <ThemedText style={[styles.button]}>
                                Question suivante
                            </ThemedText>
                        </Pressable>
                    )}
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    texts: {
        color: "#22311d",
        textAlign: "center",
        fontFamily: "AnonymousPro",
    },
    question: {
        fontFamily: "AnonymousProItalic",
        fontSize: 20,
        marginVertical: 20,
    },
    answer: {
        backgroundColor: "#136F63",
        margin: 5,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 8,
    },
    isNotCorrect: {
        backgroundColor: "white",
        color: "#136F63",
        opacity: 0.4,
    },
    answerContainer: {
        marginVertical: 20,
    },
    explanations: {
        marginTop: 10,
        fontSize: 18,
    },
    videoContainer: { marginTop: 20 },
    button: {
        color: "#136F63",
        borderColor: "#136F63",
        borderWidth: 2,
        margin: 5,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 14,
        fontFamily: "AnonymousProBold",
    },
    finalText: { fontFamily: "AnonymousProBold", fontSize: 14, marginTop: 10 },
});
