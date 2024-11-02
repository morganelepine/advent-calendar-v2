import { StyleSheet, View, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

interface HeaderProps {
    setModalVisible: (modalVisible: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ setModalVisible }) => {
    return (
        <View style={styles.header}>
            <Pressable
                onPress={() => setModalVisible(true)}
                style={styles.button}
            >
                <ThemedText style={styles.buttonText}>
                    Voir les règles
                </ThemedText>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingTop: 50,
        paddingBottom: 10,
        paddingHorizontal: 20,
        width: "100%",
    },
    button: {
        borderRadius: 50,
        backgroundColor: Colors.red,
        paddingHorizontal: 20,
        height: 48,
        paddingTop: 3,
        alignSelf: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: Colors.snow,
        fontSize: 14,
        fontFamily: "PoppinsBold",
    },
});
