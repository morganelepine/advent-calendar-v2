import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { getTotalScore } from "@/services/score.service";

interface Day25Props {
    dayId: number;
}

export const Day25: React.FC<Day25Props> = ({ dayId }) => {
    const [score, setScore] = useState<number>(0);

    useEffect(() => {
        const getScoreTotal = async () => {
            const totalScore = await getTotalScore();
            setScore(totalScore);
        };
        getScoreTotal();
    }, []);

    return (
        <View style={styles.container}>
            {score >= 2512 ? (
                <ThemedText style={styles.title}>
                    Bravo, vous avez gagné {score} points et pouvez donc accéder
                    à la surprise !
                </ThemedText>
            ) : (
                <ThemedText style={styles.title}>
                    Dommage, vous n'avez pas réussi à atteindre les 2512 points
                    requis pour accéder à la surprise... Retentez votre chance
                    l'année prochaine !
                </ThemedText>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontFamily: "PallyBold",
        paddingTop: 2,
        fontSize: 20,
        textAlign: "center",
        letterSpacing: 1,
        color: Colors.blue,
    },
});
