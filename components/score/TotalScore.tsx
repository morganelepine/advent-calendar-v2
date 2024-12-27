import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import Animated, {
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";
import { Colors } from "@/constants/Colors";

interface TotalScoreProps {
    score: number;
}

export const TotalScore: React.FC<TotalScoreProps> = ({ score }) => {
    const minScoreToWin = 2512;

    const progress = (score / minScoreToWin) * 100;
    const animatedStyle = useAnimatedStyle(() => ({
        width: withTiming(`${progress}%`, { duration: 1000 }),
    }));

    return (
        <View style={styles.container}>
            <ThemedText style={styles.score}>
                <Text style={styles.bold}>{score}</Text>{" "}
                {score > 1 ? "points" : "point"}
            </ThemedText>

            {score >= minScoreToWin ? (
                <>
                    <ThemedText>Objectif atteint 🥳</ThemedText>
                    <ThemedText
                        style={{
                            marginBottom: 30,
                            fontFamily: "PoppinsItalic",
                            fontSize: 12,
                        }}
                    >
                        Rendez-vous le 25 décembre pour la surprise !
                    </ThemedText>
                </>
            ) : (
                <>
                    <View style={styles.pointsContainer}>
                        <ThemedText style={{ fontSize: 12 }}>
                            Objectif : {minScoreToWin} points
                        </ThemedText>
                    </View>
                    <View style={styles.barContainer}>
                        <Animated.View
                            style={[styles.completion, animatedStyle]}
                        />
                    </View>
                    <ThemedText style={{ marginBottom: 20 }}>
                        {Math.round(progress)}% de l'objectif atteint 🥳
                    </ThemedText>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        width: "100%",
    },

    bold: {
        fontFamily: "PallyBold",
    },
    score: {
        fontSize: 50,
        marginVertical: 10,
        color: Colors.blue,
    },

    pointsContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginBottom: 5,
    },

    barContainer: {
        position: "relative",
        alignSelf: "stretch",
        height: 20,
        backgroundColor: "white",
        marginBottom: 10,
        borderRadius: 50,
    },
    completion: {
        position: "absolute",
        alignSelf: "stretch",
        height: "100%",
        backgroundColor: Colors.pink,
        borderRadius: 50,
    },
});
