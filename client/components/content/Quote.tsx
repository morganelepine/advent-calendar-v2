import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomModal } from "@/components/custom-utils/Modal";
import { ContentButton } from "@/components/content/ContentButton";

interface QuoteProps {
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

export const Quote: React.FC<QuoteProps> = ({ content }) => {
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
                <ThemedText type="modalTitle">Citation du jour</ThemedText>
                <View>
                    <ThemedText style={styles.quote}>
                        {content.content1}
                    </ThemedText>

                    <ThemedText style={styles.author}>
                        {content.content2}
                    </ThemedText>

                    {content.content3 ? (
                        <ThemedText style={styles.source}>
                            ({content.content3})
                        </ThemedText>
                    ) : null}
                </View>
            </CustomModal>
        </>
    );
};

const styles = StyleSheet.create({
    quote: {
        marginBottom: 30,
        fontSize: 28,
    },
    author: {
        marginBottom: 5,
        fontSize: 20,
        fontFamily: "AnonymousProItalic",
    },
    source: { fontSize: 14, fontFamily: "AnonymousProItalic" },
});
