import { useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomModal } from "@/components/utils/custom/Modal";
import { ContentButton } from "@/components/content/ContentButton";
import { Hangman } from "@/components/content/games/hangman/Hangman";
import { Games } from "@/components/content/games/others/Games";
import { Quiz } from "@/components/content/games/quiz/Quiz";
import { classifyGames } from "../../services/content.service";
import { updateScores } from "../../services/score.service";
import { Content } from '../../interfaces/contentInterface';

interface GameProps {
    games: Content[];
    dayId: number | null;
}

export const Game: React.FC<GameProps> = ({ games, dayId }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const { gamesByType, type } = classifyGames(games);

    const setScore = async () => {
        const today = new Date();
        const score = dayId === today.getDate() ? 20 : 10;

        await updateScores(dayId, score, "gameCorrectAnswer");
    };

    return (
        <>
            <ContentButton
                games={games}
                setModalVisible={setModalVisible}
                dayId={dayId}
            />
            <CustomModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                contentType={type}
            >
                <ScrollView
                    persistentScrollbar={true} // Android only
                    style={{ minWidth: "100%" }}
                >
                    <View style={styles.container}>
                        {gamesByType.pendu && (
                            <Hangman
                                game={gamesByType.pendu}
                                setScore={setScore}
                            />
                        )}

                        {gamesByType.jeu && <Games game={gamesByType.jeu} />}

                        {gamesByType.quizCitation.length > 0 && (
                            <>
                                <ThemedText
                                    type="modalSubtitle"
                                    style={{ textAlign: "center" }}
                                >
                                    À quel film de Noël appartient cette
                                    réplique&nbsp;?
                                </ThemedText>
                                <Quiz
                                    games={gamesByType.quizCitation}
                                    setScore={setScore}
                                />
                            </>
                        )}

                        {gamesByType.quizNoel.length > 0 && (
                            <>
                                <ThemedText type="modalSubtitle">
                                    Êtes-vous incollable sur&nbsp;Noël&nbsp;?
                                </ThemedText>
                                <Quiz
                                    games={gamesByType.quizNoel}
                                    setScore={setScore}
                                />
                            </>
                        )}
                    </View>
                </ScrollView>
            </CustomModal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    title: {
        marginTop: 10,
    },
});
