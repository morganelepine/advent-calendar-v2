import { useState } from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomModal } from "@/components/Modal";
import { ContentButton } from "@/components/content/ContentButton";

interface RecipeProps {
    content: {
        id: number;
        type: "quote" | "tip" | "recipe" | "video" | "game";
        title: string;
        content: string;
    };
}

export const Recipe: React.FC<RecipeProps> = ({ content }) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <ContentButton
                content={content}
                setModalVisible={setModalVisible}
            />
            <CustomModal
                title={content.title}
                content={content.content}
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
            >
                <ThemedText type="title" style={styles.title}>
                    Recette du jour
                </ThemedText>
            </CustomModal>
        </>
    );
};

const styles = StyleSheet.create({
    title: {
        color: "#22311d",
        marginTop: 10,
    },
});
