import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { CustomMarkdown } from "@/components/custom-utils/Markdown";
import { QuizAnswers } from "@/components/content/games/quiz/QuizAnswers";
import { QuizExplanation } from "@/components/content/games/quiz/QuizExplanation";

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
    setScore: () => Promise<void>;
}

export const Quiz: React.FC<QuizProps> = ({ games, setScore }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const currentGame = games[currentQuestionIndex];
    const answers = currentGame.content2.split(",");

    const handleAnswer = (answer: string) => {
        setSelectedAnswer(answer);
    };

    useEffect(() => {
        if (selectedAnswer === currentGame.content3) {
            setScore();
        }
    }, [selectedAnswer]);

    const handleNextQuestion = () => {
        setSelectedAnswer(null);
        setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % games.length);
    };

    return (
        <>
            <CustomMarkdown style={styles.question}>
                {currentGame.content1}
            </CustomMarkdown>

            <QuizAnswers
                currentGame={currentGame}
                answers={answers}
                selectedAnswer={selectedAnswer}
                handleAnswer={handleAnswer}
            />

            {selectedAnswer !== null && (
                <QuizExplanation
                    games={games}
                    currentGame={currentGame}
                    selectedAnswer={selectedAnswer}
                    currentQuestionIndex={currentQuestionIndex}
                    handleNextQuestion={handleNextQuestion}
                />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    question: {
        marginVertical: 20,
    },
});
