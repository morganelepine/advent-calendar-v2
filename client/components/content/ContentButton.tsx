import { useEffect, useState } from "react";
import { StyleSheet, Pressable, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedText } from "@/components/ThemedText";
import { saveScore } from "../../services/score.service";
import {
    getContentTitle,
    getContentBackgroundImage,
} from "../../services/content.service";

interface Content {
    id: number;
    type: "quote" | "recipe" | "anecdote" | "idea" | "game";
    title: string;
    content1: string;
    content2: string;
    content3: string;
    content4: string;
    content5: string;
}

interface ContentButtonProps {
    content?: Content;
    ideas?: Content[];
    games?: Content[];
    setModalVisible: (visible: boolean) => void;
    dayId: number | null;
}

export const ContentButton: React.FC<ContentButtonProps> = ({
    content = {
        id: 0,
        type: "quote",
        title: "",
        content1: "",
        content2: "",
        content3: "",
        content4: "",
        content5: "",
    },
    ideas = [],
    games = [],
    setModalVisible,
    dayId,
}) => {
    const backgroundImage = getContentBackgroundImage(content, ideas, games);

    const [userUuid, setUserUuid] = useState<string>("");
    useEffect(() => {
        const getUserUuid = async () => {
            const uuid = await AsyncStorage.getItem("userUuid");
            if (uuid) {
                setUserUuid(uuid);
            }
        };
        getUserUuid();
    }, []);

    const handleContentOpening = async () => {
        const today = new Date();
        let score = dayId === today.getDate() ? 12 : 6;

        await saveScore(userUuid, dayId, score, "l'ouverture d'un contenu");
        setModalVisible(true);
    };

    return (
        <ImageBackground
            source={backgroundImage}
            resizeMode="cover"
            style={styles.backgroundImage}
        >
            <Pressable style={styles.button} onPress={handleContentOpening}>
                <ThemedText style={styles.title} type="subtitle">
                    {getContentTitle(content, ideas, games)}
                </ThemedText>
            </Pressable>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
    },
    button: {
        padding: 5,
        flexGrow: 1,
        justifyContent: "center",
    },
    title: {
        color: "white",
    },
});
