import React from "react";
import {
    StyleSheet,
    View,
    Modal,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedText } from "@/components/ThemedText";

interface CustomModalProps {
    title: string;
    content: string;
    isVisible: boolean;
    onClose: () => void;
    backgroundImage?: any;
    children?: React.ReactNode;
}

export const CustomModal: React.FC<CustomModalProps> = ({
    title,
    content,
    isVisible,
    onClose,
    backgroundImage = require("@/assets/images/sapin-lumineux.jpg"),
    children,
}) => {
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
                    <View style={styles.modalView}>
                        <View style={styles.background} />

                        {/*Catégorie: "Anecdote du jour"*/}
                        {children}

                        <View>
                            {title ? (
                                <ThemedText
                                    type="subtitle"
                                    style={styles.subTitle}
                                >
                                    {title}
                                </ThemedText>
                            ) : null}

                            <ThemedText style={styles.content}>
                                {content}
                            </ThemedText>
                        </View>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons
                                name={"close-outline"}
                                size={35}
                                color="#22311d"
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
        opacity: 0.6,
        borderRadius: 50,
    },
    modalView: {
        borderRadius: 50,
        margin: 15,
        padding: 25,
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
    },
    subTitle: {
        color: "#22311d",
        marginBottom: 20,
    },
    content: {
        color: "#22311d",
        marginBottom: 20,
    },
});
