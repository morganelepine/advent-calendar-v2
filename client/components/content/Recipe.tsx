import { useState } from "react";
import { StyleSheet, View, ScrollView, TextStyle } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomModal } from "@/components/custom-utils/Modal";
import { ContentButton } from "@/components/content/ContentButton";
import Markdown from "react-native-markdown-display";

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

                        <ThemedText style={[styles.texts, styles.recipe]}>
                            {content.content1}
                        </ThemedText>

                        <View style={styles.ingredientsContainer}>
                            <ThemedText
                                style={[styles.texts, styles.ingredientsTitle]}
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
    title: { textAlign: "left", fontFamily: "AnonymousProBold" },
    recipe: {
        marginVertical: 20,
        fontSize: 18,
        textAlign: "left",
    },
    ingredientsContainer: { textAlign: "left", marginVertical: 20 },
    ingredientsTitle: {
        fontFamily: "AnonymousProBold",
        textAlign: "left",
        marginBottom: 10,
    },
    ingredients: {
        marginBottom: 5,
        fontSize: 16,
        textAlign: "left",
    },
    sourcePhoto: {
        fontSize: 12,
        marginVertical: 10,
    },
});
