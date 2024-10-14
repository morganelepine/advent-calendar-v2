import { StyleSheet, View, Text } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

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
                <Text style={styles.bold}>{score}</Text> points
            </ThemedText>
            <View style={styles.pointsContainer}>
                <ThemedText style={styles.points}>0 point</ThemedText>
                <ThemedText style={styles.points}>2512 points</ThemedText>
            </View>
            <View style={styles.barContainer}>
                <Animated.View style={[styles.completion, animatedStyle]} />
            </View>
            <ThemedText style={styles.goal}>
                {Math.round(progress)}% de l'objectif atteint 🥳
            </ThemedText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 25,
        width: "100%",
    },

    bold: {
        fontFamily: "PoppinsBold",
    },
    score: {
        fontSize: 40,
        marginVertical: 10,
    },

    pointsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    points: {
        fontSize: 12,
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
        backgroundColor: "#b52936",
        borderRadius: 50,
    },

    goal: { marginBottom: 20 },
});