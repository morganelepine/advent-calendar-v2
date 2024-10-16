import { useState } from "react";
import { StyleSheet, View, Dimensions, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomModal } from "@/components/custom-utils/Modal";
import { CustomScrollView } from "@/components/custom-utils/ScrollView";
import { ContentButton } from "@/components/content/ContentButton";
import { Video } from "@/components/custom-utils/Video";
import { CustomMarkdown } from "@/components/custom-utils/Markdown";
import { AdvancedImage } from "cloudinary-react-native";
import { Cloudinary } from "@cloudinary/url-gen";
import { ExternalLink } from "@/components/utils/ExternalLink";

const cld = new Cloudinary({
    cloud: {
        cloudName: "deauthz29",
    },
});

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

interface IdeaProps {
    ideas: Content[];
    dayId: number | null;
}

export const Idea: React.FC<IdeaProps> = ({ ideas, dayId }) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const [imageWidth, setImageWidth] = useState<number>(0);
    const [imageHeight, setImageHeight] = useState<number>(0);

    const screenWidth = Dimensions.get("window").width;
    const maxHeight = 200;

    ideas.forEach((idea) => {
        if (idea.content5 === "Un livre") {
            const image = cld.image(idea.content4);
            const imageUrl = image.toURL();

            Image.getSize(imageUrl, (width, height) => {
                const ratio = Math.min(screenWidth / width, maxHeight / height);
                const adjustedWidth = width * ratio;
                const adjustedHeight = height * ratio;

                setImageWidth(adjustedWidth);
                setImageHeight(adjustedHeight);
            });
        }
    });

    return (
        <>
            <ContentButton
                ideas={ideas}
                setModalVisible={setModalVisible}
                dayId={dayId}
            />
            <CustomModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                contentType={"ideas"}
            >
                <CustomScrollView>
                    {ideas.map((idea) => (
                        <View key={idea.id}>
                            <ThemedText type="modalSubtitle">
                                {idea.title}
                            </ThemedText>

                            <CustomMarkdown>{idea.content1}</CustomMarkdown>

                            {idea.content3 ? (
                                <ThemedText style={styles.author}>
                                    de {idea.content3}
                                </ThemedText>
                            ) : null}

                            {idea.content5 === "Un livre" && idea.content4 ? (
                                <View>
                                    <AdvancedImage
                                        cldImg={cld.image(idea.content4)}
                                        style={[
                                            styles.image,
                                            { width: imageWidth },
                                            { height: imageHeight },
                                        ]}
                                        resizeMode="contain"
                                    />
                                </View>
                            ) : null}

                            {(idea.content5 === "Une série" ||
                                idea.content5 === "Des films") &&
                            idea.content4 ? (
                                <Video videoId={idea.content4} />
                            ) : null}

                            <CustomMarkdown style={styles.description}>
                                {idea.content2}
                            </CustomMarkdown>

                            {(idea.content5 === "Une playlist" ||
                                idea.content5 === "Un jeu") &&
                            idea.content4 ? (
                                <ExternalLink
                                    href={idea.content4}
                                    style={styles.button}
                                >
                                    <ThemedText style={styles.buttonText}>
                                        {idea.title.includes("Bingo")
                                            ? "Télécharger le bingo"
                                            : "Écouter la playlist"}
                                    </ThemedText>
                                </ExternalLink>
                            ) : null}
                        </View>
                    ))}
                </CustomScrollView>
            </CustomModal>
        </>
    );
};

const styles = StyleSheet.create({
    author: {
        marginTop: -10,
        marginBottom: 15,
        fontSize: 12,
        fontFamily: "PoppinsItalic",
        textAlign: "left",
    },
    description: {
        marginBottom: 5,
        textAlign: "left",
    },
    image: {
        borderColor: "#165d4b",
        borderWidth: 0.2,
        marginBottom: 5,
    },
    button: {
        backgroundColor: "#165d4b",
        padding: 10,
        borderRadius: 20,
        marginBottom: 20,
        textAlign: "center",
    },
    buttonText: { color: "white" },
});
