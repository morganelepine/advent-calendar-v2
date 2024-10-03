import React, { useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { DayHeader } from "@/components/days/DayHeader";
import { DayContent } from "@/components/days/DayContent";

interface Content {
    id: number;
    type: "quote" | "anecdote" | "recipe" | "idea" | "game";
    title: string;
    content1: string;
    content2: string;
    content3: string;
    content4: string;
}

export const Day = () => {
    const params = useLocalSearchParams();
    const dayId = params.dayId;

    const [contents, setContents] = useState<Content[]>([]);

    const sortContents = (contents: Content[]) => {
        const priority: { [key in Content["type"]]: number } = {
            quote: 1,
            anecdote: 2,
            recipe: 3,
            idea: 4,
            game: 5,
        };

        contents.sort((a, b) => {
            return (
                (priority[a.type] || Infinity) - (priority[b.type] || Infinity)
            );
        });
    };

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await fetch(
                    `http://192.168.1.16:3000/days/${dayId}/contents`
                );
                const data = await response.json();
                sortContents(data);
                setContents(data);
            } catch (error) {
                console.error("Error fetching contents:", error);
            }
        };
        fetchContent();
    }, [dayId]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <DayHeader />

            <View style={[styles.contentsContainer]}>
                {contents.map((content) => (
                    <DayContent key={content.id} content={content} />
                ))}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    contentsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        flexGrow: 1,
        alignContent: "center",
        marginHorizontal: 10,
    },
});
