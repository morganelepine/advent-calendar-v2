import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { DayHeader } from "@/components/days/Content/DayHeader";
import { DayContent } from "@/components/days/Content/DayContent";

interface Content {
    id: number;
    type: "quote" | "anecdote" | "recipe" | "idea" | "game";
    title: string;
    content1: string;
    content2: string;
    content3: string;
    content4: string;
    content5: string;
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

    const insets = useSafeAreaInsets();

    return (
        <View
            style={{
                flex: 1,
                paddingBottom: insets.bottom,
            }}
        >
            <DayHeader />
            <DayContent contents={contents} />
        </View>
    );
};

const styles = StyleSheet.create({});
