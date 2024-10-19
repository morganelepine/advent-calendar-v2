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
        justifyContent: "flex-end",
        paddingTop: 40,
        paddingBottom: 15,
        paddingHorizontal: 20,
        width: "100%",
    },
    button: {
        borderRadius: 50,
        backgroundColor: Colors.pink,
        paddingHorizontal: 10,
        paddingTop: 5,
        paddingBottom: 3,
        alignSelf: "center",
    },
    buttonText: {
        color: Colors.blue,
        fontSize: 12,
        fontFamily: "PoppinsBold",
    },
});
