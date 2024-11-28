import { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ModalWithText } from "@/components/utils/custom/ModalWithText";
import { ContentButton } from "@/components/content/ContentButton";
import { Content } from "@/interfaces/contentInterface";
import cld from "@/config/cloudinaryConfig";

interface StoryProps {
    content: Content;
    dayId: number;
}

export const Story: React.FC<StoryProps> = ({ content, dayId }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const backgroundImage = cld.image("s-instruire_xybqas");

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
                    style={{ width: "100%" }}
                >
                    <ThemedText type="modalSubtitle">
                        {content.content1}
                    </ThemedText>

                    <ThemedText style={styles.text}>
                        {content.content2}
                    </ThemedText>

                    <ThemedText style={styles.end}>
                        La suite demain...
                    </ThemedText>
                </ScrollView>
            </ModalWithText>
        </>
    );
};

const styles = StyleSheet.create({
    text: {
        marginVertical: 20,
        textAlign: "left",
    },
    end: {
        paddingTop: 20,
        fontSize: 14,
        fontFamily: "PoppinsItalic",
    },
});
