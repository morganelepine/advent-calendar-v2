import React from "react";
import {
    StyleSheet,
    View,
    Modal,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface CustomModalProps {
    isVisible: boolean;
    onClose: () => void;
    backgroundImage?: any;
    children?: React.ReactNode;
}

export const CustomModal: React.FC<CustomModalProps> = ({
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

                        {children}

                        <TouchableOpacity
                            onPress={onClose}
                            style={styles.closeButton}
                        >
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
        opacity: 0.75,
        borderRadius: 50,
    },
    modalView: {
        margin: 15,
        paddingHorizontal: 25,
        // paddingTop: 20,
        paddingBottom: 10,
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
    },
    closeButton: { marginTop: 10 },
});
