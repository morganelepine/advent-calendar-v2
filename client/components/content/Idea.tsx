import { useState } from "react";
import { StyleSheet, View, ScrollView, TextStyle } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomModal } from "@/components/custom-utils/Modal";
import { ContentButton } from "@/components/content/ContentButton";
import { Video } from "@/components/custom-utils/Video";
import Markdown from "react-native-markdown-display";
import { AdvancedImage } from "cloudinary-react-native";
import { Cloudinary } from "@cloudinary/url-gen";

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
                            <ThemedText style={[styles.texts, styles.title]}>
                                {idea.title}
                            </ThemedText>

                            <Markdown
                                style={{
                                    body: [
                                        styles.texts,
                                        styles.contentTitle,
                                    ] as TextStyle,
                                }}
                            >
                                {idea.content1}
                            </Markdown>

                            {idea.content3 ? (
                                <ThemedText
                                    style={[styles.texts, styles.author]}
                                >
                                    de {idea.content3}
                                </ThemedText>
                            ) : null}

                            <ThemedText
                                style={[styles.texts, styles.description]}
                            >
                                {idea.content2}
                            </ThemedText>

                            {(idea.content5 === "série" ||
                                idea.content5 === "film") &&
                            idea.content4 ? (
                                <View style={styles.video}>
                                    <Video videoId={idea.content4} />
                                </View>
                            ) : null}

                            {idea.content5 === "livre" && idea.content4 ? (
                                <View style={styles.imageContainer}>
                                    <AdvancedImage
                                        cldImg={cld.image(idea.content4)}
                                        style={styles.image}
                                        resizeMode="contain"
                                    />
                                </View>
                            ) : null}
                        </View>
                    ))}
                </ScrollView>
            </CustomModal>
        </>
    );
};

const styles = StyleSheet.create({
    texts: {
        color: "#22311d",
        textAlign: "left",
        fontFamily: "AnonymousPro",
    },
    title: { textAlign: "left", fontFamily: "AnonymousProBold" },
    contentTitle: {
        marginTop: 20,
        marginBottom: 5,
        fontSize: 20,
    },
    author: {
        marginBottom: 20,
        fontSize: 14,
        fontFamily: "AnonymousProItalic",
    },
    description: {
        marginBottom: 5,
        fontSize: 18,
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
});
