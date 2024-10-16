import { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomModal } from "@/components/custom-utils/Modal";
import { ContentButton } from "@/components/content/ContentButton";
import { Hangman } from "@/components/content/games/Hangman";
import { Games } from "@/components/content/games/Games";
import { Quiz } from "@/components/content/games/Quiz";
import { classifyGames } from "../../services/content.service";
import { saveScore } from "../../services/score.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
interface GameProps {
    games: Content[];
    dayId: number | null;
}

export const Game: React.FC<GameProps> = ({ games, dayId }) => {
    const [userUuid, setUserUuid] = useState<string>("");
    useEffect(() => {
        const getUserUuid = async () => {
            const uuid = await AsyncStorage.getItem("userUuid");
            if (uuid) {
                setUserUuid(uuid);
            }
        };
        getUserUuid();
    }, []);

    const [modalVisible, setModalVisible] = useState(false);

    const { gamesByType, type } = classifyGames(games);

    const setScore = async () => {
        const today = new Date();
        let score = dayId === today.getDate() ? 12 : 6;

        await saveScore(userUuid, dayId, score, "une bonne réponse à un jeu");
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
