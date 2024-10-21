import { StyleSheet, View, Modal, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { FirstLaunch } from "./FirstLaunch";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

interface FirstLaunchModalProps {
    modalVisible: boolean;
    setModalVisible: (modalVisible: boolean) => void;
}

export const FirstLaunchModal: React.FC<FirstLaunchModalProps> = ({
    modalVisible,
    setModalVisible,
}) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(false);
            }}
        >
            <View style={styles.modalView}>
                <ThemedText type="modalTitle">
                    Bienvenue dans votre&nbsp;calendrier de&nbsp;l'avent
                </ThemedText>
                <FirstLaunch />
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
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        margin: 20,
        paddingBottom: 10,
        alignItems: "center",
        backgroundColor: Colors.snow,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    closeButton: { marginTop: 10 },
});
