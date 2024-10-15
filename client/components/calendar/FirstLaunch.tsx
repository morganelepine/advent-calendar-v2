import { useRef } from "react";
import { StyleSheet, View, ScrollView, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { CustomButton } from "@/components/custom-utils/Buttons/Button";
import { ScrollToTopButton } from "@/components/custom-utils/Buttons/ScrollToTopButton";
import { ThemedText } from "@/components/ThemedText";

export const FirstLaunch = () => {
    const handleStart = () => {
        router.push("/calendar");
    };

    const scrollViewRef = useRef<ScrollView>(null);

    return (
        <ImageBackground
            source={require("@/assets/images/canva-bottom.png")}
            resizeMode="cover"
            style={styles.imageBackground}
        >
            <SafeAreaView style={styles.safeArea}>
                <ThemedText type="modalTitle" style={styles.title}>
                    Bienvenue dans votre calendrier de l'avent
                </ThemedText>

                <ScrollView
                    ref={scrollViewRef}
                    style={styles.container}
                    persistentScrollbar={true} // Android only
                >
                    <View style={styles.section}>
                        <ThemedText style={[styles.paragraph, styles.ital]}>
                            Chaque jour, plongez dans la magie de Noël et
                            découvrez :
                        </ThemedText>
                    </View>

                    <View style={styles.section}>
                        <ThemedText type="subtitle" style={styles.sectionTitle}>
                            ✨ Combien de nuits avant Noël ?
                        </ThemedText>
                        <ThemedText style={styles.paragraph}>
                            Un compte à rebours pour vous faire patienter
                            jusqu'au 25 décembre.
                        </ThemedText>
                    </View>

                    <View style={styles.section}>
                        <ThemedText type="subtitle" style={styles.sectionTitle}>
                            🎄 Une citation festive
                        </ThemedText>
                        <ThemedText style={styles.paragraph}>
                            Une citation inspirante vous plonger dans l'esprit
                            de Noël.
                        </ThemedText>
                    </View>

                    <View style={styles.section}>
                        <ThemedText type="subtitle" style={styles.sectionTitle}>
                            🎅 Une anecdote de Noël
                        </ThemedText>
                        <ThemedText style={styles.paragraph}>
                            Une anecdote sur les traditions et l’histoire de
                            Noël.
                        </ThemedText>
                    </View>

                    <View style={styles.section}>
                        <ThemedText type="subtitle" style={styles.sectionTitle}>
                            🍪 Une recommandation
                        </ThemedText>
                        <ThemedText style={styles.paragraph}>
                            Livre, série, activité, recette... : une idée pour
                            accompagner vos journées et soirées d'hiver.
                        </ThemedText>
                    </View>

                    <View style={styles.section}>
                        <ThemedText type="subtitle" style={styles.sectionTitle}>
                            🎮 Un mini-jeu
                        </ThemedText>
                        <ThemedText style={styles.paragraph}>
                            Un jeu pour mettre vos connaissances de Noël à
                            l’épreuve.
                        </ThemedText>
                    </View>

                    <View style={styles.section}>
                        <ThemedText type="subtitle" style={styles.sectionTitle}>
                            🎁 Mais ce n'est pas tout...
                        </ThemedText>
                        <ThemedText style={styles.paragraph}>
                            Ouvrir la case du jour, explorer les contenus, jouer
                            aux jeux... : plus vous participez, plus vous gagnez
                            des points. Et le 25 décembre, une surprise
                            exclusive attend celles et ceux qui auront accumulé
                            assez de points !
                        </ThemedText>
                    </View>

                    <View style={styles.section}>
                        <ThemedText style={[styles.paragraph, styles.ital]}>
                            J'ai mis tout mon amour de Noël dans ce calendrier
                            et j'espère qu'il saura vous transporter dans cette
                            magie des fêtes que j'aime tant.
                        </ThemedText>
                    </View>

                    <CustomButton onPress={handleStart}>
                        Commencer l'aventure 🚀
                    </CustomButton>
                </ScrollView>
                {/* <ScrollToTopButton ref={scrollViewRef}></ScrollToTopButton> */}
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    background: {
        ...StyleSheet.absoluteFillObject, // Remplit tout l'espace du parent
        backgroundColor: "white",
        opacity: 0.9,
    },
    safeArea: {
        flex: 1,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingBottom: 80,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    title: {
        paddingHorizontal: 20,
        width: "100%",
        marginVertical: 20,
        textAlign: "left",
        color: "#165d4b",
    },
    paragraph: {
        textAlign: "left",
    },
    section: {
        marginVertical: 10,
    },
    sectionTitle: {
        marginBottom: 5,
        color: "#165d4b",
        textAlign: "left",
        fontSize: 18,
    },
    ital: {
        fontFamily: "PoppinsItalic",
    },
});
