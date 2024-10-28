import { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ModalWithText } from "@/components/utils/custom/ModalWithText";
import { ContentButton } from "@/components/content/ContentButton";
import cld from "@/config/cloudinaryConfig";

interface StoryProps {
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
                        Chapitre {dayId}
                    </ThemedText>

                    <ThemedText style={styles.anecdote}>
                        Histoire de Vic à venir
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
    anecdote: {
        marginVertical: 20,
        textAlign: "left",
    },
    end: {
        paddingTop: 20,
        fontSize: 14,
        fontFamily: "PoppinsItalic",
    },
});
