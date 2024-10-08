import { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomModal } from "@/components/custom-utils/Modal";
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
}

export const Idea: React.FC<IdeaProps> = ({ ideas }) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <ContentButton ideas={ideas} setModalVisible={setModalVisible} />
            <CustomModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
            >
                <ScrollView>
                    <ThemedText type="modalTitle">
                        Recommandation du jour
                    </ThemedText>

                    {ideas.map((idea) => (
                        <View key={idea.id}>
                            <View style={styles.type}>
                                <ThemedText style={styles.typeText}>
                                    {idea.content5}
                                </ThemedText>
                            </View>

                            <ThemedText style={styles.title}>
                                {idea.title}
                            </ThemedText>

                            <CustomMarkdown>{idea.content1}</CustomMarkdown>

                            {idea.content3 ? (
                                <ThemedText style={styles.author}>
                                    de {idea.content3}
                                </ThemedText>
                            ) : null}

                            <CustomMarkdown style={styles.description}>
                                {idea.content2}
                            </CustomMarkdown>

                            {(idea.content5 === "Une série" ||
                                idea.content5 === "Des films") &&
                            idea.content4 ? (
                                <View style={styles.video}>
                                    <Video videoId={idea.content4} />
                                </View>
                            ) : null}

                            {idea.content5 === "Un livre" && idea.content4 ? (
                                <View style={styles.imageContainer}>
                                    <AdvancedImage
                                        cldImg={cld.image(idea.content4)}
                                        style={styles.image}
                                        resizeMode="contain"
                                    />
                                </View>
                            ) : null}

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
                                            : "Voir la playlist"}
                                    </ThemedText>
                                </ExternalLink>
                            ) : null}
                        </View>
                    ))}
                </ScrollView>
            </CustomModal>
        </>
    );
};

const styles = StyleSheet.create({
    type: {
        backgroundColor: "#22311d",
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: 20,
        alignSelf: "flex-start",
    },
    typeText: { color: "white", fontSize: 14 },
    title: { textAlign: "left", fontFamily: "AnonymousProBold" },
    author: {
        marginTop: 5,
        marginBottom: 20,
        fontSize: 14,
        fontFamily: "AnonymousProItalic",
        textAlign: "left",
    },
    description: {
        marginBottom: 5,
        fontSize: 18,
        textAlign: "left",
    },
    video: {
        marginTop: 20,
    },
    imageContainer: {
        marginTop: 20,
        width: "100%",
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: undefined,
        aspectRatio: 1,
    },
    button: {
        backgroundColor: "#22311d",
        padding: 10,
        borderRadius: 20,
        marginVertical: 20,
        textAlign: "center",
    },
    buttonText: { color: "white" },
});
