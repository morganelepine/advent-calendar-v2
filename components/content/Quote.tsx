import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomModal } from "@/components/custom-utils/Modal";
import { ContentButton } from "@/components/content/ContentButton";

interface QuoteProps {
    content: {
        id: number;
        dayNumber: number;
        type: string;
        title: string;
        content1: string;
        content2: string;
        content3: string;
        content4: string;
        content5: string;
    };
    dayId: number | null;
}

export const Quote: React.FC<QuoteProps> = ({ content, dayId }) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <ContentButton
                content={content}
                setModalVisible={setModalVisible}
                dayId={dayId}
            />

            <CustomModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                contentType={content.type}
            >
                <ThemedText style={{ fontStyle: "italic", fontSize: 12 }}>
                    [ Histoire de Vic à venir pour remplacer la citation 🤞 ]
                </ThemedText>
                <View style={{ paddingHorizontal: 20 }}>
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
