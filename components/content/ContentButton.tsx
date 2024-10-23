import { useEffect, useState } from "react";
import { StyleSheet, Pressable, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedText } from "@/components/ThemedText";
import { updateScores } from "../../services/score.service";
import {
    getContentTitle,
    getContentBackgroundImage,
} from "../../services/content.service";
import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
    cloud: {
        cloudName: "deauthz29",
    },
});

interface Content {
    id: number;
    dayNumber: number;
    type: string;
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
        dayNumber: 0,
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
    const [image, setImage] = useState<string>();
    const [isImageReady, setIsImageReady] = useState<boolean>(false);
    useEffect(() => {
        const backgroundImage = getContentBackgroundImage(
            content,
            ideas,
            games
        );
        if (backgroundImage) {
            setImage(backgroundImage);
            setIsImageReady(true);
        }
    }, []);
    let backgroundImage = cld.image(image);
    // const version = new Date().getTime();
    // let backgroundImage = cld.image(image).setVersion(version);

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

        await updateScores(dayId, score, "contentOpening");
        setModalVisible(true);
    };

    return (
        <>
            {isImageReady && (
                <ImageBackground
                    source={{ uri: backgroundImage.toURL() }}
                    resizeMode="cover"
                    style={styles.backgroundImage}
                >
                    <Pressable
                        style={styles.button}
                        onPress={handleContentOpening}
                    >
                        <ThemedText style={styles.title}>
                            {getContentTitle(content, ideas, games)}
                        </ThemedText>
                    </Pressable>
                </ImageBackground>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: "100%",
    },
    button: {
        padding: 5,
        flexGrow: 1,
        justifyContent: "center",
    },
    title: {
        color: "white",
        fontSize: 24,
        letterSpacing: 3,
        fontFamily: "PallyBold",
        textAlign: "center",
    },
});
