import {
    StyleSheet,
    View,
    Modal,
    Pressable,
    ImageBackground,
} from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedText } from "@/components/ThemedText";
import { FirstLaunch } from "@/components/calendar/FirstLaunch";

interface FirstLaunchModalProps {
    modalVisible: boolean;
    setModalVisible: (modalVisible: boolean) => void;
    insets: EdgeInsets;
}

export const FirstLaunchModal: React.FC<FirstLaunchModalProps> = ({
    modalVisible,
    setModalVisible,
    insets,
}) => {
    return (
        <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(false);
            }}
            statusBarTranslucent={true}
        >
            <ImageBackground
                source={require("@/assets/images/background/background.png")}
                resizeMode="cover"
                style={styles.imageBackground}
            >
                <View style={styles.modalView}>
                    <ThemedText
                        type="modalTitle"
                        style={[styles.modalTitle, { paddingTop: insets.top }]}
                    >
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
            </ImageBackground>
        </Modal>
    );
};

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
    },
    modalView: {
        flex: 1,
        margin: 20,
        alignItems: "center",
    },
    modalTitle: { paddingHorizontal: 15 },

    closeButton: { marginTop: 10 },
});
