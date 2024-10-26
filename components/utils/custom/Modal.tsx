import React from "react";
import {
    StyleSheet,
    View,
    Modal,
    Pressable,
    ImageBackground,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CustomModalProps {
    isVisible: boolean;
    onClose: () => void;
    contentType: string;
    children?: React.ReactNode;
}

export const CustomModal: React.FC<CustomModalProps> = ({
    isVisible,
    onClose,
    contentType,
    children,
}) => {
    const insets = useSafeAreaInsets();

    const getTitle = () => {
        switch (contentType) {
            case "quote":
                return "Citation du jour";
            case "ideas":
                return "Idée du jour";
            case "anecdote":
                return "Anecdote du\u00A0jour";
            case "game":
                return "Jeu du jour";
            case "quiz":
                return "Quiz du jour";
            default:
                return "Contenu du jour";
        }
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
            statusBarTranslucent={true}
        >
            <ImageBackground
                source={require("@/assets/images/background/modal-background.png")}
                resizeMode="cover"
                style={styles.imageBackground}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <ThemedText
                            type="modalTitle"
                            style={[
                                styles.modalTitle,
                                { paddingTop: insets.top },
                            ]}
                        >
                            {getTitle()}
                        </ThemedText>

                        {children}

                        <Pressable onPress={onClose} style={styles.closeButton}>
                            <Ionicons
                                name={"close-outline"}
                                size={35}
                                color={Colors.blue}
                            />
                        </Pressable>
                    </View>
                </View>
            </ImageBackground>
        </Modal>
    );
};

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
    },
    modalTitle: { paddingHorizontal: 15 },
    closeButton: { marginTop: 10 },
});
