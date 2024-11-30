import { useEffect, useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { CustomMarkdown } from "@/components/utils/custom/Markdown";
import { QuizAnswers } from "@/components/content/games/quiz/QuizAnswers";
import { QuizExplanation } from "@/components/content/games/quiz/QuizExplanation";
import { Content } from "@/interfaces/contentInterface";
import { setGameStatus } from "@/services/score.service";
import { GameType } from "@/enums/enums";

interface QuizProps {
    games: Content[];
    setScore: () => Promise<void>;
    dayId: number;
}

export const Quiz: React.FC<QuizProps> = ({ games, setScore, dayId }) => {
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

    const handleNextQuestion = () => {
        setSelectedAnswer(null);
        setAnswerButtonIsDisabled(false);
        setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % games.length);
    };

    useEffect(() => {
        if (selectedAnswer === currentGame.content3) {
            setScore();
        }
    }, [selectedAnswer]);

    useEffect(() => {
        if (currentQuestionIndex === games.length - 1) {
            const game = games.find((game) => game.dayNumber === dayId);
            if (game) {
                setGameStatus(game.dayNumber);
            }
        }
    }, [currentQuestionIndex]);

    return (
        <>
            {currentGame.content5 === GameType.QuizEmojis && (
                <ThemedText style={{ marginVertical: 10 }}>
                    Retrouvez dans quelle chanson se trouve ce refrain en émojis
                    :
                </ThemedText>
            )}

            <CustomMarkdown
                style={{
                    marginVertical:
                        currentGame.content5 === GameType.QuizEmojis ? 0 : 20,
                    fontSize:
                        currentGame.content5 === GameType.QuizEmojis ? 26 : 16,
                    lineHeight:
                        currentGame.content5 === GameType.QuizEmojis ? 48 : 26,
                }}
            >
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
