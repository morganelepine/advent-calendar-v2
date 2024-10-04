import { useState } from "react";
import { StyleSheet, View, ScrollView, TextStyle } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomModal } from "@/components/Modal";
import { ContentButton } from "@/components/content/ContentButton";
import { Video } from "@/components/Video";
import Markdown from "react-native-markdown-display";

interface IdeaProps {
    content: {
        id: number;
        type: "quote" | "anecdote" | "recipe" | "idea" | "game";
        title: string;
        content1: string;
        content2: string;
        content3: string;
        content4: string;
    };
}

export const Idea: React.FC<IdeaProps> = ({ content }) => {
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
                    <ThemedText type="modalTitle">Idée du jour</ThemedText>

                    <View>
                        <ThemedText style={[styles.texts, styles.title]}>
                            {content.title}
                        </ThemedText>

                        <Markdown
                            style={{
                                body: [
                                    styles.texts,
                                    styles.contentTitle,
                                ] as TextStyle,
                            }}
                        >
                            {content.content1}
                        </Markdown>

                        {content.content3 ? (
                            <ThemedText style={[styles.texts, styles.author]}>
                                de {content.content3}
                            </ThemedText>
                        ) : null}

                        <ThemedText style={[styles.texts, styles.description]}>
                            {content.content2}
                        </ThemedText>

                        {content.content4 ? (
                            <View style={styles.video}>
                                <Video videoId={content.content4} />
                            </View>
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
        textAlign: "left",
        fontFamily: "AnonymousPro",
    },
    title: { textAlign: "left", fontFamily: "AnonymousProBold" },
    contentTitle: {
        marginTop: 20,
        marginBottom: 5,
        fontSize: 18,
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
});
