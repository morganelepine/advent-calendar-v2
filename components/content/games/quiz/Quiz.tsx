import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { CustomMarkdown } from "@/components/utils/custom/Markdown";
import { QuizAnswers } from "@/components/content/games/quiz/QuizAnswers";
import { QuizExplanation } from "@/components/content/games/quiz/QuizExplanation";
import { Content } from '../../../../interfaces/contentInterface';

interface QuizProps {
    games: Content[];
    setScore: () => Promise<void>;
}

export const Quiz: React.FC<QuizProps> = ({ games, setScore }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const currentGame = games[currentQuestionIndex];
    const answers = currentGame.content2.split(",");
    const [answerButtonIsDisabled, setAnswerButtonIsDisabled] =
        useState<boolean>(false);

    const handleAnswer = (answer: string) => {
        setSelectedAnswer(answer);
        setAnswerButtonIsDisabled(true);
    };

    useEffect(() => {
        if (selectedAnswer === currentGame.content3) {
            setScore();
        }
    }, [selectedAnswer, currentGame.content3, setScore]);

    const handleNextQuestion = () => {
        setSelectedAnswer(null);
        setAnswerButtonIsDisabled(false);
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
                answerButtonIsDisabled={answerButtonIsDisabled}
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
