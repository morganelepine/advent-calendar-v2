import { useState } from "react";
import { StyleSheet, View, ScrollView, TextStyle } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomModal } from "@/components/custom-utils/Modal";
import { ContentButton } from "@/components/content/ContentButton";
import Markdown from "react-native-markdown-display";
import { AdvancedImage } from "cloudinary-react-native";
import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
    cloud: {
        cloudName: "deauthz29",
    },
});

interface RecipeProps {
    content: {
        id: number;
        type: "quote" | "recipe" | "anecdote" | "idea" | "game";
        title: string;
        content1: string;
        content2: string;
        content3: string;
        content4: string;
        content5: string;
    };
}

export const Recipe: React.FC<RecipeProps> = ({ content }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const image = cld.image(content.content3);

    return (
        <>
            <ContentButton
                content={content}
                setModalVisible={setModalVisible}
            />
            <CustomModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
            >
                <ScrollView>
                    <ThemedText type="modalTitle">Recette du jour</ThemedText>

                    <View>
                        <ThemedText style={[styles.texts, styles.title]}>
                            {content.title}
                        </ThemedText>

                        <View>
                            {content.content3 ? (
                                <AdvancedImage
                                    cldImg={image}
                                    style={styles.image}
                                />
                            ) : null}

                            {content.content4 ? (
                                <Markdown
                                    style={{
                                        body: [
                                            styles.texts,
                                            styles.sourcePhoto,
                                        ] as TextStyle,
                                    }}
                                >
                                    {content.content4}
                                </Markdown>
                            ) : null}
                        </View>

                        <View style={styles.contentContainer}>
                            <ThemedText
                                style={[styles.texts, styles.contentTitle]}
                            >
                                Ingrédients
                            </ThemedText>
                            <Markdown
                                style={{
                                    body: [
                                        styles.texts,
                                        styles.ingredients,
                                    ] as TextStyle,
                                }}
                            >
                                {content.content2}
                            </Markdown>
                        </View>

                        <View style={styles.contentContainer}>
                            <ThemedText
                                style={[styles.texts, styles.contentTitle]}
                            >
                                Recette
                            </ThemedText>
                            <ThemedText style={[styles.texts, styles.recipe]}>
                                {content.content1}
                            </ThemedText>
                        </View>
                    </View>
                </ScrollView>
            </CustomModal>
        </>
    );
};

const styles = StyleSheet.create({
    texts: {
        color: "#22311d",
        fontFamily: "AnonymousPro",
    },
    title: {
        textAlign: "center",
        fontFamily: "AnonymousProBold",
        marginBottom: 20,
    },
    recipe: {
        fontSize: 18,
        textAlign: "left",
    },
    contentContainer: { textAlign: "left", marginTop: 20 },
    contentTitle: {
        fontFamily: "AnonymousProBold",
        textAlign: "left",
        marginBottom: 10,
    },
    ingredients: {
        marginBottom: 5,
        fontSize: 16,
        textAlign: "left",
    },
    image: {
        width: "100%",
        aspectRatio: 1,
        height: undefined,
    },
    sourcePhoto: {
        fontSize: 12,
    },
});
