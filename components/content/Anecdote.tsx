import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomModal } from "@/components/utils/custom/Modal";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import { ContentButton } from "@/components/content/ContentButton";
import { Video } from "@/components/utils/custom/Video";
import { Content } from "@/interfaces/contentInterface";

interface AnecdoteProps {
    content: Content;
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
            />
            <CustomModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                contentType={content.type}
            >
                <CustomScrollView>
                    <View>
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
                    </View>
                </CustomScrollView>
            </CustomModal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
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
