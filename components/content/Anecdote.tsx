import { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ModalWithText } from "@/components/utils/custom/ModalWithText";
import { ContentButton } from "@/components/content/ContentButton";
import { Video } from "@/components/utils/custom/Video";

interface AnecdoteProps {
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
    dayId: number;
}

export const Anecdote: React.FC<AnecdoteProps> = ({ content, dayId }) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <ContentButton
                content={content}
                setModalVisible={setModalVisible}
                dayId={dayId}
                backgroundImage={require("@/assets/images/content-background/s-inspirer.jpg")}
            />

            <ModalWithText
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                contentType={content.type}
                backgroundImage={require("@/assets/images/content-background/s-inspirer.jpg")}
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
