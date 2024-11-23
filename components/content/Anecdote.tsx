import { useState } from "react";
import { StyleSheet, ScrollView, Text } from "react-native";
import { Href } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ModalWithText } from "@/components/utils/custom/ModalWithText";
import { CustomMarkdown } from "@/components/utils/custom/Markdown";
import { ExternalLink } from "@/components/utils/ExternalLink";
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

                    <CustomMarkdown style={styles.anecdote}>
                        {content.content1}
                    </CustomMarkdown>

                    {content.content4 ? (
                        <Video videoId={content.content4} />
                    ) : null}

                    {content.content5 ? (
                        <>
                            <ThemedText style={styles.video}>
                                Et en version moins classique...
                            </ThemedText>
                            <Video videoId={content.content5} />
                        </>
                    ) : null}

                    {content.content2 ? (
                        <ExternalLink href={content.content3 as Href}>
                            <ThemedText style={styles.source}>
                                Source :{" "}
                                <Text
                                    style={{ textDecorationLine: "underline" }}
                                >
                                    {content.content2}
                                </Text>
                            </ThemedText>
                        </ExternalLink>
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
    source: {
        fontSize: 12,
        fontFamily: "PoppinsItalic",
    },
    video: {
        fontSize: 14,
        fontFamily: "PoppinsItalic",
        marginVertical: 10,
    },
});
