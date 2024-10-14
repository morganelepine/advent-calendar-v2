import React from "react";
import {
    StyleSheet,
    View,
    Modal,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";

interface CustomModalProps {
    isVisible: boolean;
    onClose: () => void;
    backgroundImage?: any;
    contentType: string;
    children?: React.ReactNode;
}

export const CustomModal: React.FC<CustomModalProps> = ({
    isVisible,
    onClose,
    backgroundImage = require("@/assets/images/sapin-lumineux.jpg"),
    contentType,
    children,
}) => {
    const insets = useSafeAreaInsets();

    const getTitle = () => {
        switch (contentType) {
            case "quote":
                return "Citation du jour";
            case "recipe":
                return "Recette du jour";
            case "ideas":
                return "Recommandation du jour";
            case "anecdote":
                return "Anecdote du jour";
            case "game":
                return "Jeu du jour";
            case "quiz":
                return "Quiz du jour";
            case "rules":
                return "Règles pour gagner des points";
        }
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <ImageBackground
                source={backgroundImage}
                resizeMode="cover"
                style={styles.imageBackground}
            >
                <View style={styles.centeredView}>
                    <View
                        style={[
                            styles.modalView,
                            { paddingTop: insets.bottom },
                        ]}
                    >
                        <View style={styles.background} />

                        <ThemedText type="modalTitle" style={styles.modalTitle}>
                            {getTitle()}
                        </ThemedText>

                        {children}

                        <TouchableOpacity
                            onPress={onClose}
                            style={styles.closeButton}
                        >
                            <Ionicons
                                name={"close-outline"}
                                size={35}
                                color="#165d4b"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    imageBackground: {
        flex: 1,
    },
    background: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "white",
        opacity: 0.9,
        borderRadius: 50,
    },
    modalView: {
        margin: 15,
        width: "93%",
        paddingHorizontal: 5,
        paddingBottom: 10,
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
    },
    modalTitle: { paddingHorizontal: 15 },
    closeButton: { marginTop: 10 },
});
