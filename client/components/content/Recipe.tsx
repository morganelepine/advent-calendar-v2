import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomModal } from "@/components/custom-utils/Modal";
import { CustomScrollView } from "@/components/custom-utils/ScrollView";
import { ContentButton } from "@/components/content/ContentButton";
import { CustomMarkdown } from "@/components/custom-utils/Markdown";
import { AdvancedImage } from "cloudinary-react-native";
import { Cloudinary } from "@cloudinary/url-gen";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { URLConfig } from "@cloudinary/url-gen";
import { CloudConfig } from "@cloudinary/url-gen";

let cloudConfig = new CloudConfig({ cloudName: "deauthz29" });
let urlConfig = new URLConfig({ secure: true });

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

    let image = new CloudinaryImage(content.content3, cloudConfig, urlConfig);

    return (
        <>
            <ContentButton
                content={content}
                setModalVisible={setModalVisible}
            />
            <CustomModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                contentType={content.type}
            >
                <CustomScrollView>
                    <View>
                        <ThemedText style={styles.title}>
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
                                <CustomMarkdown style={styles.sourcePhoto}>
                                    {content.content4}
                                </CustomMarkdown>
                            ) : null}
                        </View>

                        <View style={styles.contentContainer}>
                            <ThemedText style={styles.contentTitle}>
                                Ingrédients
                            </ThemedText>
                            <CustomMarkdown style={styles.ingredients}>
                                {content.content2}
                            </CustomMarkdown>
                        </View>

                        <View style={styles.contentContainer}>
                            <ThemedText style={styles.contentTitle}>
                                Recette
                            </ThemedText>
                            <ThemedText style={styles.recipe}>
                                {content.content1}
                            </ThemedText>
                        </View>
                    </View>
                </CustomScrollView>
            </CustomModal>
        </>
    );
};

const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        fontFamily: "AnonymousProBold",
        fontSize: 20,
        marginBottom: 20,
    },
    recipe: {
        textAlign: "left",
    },
    contentContainer: { textAlign: "left", marginTop: 20 },
    contentTitle: {
        fontFamily: "AnonymousProBold",
        textAlign: "left",
        marginBottom: 10,
        fontSize: 22,
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
