import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useLocalSearchParams } from "expo-router";

interface Content {
    id: number;
    type: string;
    urlContent: string;
    textContent: string;
}

export const DayContent = () => {
    const params = useLocalSearchParams();
    const dayId = params.dayId;

    const [contents, setContents] = useState<Content[]>([]);

    useEffect(() => {
        fetch(`http://192.168.1.16:3000/days/${dayId}/contents`)
            .then((response) => response.json())
            .then((data) => setContents(data))
            .catch((error) => console.error("Error fetching contents:", error));
    }, [dayId]);

    return (
        <ImageBackground
            source={require("@/assets/images/sapin-lumineux.jpg")}
            resizeMode="cover"
            style={styles.background}
        >
            <SafeAreaView style={styles.safeArea}>
                {contents.map((content) => (
                    <ThemedText key={content.id}>
                        {content.textContent}
                    </ThemedText>
                ))}
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
});
