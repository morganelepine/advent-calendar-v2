import { StyleSheet, View, Text } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { Collapsible } from "../utils/Collapsible";
import {Score} from '../../interfaces/scoreInterfaces';


interface ScoreHistoryProps {
    score: Score;
}

export const ScoreHistory: React.FC<ScoreHistoryProps> = ({ score }) => {
    const point = score.scoreTotal > 0 ? "points gagnés" : "point";

    return (
        <View style={styles.scoreHistory}>
            <ThemedText style={styles.scoresDate}>
                {score.dayNumber} décembre
            </ThemedText>
            <Collapsible title={`${score.scoreTotal} ${point}`}>
                <>
                    {score.scoreDetails.firstLogin > 0 && (
                        <ThemedText style={styles.score}>
                            Première connexion :{" "}
                            <Text style={styles.bold}>
                                {score.scoreDetails.firstLogin} points
                            </Text>
                        </ThemedText>
                    )}
                    <ThemedText style={styles.score}>
                        Ouverture du jour :{" "}
                        <Text style={styles.bold}>
                            {score.scoreDetails.dayOpening}{" "}
                            {score.scoreDetails.dayOpening > 0
                                ? "points"
                                : "point"}
                        </Text>
                    </ThemedText>
                    <ThemedText style={styles.score}>
                        Ouverture des contenus :{" "}
                        <Text style={styles.bold}>
                            {score.scoreDetails.contentOpening}{" "}
                            {score.scoreDetails.contentOpening > 0
                                ? "points"
                                : "point"}
                        </Text>
                    </ThemedText>
                    <ThemedText style={styles.score}>
                        Bonnes réponses aux jeux :{" "}
                        <Text style={styles.bold}>
                            {score.scoreDetails.gameCorrectAnswer}{" "}
                            {score.scoreDetails.gameCorrectAnswer > 0
                                ? "points"
                                : "point"}
                        </Text>
                    </ThemedText>
                </>
            </Collapsible>
        </View>
    );
};

const styles = StyleSheet.create({
    scoreHistory: {
        marginBottom: 20,
    },
    scoresDate: {
        fontFamily: "Pally",
        fontSize: 15,
        color: "white",
        backgroundColor: Colors.blue,
        borderRadius: 50,
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        paddingTop: 5,
        paddingBottom: 7,
        marginBottom: 10,
    },
    score: {
        textAlign: "left",
        fontSize: 14,
    },
    bold: {
        fontFamily: "PoppinsBold",
    },
});
