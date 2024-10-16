import { StyleSheet, View, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomModal } from "@/components/custom-utils/Modal";

interface ModalProps {
    modalVisible: boolean;
    modalMessage: string;
    onClose: () => void;
    words: string[];
    currentWord: string;
    currentWordIndex: number;
    handleNextQuestion: () => void;
}

export const Modal: React.FC<ModalProps> = ({
    modalVisible,
    modalMessage,
    onClose,
    words,
    currentWord,
    currentWordIndex,
    handleNextQuestion,
}) => {
    return (
        <CustomModal
            isVisible={modalVisible}
            onClose={() => onClose()}
            contentType={"game"}
        >
            <View style={styles.modal}>
                <ThemedText>{modalMessage}</ThemedText>
                <ThemedText>Le mot à trouver était {currentWord}</ThemedText>
                {currentWordIndex < words.length - 1 ? (
                    <Pressable onPress={handleNextQuestion}>
                        <ThemedText style={[styles.modalButton]}>
                            Partie suivante
                        </ThemedText>
                    </Pressable>
                ) : (
                    <ThemedText style={styles.modalFinalText}>
                        Ce jeu de Noël est terminé 🎅
                    </ThemedText>
                )}
            </View>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: "center",
        flex: 1,
        gap: 20,
        paddingHorizontal: 10,
    },
    modalButton: {
        color: "#136F63",
        borderColor: "#136F63",
        borderWidth: 2,
        margin: 5,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingTop: 14,
        paddingBottom: 8,
        fontFamily: "PoppinsBold",
    },
    modalFinalText: {
        fontFamily: "AnonymousProBold",
        fontSize: 14,
        marginTop: 10,
    },
});
