import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

interface DayProps {
    day: { id: number; dayNumber: number };
}

export const Day: React.FC<DayProps> = ({ day }) => {
    return (
        <View style={styles.dayContainer}>
            <ThemedView style={styles.dayBackground} />
            <ThemedText type="calendarDay">{day.dayNumber}</ThemedText>
        </View>
    );
};

const styles = StyleSheet.create({
    dayContainer: {
        width: "30%",
        height: 68,
        marginBottom: 10,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },

    dayBackground: {
        ...StyleSheet.absoluteFillObject, // Remplit tout l'espace du parent
        backgroundColor: "white",
        opacity: 0.15,
        borderRadius: 5,
    },
});
