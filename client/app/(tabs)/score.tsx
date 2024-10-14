import { useCallback, useRef, useState } from "react";
import { StyleSheet, ScrollView, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { getScore } from "../../services/score.service";
import { ScrollToTopButton } from "@/components/custom-utils/Buttons/ScrollToTopButton";
import { Header } from "@/components/score/Header";
import { Rules } from "@/components/score/Rules";
import { TotalScore } from "@/components/score/TotalScore";
import { ScoreHistory } from "@/components/score/ScoreHistory";
import { Score } from "@/components/score/Score";

interface Day {
    id: number;
    dayNumber: number;
}
interface Score {
    id: number;
    points: number;
    reason: string;
    earnedAt: Date;
    day: Day;
}

interface ScoreHistoryType {
    [date: string]: Score[];
}

export default function RulesScreen() {
    const scrollViewRef = useRef<ScrollView>(null);

    const [modalVisible, setModalVisible] = useState(false);

    const [score, setScore] = useState(0);
    const [scoreHistory, setScoreHistory] = useState<ScoreHistoryType | null>(
        null
    );

    useFocusEffect(
        useCallback(() => {
            const getUserScore = async () => {
                const userUuid = await AsyncStorage.getItem("userUuid");
                if (userUuid) {
                    const userScore = await getScore(userUuid);
                    setScore(userScore.score);
                    setScoreHistory(userScore.scoresByDate || []);
                }
            };
            getUserScore();
        }, [score])
    );

    const scoresByDates = scoreHistory ? Object.entries(scoreHistory) : [];

    const groupedScores = scoresByDates.map(([date, scores]) => {
        let scoreEarnedLate: Score[] = [];
        let scoreEarnedOnTime: Score[] = [];

        scores.forEach((score: Score) => {
            const scoreEarnedAt = new Date(score.earnedAt);
            const isEarnedLate = scoreEarnedAt.getDate() !== score.day.id;

            if (isEarnedLate) {
                scoreEarnedLate.push(score);
            } else {
                scoreEarnedOnTime.push(score);
            }
        });

        return [
            date,
            {
                openLate: scoreEarnedLate,
                openOnTime: scoreEarnedOnTime,
            },
        ] as [string, { openLate: Score[]; openOnTime: Score[] }];
    });

    return (
        <ImageBackground
            source={require("@/assets/images/fond-blanc-pommedepin.jpg")}
            resizeMode="cover"
            style={styles.imageBackground}
        >
            <SafeAreaView style={styles.safeArea}>
                <Header setModalVisible={setModalVisible} />

                <TotalScore score={score} />

                <ScrollView ref={scrollViewRef} style={styles.container}>
                    {groupedScores.map(([date, { openOnTime, openLate }]) => (
                        <ScoreHistory
                            date={date}
                            openOnTime={openOnTime}
                            openLate={openLate}
                        />
                    ))}

                    <Rules
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                    />
                </ScrollView>

                <ScrollToTopButton ref={scrollViewRef}></ScrollToTopButton>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    safeArea: {
        flex: 1,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    container: {
        flex: 1,
        paddingHorizontal: 25,
        width: "100%",
    },
});
