import { StyleSheet, View, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";

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
        paddingTop: 40,
        paddingBottom: 15,
        paddingHorizontal: 20,
        width: "100%",
    },
    button: {
        borderRadius: 50,
        backgroundColor: "#d6ae72",
        paddingHorizontal: 10,
        paddingTop: 5,
        paddingBottom: 3,
        alignSelf: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 12,
        fontFamily: "PoppinsBold",
    },
});
