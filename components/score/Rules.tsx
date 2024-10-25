import { StyleSheet, View, Text, Modal, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomScrollView } from "@/components/utils/custom/ScrollView";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";

interface RulesProps {
    modalVisible: boolean;
    setModalVisible: (modalVisible: boolean) => void;
}

export const Rules: React.FC<RulesProps> = ({
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
                <ThemedText type="modalTitle" style={styles.modalTitle}>
                    Règles pour gagner des points
                </ThemedText>
                <CustomScrollView>
                    <View style={styles.section}>
                        <ThemedText type="sectionText" style={styles.ital}>
                            Chaque jour, vous pouvez accumuler des points pour
                            tenter d'accéder à une surprise qui attend celles et
                            ceux qui auront accumulé assez de points le 25
                            décembre !
                        </ThemedText>
                    </View>

                    <View style={styles.section}>
                        <ThemedText type="sectionSubtitle">
                            🎉 Ouverture du calendrier
                        </ThemedText>
                        <ThemedText type="sectionText">
                            <Text style={styles.bold}> 40 points </Text>
                            vous ont été attribués lors de votre première
                            connexion.
                        </ThemedText>
                    </View>

                    <View style={styles.section}>
                        <ThemedText type="sectionSubtitle">
                            ✨ Ouverture de la case du jour
                        </ThemedText>
                        <ThemedText type="sectionText">
                            Ouvrir la case du jour vous rapporte
                            <Text style={styles.bold}> 25 points </Text>
                            si elle est ouverte le jour même.
                        </ThemedText>
                        <ThemedText type="sectionText">
                            Attention : si vous ouvrez la case en retard, vous
                            ne gagnerez aucun point !
                        </ThemedText>
                    </View>

                    <View style={styles.section}>
                        <ThemedText type="sectionSubtitle">
                            📜 Découverte des contenus
                        </ThemedText>
                        <ThemedText type="sectionText">
                            Chaque jour, explorez jusqu'à 4 types de contenus
                            (une citation, une anecdote, une recommandation, un
                            jeu).
                        </ThemedText>
                        <ThemedText type="sectionText">
                            Pour chaque contenu découvert, vous gagnez
                            <Text style={styles.bold}> 15 points</Text>.
                        </ThemedText>
                        <ThemedText type="sectionText">
                            Si vous les ouvrez en retard, vous ne gagnez que
                            <Text style={styles.bold}> 10 points</Text>.
                        </ThemedText>
                    </View>

                    <View style={styles.section}>
                        <ThemedText type="sectionSubtitle">
                            🎮 Réponse à un jeu
                        </ThemedText>
                        <ThemedText type="sectionText">
                            Pour chaque bonne réponse donnée au jeu du jour (3
                            maximum), vous gagnez
                            <Text style={styles.bold}> 20 points</Text>.
                        </ThemedText>
                        <ThemedText type="sectionText">
                            Si vous participez aux jeux en retard, vous ne
                            gagnez que
                            <Text style={styles.bold}> 10 points</Text>.
                        </ThemedText>
                        <ThemedText type="sectionText">
                            Seuls 12 jours sur 24 vous permettront de gagner des
                            points aux jeux.
                        </ThemedText>
                    </View>

                    <View style={styles.section}>
                        <ThemedText type="sectionSubtitle">
                            🎯 Limite de points par jour
                        </ThemedText>
                        <ThemedText type="sectionText">
                            Vous pouvez ainsi accumuler jusqu'à
                            <Text style={styles.bold}> 130 points </Text>
                            par jour :
                        </ThemedText>
                        <ThemedText type="sectionText">
                            ▪️ <Text style={styles.bold}>25 points</Text> en
                            ouvrant la case du jour
                        </ThemedText>
                        <ThemedText type="sectionText">
                            ▪️ <Text style={styles.bold}>60 points</Text> en
                            découvrant chaque contenus
                        </ThemedText>
                        <ThemedText type="sectionText">
                            ▪️ <Text style={styles.bold}>60 points</Text> en
                            répondant correctement aux jeux
                        </ThemedText>
                    </View>

                    <View style={styles.section}>
                        <ThemedText type="sectionSubtitle">
                            🎅 Objectif atteint
                        </ThemedText>
                        <ThemedText type="sectionText">
                            Et si le 25 décembre vous avez réussi à accumuler au
                            moins
                            <Text style={styles.bold}> 2512 points</Text>...
                            surprise !
                        </ThemedText>
                    </View>
                </CustomScrollView>
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
        marginHorizontal: 20,
        marginVertical: 80,
        paddingBottom: 10,
        alignItems: "center",
        backgroundColor: "white",
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
    modalTitle: { paddingHorizontal: 15, fontSize: 24 },
    section: {
        marginVertical: 15,
    },
    bold: {
        fontFamily: "PoppinsBold",
    },
    ital: {
        fontFamily: "PoppinsItalic",
    },
    closeButton: { marginTop: 10 },
});
