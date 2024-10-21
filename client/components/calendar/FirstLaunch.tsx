import { useRef } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";

export const FirstLaunch = () => {
    const scrollViewRef = useRef<ScrollView>(null);

    return (
        <ScrollView
            ref={scrollViewRef}
            style={styles.container}
            persistentScrollbar={true} // Android only
        >
            <View style={styles.section}>
                <ThemedText type="sectionText" style={styles.ital}>
                    Chaque jour, plongez dans la magie de Noël et découvrez :
                </ThemedText>
            </View>

            <View style={styles.section}>
                <ThemedText type="sectionSubtitle">
                    ✨ Combien de nuits avant Noël ?
                </ThemedText>
                <ThemedText type="sectionText">
                    Un compte à rebours pour patienter jusqu'au 25 décembre.
                </ThemedText>
            </View>

            <View style={styles.section}>
                <ThemedText type="sectionSubtitle">🎄 Une citation</ThemedText>
                <ThemedText type="sectionText">
                    Une citation inspirante pour plonger dans l'esprit de Noël.
                </ThemedText>
            </View>

            <View style={styles.section}>
                <ThemedText type="sectionSubtitle">🎅 Une anecdote</ThemedText>
                <ThemedText type="sectionText">
                    Une anecdote pour découvrir l'origine des traditions et
                    l’histoire de Noël.
                </ThemedText>
            </View>

            <View style={styles.section}>
                <ThemedText type="sectionSubtitle">
                    🍪 Une recommandation
                </ThemedText>
                <ThemedText type="sectionText">
                    Livre, série, activité, recette... : une idée pour
                    accompagner les journées et soirées d'hiver.
                </ThemedText>
            </View>

            <View style={styles.section}>
                <ThemedText type="sectionSubtitle">🎮 Un mini-jeu</ThemedText>
                <ThemedText type="sectionText">
                    Un jeu pour mettre vos connaissances de Noël à l’épreuve.
                </ThemedText>
            </View>

            <View style={styles.section}>
                <ThemedText type="sectionSubtitle">
                    🎁 Mais ce n'est pas tout...
                </ThemedText>
                <ThemedText type="sectionText">
                    Ouvrir la case du jour, explorer les contenus, jouer aux
                    jeux... : plus vous participez, plus vous gagnez des points.
                    Et le 25 décembre, une surprise attend celles et ceux qui
                    auront accumulé assez de points !
                </ThemedText>
            </View>

            <View style={styles.section}>
                <ThemedText type="sectionText" style={styles.ital}>
                    J'ai mis tout mon amour de Noël dans ce calendrier et
                    j'espère qu'il saura vous transporter dans cette magie des
                    fêtes que j'aime tant.
                </ThemedText>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
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
