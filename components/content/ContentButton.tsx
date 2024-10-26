import { useEffect, useState } from "react";
import { StyleSheet, Pressable, ImageBackground } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { updateScores } from "../../services/score.service";
import {
    getContentTitle,
    getContentBackgroundImage,
} from "../../services/content.service";
import { Content } from '../../interfaces/contentInterface';
import { ScoreType } from '../../enums/enums';
import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
    cloud: {
        cloudName: "deauthz29",
    },
});

interface ContentButtonProps {
    content?: Content;
    ideas?: Content[];
    games?: Content[];
    setModalVisible: (visible: boolean) => void;
    dayId: number;
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
    }, [content, ideas, games]);
    const backgroundImage = cld.image(image);
    // const version = new Date().getTime();
    // let backgroundImage = cld.image(image).setVersion(version);

    const handleContentOpening = async () => {
        await updateScores(dayId, ScoreType.ContentOpening);
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
