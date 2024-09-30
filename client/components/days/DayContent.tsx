import React, { useEffect, useState } from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { Video } from "@/components//content/Video";
import { Quote } from "@/components/./content/Quote";
import { Tip } from "@/components//content/Tip";
import { AudioPlayer } from "@/components/content/Audio";
import { Collapsible } from "@/components/Collapsible";

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
            {contents.map((content) => (
                <SafeAreaView style={styles.safeArea} key={content.id}>
                    <View style={styles.contentsContainer}>
                        <Quote content={content} />
                        <Collapsible title="LE SAVIEZ-VOUS ?">
                            <Tip content={content} />
                        </Collapsible>
                        <Collapsible title="UN PETIT CREUX ?">
                            <Video content={content} />
                        </Collapsible>
                        <Collapsible title="EN PRENDRE PLEIN LES YEUX">
                            <Video content={content} />
                        </Collapsible>
                    </View>
                    <View style={styles.videoContainer}>
                        <AudioPlayer content={content} />
                    </View>
                </SafeAreaView>
            ))}
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
        // borderColor: "white",
        // borderWidth: 2,
    },
    videoContainer: {
        // borderColor: "white",
        // borderWidth: 2,
    },
    contentsContainer: {
        padding: 20,
        gap: 30,
        flexGrow: 1,
        // borderColor: "white",
        // borderWidth: 2,
    },
});
