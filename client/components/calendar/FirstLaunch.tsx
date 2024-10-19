import { useCallback, useRef } from "react";
import { StyleSheet, View, ScrollView, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect } from "expo-router";
import { CustomButton } from "@/components/custom-utils/Buttons/Button";
import { ThemedText } from "@/components/ThemedText";

interface FirstLaunchProps {
    firstLaunch: boolean;
    setFirstLaunch: (firstLaunch: boolean) => void;
}

export const FirstLaunch: React.FC<FirstLaunchProps> = ({
    firstLaunch,
    setFirstLaunch,
}) => {
    const handleStart = () => {
        router.push("/calendar");
    };

    const scrollViewRef = useRef<ScrollView>(null);

    useFocusEffect(
        useCallback(() => {
            return () => {
                if (firstLaunch) {
                    setFirstLaunch(false);
                }
            };
        }, [])
    );

    return (
        <ImageBackground
            source={require("@/assets/images/1.png")}
            resizeMode="cover"
            style={styles.imageBackground}
        >
            <SafeAreaView style={styles.safeArea}>
                <ThemedText type="modalTitle" style={styles.title}>
                    {firstLaunch
                        ? "Bienvenue dans votre calendrier de\u00A0l'avent"
                        : "Présentation du\u00A0calendrier"}
                </ThemedText>

                <ScrollView
                    ref={scrollViewRef}
                    style={styles.container}
                    persistentScrollbar={true} // Android only
                >
                    <View style={styles.section}>
                        <ThemedText type="sectionText" style={styles.ital}>
                            Chaque jour, plongez dans la magie de Noël et
                            découvrez :
                        </ThemedText>
                    </View>

                    <View style={styles.section}>
                        <ThemedText type="sectionSubtitle">
                            ✨ Combien de nuits avant Noël ?
                        </ThemedText>
                        <ThemedText type="sectionText">
                            Un compte à rebours pour vous faire patienter
                            jusqu'au 25 décembre.
                        </ThemedText>
                    </View>

                    <View style={styles.section}>
                        <ThemedText type="sectionSubtitle">
                            🎄 Une citation festive
                        </ThemedText>
                        <ThemedText type="sectionText">
                            Une citation inspirante vous plonger dans l'esprit
                            de Noël.
                        </ThemedText>
                    </View>

                    <View style={styles.section}>
                        <ThemedText type="sectionSubtitle">
                            🎅 Une anecdote de Noël
                        </ThemedText>
                        <ThemedText type="sectionText">
                            Une anecdote sur les traditions et l’histoire de
                            Noël.
                        </ThemedText>
                    </View>

                    <View style={styles.section}>
                        <ThemedText type="sectionSubtitle">
                            🍪 Une recommandation
                        </ThemedText>
                        <ThemedText type="sectionText">
                            Livre, série, activité, recette... : une idée pour
                            accompagner vos journées et soirées d'hiver.
                        </ThemedText>
                    </View>

                    <View style={styles.section}>
                        <ThemedText type="sectionSubtitle">
                            🎮 Un mini-jeu
                        </ThemedText>
                        <ThemedText type="sectionText">
                            Un jeu pour mettre vos connaissances de Noël à
                            l’épreuve.
                        </ThemedText>
                    </View>

                    <View style={styles.section}>
                        <ThemedText type="sectionSubtitle">
                            🎁 Mais ce n'est pas tout...
                        </ThemedText>
                        <ThemedText type="sectionText">
                            Ouvrir la case du jour, explorer les contenus, jouer
                            aux jeux... : plus vous participez, plus vous gagnez
                            des points. Et le 25 décembre, une surprise
                            exclusive attend celles et ceux qui auront accumulé
                            assez de points !
                        </ThemedText>
                    </View>

                    <View style={styles.section}>
                        <ThemedText type="sectionText" style={styles.ital}>
                            J'ai mis tout mon amour de Noël dans ce calendrier
                            et j'espère qu'il saura vous transporter dans cette
                            magie des fêtes que j'aime tant.
                        </ThemedText>
                    </View>

                    {firstLaunch && (
                        <CustomButton onPress={handleStart}>
                            Commencer l'aventure 🚀
                        </CustomButton>
                    )}
                </ScrollView>
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
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    title: {
        paddingTop: 30,
        paddingHorizontal: 20,
    },
    section: {
        marginVertical: 10,
    },
    ital: {
        fontFamily: "PoppinsItalic",
    },
});
