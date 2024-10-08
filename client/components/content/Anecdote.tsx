import { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomModal } from "@/components/custom-utils/Modal";
import { ContentButton } from "@/components/content/ContentButton";
import { Video } from "@/components/custom-utils/Video";

interface AnecdoteProps {
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

export const Anecdote: React.FC<AnecdoteProps> = ({ content }) => {
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
                    <ThemedText type="modalTitle">Anecdote du jour</ThemedText>

                    <View>
                        <ThemedText style={styles.title}>
                            {content.title}
                        </ThemedText>

                        <ThemedText style={styles.anecdote}>
                            {content.content1}
                        </ThemedText>

                        {content.content3 ? (
                            <Video videoId={content.content3} />
                        ) : null}

                        {content.content4 ? (
                            <>
                                <ThemedText style={styles.video2}>
                                    Et en version moins classique...
                                </ThemedText>
                                <Video videoId={content.content4} />
                            </>
                        ) : null}
                    </View>
                </ScrollView>
            </CustomModal>
        </>
    );
};

const styles = StyleSheet.create({
    title: { textAlign: "left", fontFamily: "AnonymousProBold" },
    anecdote: {
        marginVertical: 20,
        fontSize: 18,
        textAlign: "left",
    },
    author: {
        marginBottom: 5,
        fontSize: 20,
        fontFamily: "AnonymousProItalic",
    },
    video2: {
        fontSize: 15,
        fontFamily: "AnonymousProItalic",
        marginVertical: 10,
    },
});
