import { StyleSheet, View, Modal, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";

interface WrongGiftModalProps {
    modalVisible: boolean;
    setModalVisible: (modalVisible: boolean) => void;
}

export const WrongGiftModal: React.FC<WrongGiftModalProps> = ({
    modalVisible,
    setModalVisible,
}) => {
    const onClose = () => {
        setModalVisible(false);
    };
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={onClose}
            statusBarTranslucent={true}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <ThemedText style={styles.title}>
                        La surprise ne se cache pas ici...
                    </ThemedText>
                    <ThemedText>Ouvrez un autre cadeau !</ThemedText>
                    <Pressable
                        onPress={() => {
                            setModalVisible(false);
                        }}
                        style={styles.closeButton}
                    >
                        <Ionicons
                            name={"close-outline"}
                            size={35}
                            color={Colors.blue}
                        />
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
        height: "25%",
        width: "80%",
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 30,
        elevation: 5,
    },
    title: {
        color: Colors.blue,
        fontSize: 24,
        fontFamily: "PallyBold",
        textAlign: "center",
        letterSpacing: 2,
        marginVertical: 20,
    },
    closeButton: {
        marginTop: 10,
        height: 48,
        width: 48,
        justifyContent: "center",
        alignItems: "center",
    },
});
