import { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ModalWithText } from "@/components/utils/custom/ModalWithText";
import { ContentButton } from "@/components/content/ContentButton";
import { Video } from "@/components/utils/custom/Video";
import { Content } from "@/interfaces/contentInterface";
import cld from "@/config/cloudinaryConfig";

interface AnecdoteProps {
    content: Content;
    dayId: number;
}

export const Anecdote: React.FC<AnecdoteProps> = ({ content, dayId }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const backgroundImage = cld.image("s-inspirer_zwls2a");

    return (
        <>
            <ContentButton
                content={content}
                setModalVisible={setModalVisible}
                dayId={dayId}
                backgroundImage={backgroundImage}
            />

            <ModalWithText
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                contentType={content.type}
                backgroundImage={backgroundImage}
            >
                <ScrollView
                    persistentScrollbar={true} // Android only
                >
                    <ThemedText type="modalSubtitle">
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
                            <ThemedText style={styles.video}>
                                Et en version moins classique...
                            </ThemedText>
                            <Video videoId={content.content4} />
                        </>
                    ) : null}
                </ScrollView>
            </ModalWithText>
        </>
    );
};

const styles = StyleSheet.create({
    anecdote: {
        marginVertical: 20,
        textAlign: "left",
    },
    video: {
        fontSize: 14,
        fontFamily: "PoppinsItalic",
        marginVertical: 10,
    },
});
