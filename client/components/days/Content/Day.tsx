import React, { useEffect, useState } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { DayHeader } from "@/components/days/Content/DayHeader";
import { DayContent } from "@/components/days/Content/DayContent";
import { Colors } from "@/constants/Colors";

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
    const day: string | string[] = params.dayId;
    const dayId = Array.isArray(params.dayId) ? params.dayId[0] : params.dayId;
    const parsedDayId = dayId ? parseInt(dayId, 10) : null;

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
                    `http://192.168.1.16:3000/days/${day}/contents`
                );
                const data = await response.json();
                sortContents(data);
                setContents(data);
            } catch (error) {
                console.error("Error fetching contents:", error);
            }
        };
        fetchContent();
    }, [day]);

    const insets = useSafeAreaInsets();

    return (
        <ImageBackground
            source={require("@/assets/images/2.png")}
            resizeMode="cover"
            style={styles.imageBackground}
        >
            <SafeAreaView
                style={{
                    flex: 1,
                    // marginTop: insets.top,
                    paddingBottom: insets.bottom,
                    // backgroundColor: Colors.snow,
                    // borderColor: "red",
                    // borderWidth: 2,
                }}
            >
                <DayHeader dayId={parsedDayId} />
                <DayContent contents={contents} dayId={parsedDayId} />
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
});
