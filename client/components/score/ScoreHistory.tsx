import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Score } from "@/components/score/Score";
import { Colors } from "@/constants/Colors";

interface Score {
    id: number;
    points: number;
    reason: string;
    earnedAt: Date;
}

interface ScoreHistoryProps {
    date: string;
    openOnTime: Score[];
    openLate: Score[];
}

export const ScoreHistory: React.FC<ScoreHistoryProps> = ({
    date,
    openOnTime,
    openLate,
}) => {
    return (
        <View style={styles.section}>
            <ThemedText style={styles.scoresDate}>{date}</ThemedText>

            {openOnTime.map((score) => (
                <Score key={score.id} score={score} />
            ))}

            {openLate.length > 0 && (
                <>
                    <ThemedText style={styles.lateTitle}>
                        Points gagnés en retard
                    </ThemedText>
                    {openLate.map((score) => (
                        <Score key={score.id} score={score} />
                    ))}
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        marginVertical: 15,
    },
    lateTitle: {
        fontFamily: "PoppinsBold",
        textAlign: "left",
        marginTop: 15,
        textDecorationLine: "underline",
    },
    scoresDate: {
        fontFamily: "Pally",
        fontSize: 16,
        color: "white",
        backgroundColor: Colors.blue,
        borderRadius: 50,
        alignSelf: "flex-start",
        paddingHorizontal: 14,
        paddingTop: 6,
        paddingBottom: 8,
        marginBottom: 10,
    },
});
