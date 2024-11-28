import React from "react";
import { StyleSheet, View, Modal, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { ContentType } from "@/enums/enums";
import ParallaxScrollView from "@/components/utils/ParallaxScrollView";
import { CloseModalButton } from "@/components/utils/buttons/CloseModalButton";
import { AdvancedImage } from "cloudinary-react-native";
import { CloudinaryImage } from "@cloudinary/url-gen";

interface ModalWithTextProps {
    isVisible: boolean;
    onClose: () => void;
    contentType: string;
    backgroundImage: CloudinaryImage;
    children?: React.ReactNode;
}

export const ModalWithText: React.FC<ModalWithTextProps> = ({
    isVisible,
    onClose,
    contentType,
    backgroundImage,
    children,
}) => {
    const getTitle = () => {
        switch (contentType) {
            case ContentType.Story:
                return "Histoire du jour";
            case ContentType.Anecdote:
                return "Anecdote du\u00A0jour";
            case ContentType.Idea:
                return "Idée du jour";
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
            <CloseModalButton
                onPress={onClose}
                style={{ backgroundColor: Colors.snow }}
            >
                <Ionicons
                    name={"close-outline"}
                    size={35}
                    color={Colors.green}
                />
            </CloseModalButton>

            <ParallaxScrollView
                headerBackgroundColor={{
                    light: Colors.snow,
                    dark: Colors.darkBlue,
                }}
                headerImage={
                    <AdvancedImage
                        cldImg={backgroundImage}
                        style={styles.headerImage}
                        resizeMode="cover"
                    />
                }
            >
                <View style={styles.modalView}>
                    <ThemedText type="modalTitle">{getTitle()}</ThemedText>

                    {children}
                </View>
            </ParallaxScrollView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    headerImage: {
        height: "100%",
        width: "100%",
    },
    modalView: {
        paddingBottom: 10,
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
    },
});
