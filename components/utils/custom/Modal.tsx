import React from "react";
import { StyleSheet, View, Modal, ImageBackground } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ContentType } from "@/enums/enums";
import { CloseModalButton } from "@/components/utils/buttons/CloseModalButton";
import cld from "@/config/cloudinaryConfig";

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
    const backgroundImage = cld.image("ofcjdqqjsl6qecpcn8xh");

    const getTitle = () => {
        switch (contentType) {
            case ContentType.Game:
                return "Jeu du jour";
            case ContentType.Quiz:
                return "Quiz du jour";
            default:
                return "Jeu du jour";
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
                source={{ uri: backgroundImage.toURL() }}
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

                        <CloseModalButton
                            onPress={onClose}
                            style={{ backgroundColor: Colors.pink }}
                        >
                            <Ionicons
                                name={"close-outline"}
                                size={35}
                                color={Colors.green}
                            />
                        </CloseModalButton>
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
        width: "100%",
    },
    modalTitle: { paddingHorizontal: 15 },
});
