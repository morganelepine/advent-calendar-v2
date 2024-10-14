import { StyleSheet, View, Text } from "react-native";
import { ThemedText } from "@/components/ThemedText";

interface Score {
    id: number;
    points: number;
    reason: string;
    earnedAt: Date;
}

interface ScoreProps {
    score: Score;
}

export const Score: React.FC<ScoreProps> = ({ score }) => {
    return (
        <View style={styles.scoreHistory}>
            <ThemedText style={styles.score}>
                <Text style={styles.bold}>{score.points} points </Text>
                pour {score.reason}
            </ThemedText>
        </View>
    );
};

const styles = StyleSheet.create({
    scoreHistory: {
        marginVertical: 2,
    },
    score: {
        textAlign: "left",
        fontSize: 14,
    },
    scoreEarnedAt: {
        textAlign: "left",
        fontFamily: "PoppinsItalic",
        fontSize: 14,
    },
    bold: {
        fontFamily: "PoppinsBold",
    },
});
