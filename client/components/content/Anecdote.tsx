import { useState } from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomModal } from "@/components/Modal";
import { ContentButton } from "@/components/content/ContentButton";

interface AnecdoteProps {
    content: {
        id: number;
        type: "quote" | "anecdote" | "recipe" | "idea" | "game";
        title: string;
        content1: string;
        content2: string;
        content3: string;
        content4: string;
    };
}

export const Anecdote: React.FC<AnecdoteProps> = ({ content }) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <ContentButton
                content={content}
                setModalVisible={setModalVisible}
            />
            <CustomModal
                title={content.title}
                content={content.content1}
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
            >
                <ThemedText type="title" style={styles.title}>
                    Anecdote du jour
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
