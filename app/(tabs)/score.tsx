import { useEffect, useRef, useState } from "react";
import { StyleSheet, ScrollView, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { loadScores, getTotalScore } from "@/services/score.service";
import { Header } from "@/components/score/Header";
import { Rules } from "@/components/score/Rules";
import { TotalScore } from "@/components/score/TotalScore";
import { ScoreHistory } from "@/components/score/ScoreHistory";
import { Score } from "@/interfaces/scoreInterfaces";
import cld from "@/config/cloudinaryConfig";

export default function ScoreScreen() {
    const scrollViewRef = useRef<ScrollView>(null);
    const backgroundImage = cld.image("ynohmmigwruoad8a6740");

    const [modalVisible, setModalVisible] = useState(false);

    const [score, setScore] = useState(0);
    const [scoreHistory, setScoreHistory] = useState<Score[]>([]);

    useEffect(() => {
        const getScores = async () => {
            const scores = await loadScores();
            setScoreHistory(scores);
        };
        getScores();
    }, [scoreHistory]);

    useEffect(() => {
        const getScoreTotal = async () => {
            const totalScore = await getTotalScore();
            setScore(totalScore);
        };
        getScoreTotal();
    }, [scoreHistory]);

    return (
        <ImageBackground
            source={{ uri: backgroundImage.toURL() }}
            resizeMode="cover"
            style={styles.imageBackground}
        >
            <SafeAreaView style={styles.safeArea}>
                <Header setModalVisible={setModalVisible} />

                <TotalScore score={score} />

                <ScrollView
                    ref={scrollViewRef}
                    style={styles.container}
                    persistentScrollbar={true} // Android only
                >
                    {scoreHistory.map((score: Score) => (
                        <ScoreHistory key={score.dayNumber} score={score} />
                    ))}

                    <Rules
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                    />
                </ScrollView>
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
        paddingHorizontal: 20,
        width: "100%",
    },
});
