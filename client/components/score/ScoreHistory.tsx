import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Score } from "@/components/score/Score";

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
        <View key={date} style={styles.section}>
            <ThemedText type="subtitle" style={styles.scoresDate}>
                {date}
            </ThemedText>

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
        fontSize: 18,
        borderRadius: 50,
        backgroundColor: "#165d4b",
        color: "white",
        paddingHorizontal: 14,
        paddingTop: 6,
        paddingBottom: 8,
        marginBottom: 10,
        alignSelf: "flex-start",
    },
});
