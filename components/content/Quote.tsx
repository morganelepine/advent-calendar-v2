import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomModal } from "@/components/utils/custom/Modal";
import { ContentButton } from "@/components/content/ContentButton";
import { Content } from "@/interfaces/contentInterface";
import cld from "@/config/cloudinaryConfig";

interface QuoteProps {
    content: Content;
    dayId: number;
}

export const Quote: React.FC<QuoteProps> = ({ content, dayId }) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <ContentButton
                content={content}
                setModalVisible={setModalVisible}
                dayId={dayId}
                backgroundImage={cld.image("s-inspirer_zwls2a")}
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
