import React from "react";
import { StyleSheet, View, Modal, Pressable, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { ContentType } from "@/enums/enums";
import ParallaxScrollView from "@/components/utils/ParallaxScrollView";

interface ModalWithTextProps {
    isVisible: boolean;
    onClose: () => void;
    contentType: string;
    backgroundImage: number;
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
            case ContentType.Quote:
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
            <Pressable onPress={onClose} style={styles.button}>
                <View style={styles.buttonBackground} />
                <Ionicons
                    name={"close-outline"}
                    size={25}
                    color={Colors.green}
                />
            </Pressable>

            <ParallaxScrollView
                headerBackgroundColor={{
                    light: Colors.snow,
                    dark: Colors.darkBlue,
                }}
                headerImage={
                    <Image
                        source={backgroundImage}
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
    button: {
        padding: 6,
        alignSelf: "center",
        position: "absolute",
        top: 30,
        right: 20,
        zIndex: 1,
    },
    buttonBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.snow,
        opacity: 0.6,
        borderRadius: 50,
    },
});
