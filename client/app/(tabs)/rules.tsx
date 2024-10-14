import { useRef } from "react";
import {
    StyleSheet,
    View,
    ScrollView,
    ImageBackground,
    Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { CustomButton } from "@/components/custom-utils/Buttons/Button";
import { ScrollToTopButton } from "@/components/custom-utils/Buttons/ScrollToTopButton";
import { ThemedText } from "@/components/ThemedText";

export default function RulesScreen() {
    const handleStart = () => {
        router.push("/calendar");
    };

    const scrollViewRef = useRef<ScrollView>(null);

    return (
        <ImageBackground
            source={require("@/assets/images/sapin.jpg")}
            resizeMode="cover"
            style={styles.imageBackground}
        >
            <View style={[styles.background]} />

            <SafeAreaView style={styles.safeArea}>
                <ScrollView ref={scrollViewRef} style={styles.container}>
                    <ThemedText type="modalTitle">
                        Règles pour gagner des points
                    </ThemedText>

                    <View style={styles.section}>
                        <ThemedText style={[styles.paragraph, styles.ital]}>
                            Chaque jour, vous pouvez accumuler des points pour
                            tenter d'accéder à une surprise exclusive qui attend
                            celles et ceux qui auront accumulé assez de points
                            le 25 décembre !
                        </ThemedText>
                    </View>

                    <View style={styles.section}>
                        <ThemedText type="subtitle" style={styles.sectionTitle}>
                            🎉 Ouverture du calendrier
                        </ThemedText>
                        <ThemedText style={styles.paragraph}>
                            <Text style={styles.bold}> 40 points </Text>
                            vous ont été attribués lors de votre première
                            connexion.
                        </ThemedText>
                    </View>

                    <View style={styles.section}>
                        <ThemedText type="subtitle" style={styles.sectionTitle}>
                            ✨ Ouverture de la case du jour
                        </ThemedText>
                        <ThemedText style={styles.paragraph}>
                            Ouvrir la case du jour vous rapporte
                            <Text style={styles.bold}> 25 points </Text>
                            si elle est ouverte le jour même.
                        </ThemedText>
                        <ThemedText style={styles.paragraph}>
                            Attention : si vous ouvrez la case en retard, vous
                            ne gagnerez aucun point !
                        </ThemedText>
                    </View>

                    <View style={styles.section}>
                        <ThemedText type="subtitle" style={styles.sectionTitle}>
                            📜 Découverte des contenus
                        </ThemedText>
                        <ThemedText style={styles.paragraph}>
                            Chaque jour, explorez jusqu'à 5 types de contenus
                            (une citation, une recette, une anecdote, une
                            recommandation, un jeu).
                        </ThemedText>
                        <ThemedText style={styles.paragraph}>
                            Pour chaque contenu découvert, vous gagnez
                            <Text style={styles.bold}> 12 points</Text>.
                        </ThemedText>
                        <ThemedText style={styles.paragraph}>
                            Si vous les ouvrez en retard, vous ne gagnez que
                            <Text style={styles.bold}> 6 points</Text>.
                        </ThemedText>
                    </View>

                    <View style={styles.section}>
                        <ThemedText type="subtitle" style={styles.sectionTitle}>
                            🎮 Réponse à un jeu
                        </ThemedText>
                        <ThemedText style={styles.paragraph}>
                            Pour chaque bonne réponse donnée au jeu du jour (3
                            maximum), vous gagnez
                            <Text style={styles.bold}>12 points</Text>.
                        </ThemedText>
                        <ThemedText style={styles.paragraph}>
                            Si vous participez aux jeux en retard, vous ne
                            gagnez que
                            <Text style={styles.bold}> 6 points</Text>.
                        </ThemedText>
                        <ThemedText style={styles.paragraph}>
                            Seuls 12 jours sur 24 vous permettront de gagner des
                            points aux jeux.
                        </ThemedText>
                    </View>

                    <View style={styles.section}>
                        <ThemedText type="subtitle" style={styles.sectionTitle}>
                            🎯 Limite de points par jour
                        </ThemedText>
                        <ThemedText style={styles.paragraph}>
                            Vous pouvez ainsi accumuler jusqu'à
                            <Text style={styles.bold}> 121 points </Text>
                            par jour :
                        </ThemedText>
                        <ThemedText style={styles.paragraph}>
                            ▪️ <Text style={styles.bold}>25 points</Text> en
                            ouvrant la case du jour
                        </ThemedText>
                        <ThemedText style={styles.paragraph}>
                            ▪️ <Text style={styles.bold}>60 points</Text> en
                            découvrant chaque contenus
                        </ThemedText>
                        <ThemedText style={styles.paragraph}>
                            ▪️ <Text style={styles.bold}>36 points</Text> en
                            répondant correctement aux jeux
                        </ThemedText>
                    </View>

                    <View style={styles.section}>
                        <ThemedText type="subtitle" style={styles.sectionTitle}>
                            🎅 Objectif atteint
                        </ThemedText>
                        <ThemedText style={styles.paragraph}>
                            Et si le 25 décembre vous avez réussi à atteindre
                            les <Text style={styles.bold}>2512 points</Text>{" "}
                            maximum... surprise !
                        </ThemedText>
                    </View>

                    <CustomButton onPress={handleStart}>
                        Retour au calendrier 🎄
                    </CustomButton>
                </ScrollView>
                <ScrollToTopButton ref={scrollViewRef}></ScrollToTopButton>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    background: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "white",
        opacity: 0.9,
    },
    safeArea: {
        flex: 1,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    paragraph: {
        textAlign: "left",
    },
    section: {
        marginVertical: 15,
    },
    sectionTitle: {
        marginBottom: 10,
        color: "#22311d",
        textAlign: "left",
        fontSize: 18,
    },
    bold: {
        fontFamily: "PoppinsBold",
    },
    ital: {
        fontFamily: "PoppinsItalic",
        textAlign: "center",
    },
});
