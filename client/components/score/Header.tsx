import { StyleSheet, View, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";

interface HeaderProps {
    setModalVisible: (modalVisible: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ setModalVisible }) => {
    return (
        <View style={styles.header}>
            <ThemedText type="modalTitle">Scores</ThemedText>
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
        justifyContent: "space-between",
        paddingHorizontal: 25,
        width: "100%",
    },
    button: {
        borderRadius: 50,
        backgroundColor: "#b52936",
        paddingHorizontal: 10,
        paddingTop: 5,
        paddingBottom: 3,
        alignSelf: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 12,
    },
});
