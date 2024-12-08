import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Wallpapers } from "@/components/days/Day25/Wallpapers";
import { Poem } from "@/components/days/Day25/Poem";
import { RateButton } from "@/components/utils/buttons/RateButton";
import { ExternalLink } from "@/components/utils/ExternalLink";
import ParallaxScrollView from "@/components/utils/ParallaxScrollView";
import { Colors } from "@/constants/Colors";
import { AdvancedImage } from "cloudinary-react-native";
import cld from "@/config/cloudinaryConfig";

export default function Day25Screen() {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{
                light: Colors.snow,
                dark: Colors.darkGreen,
            }}
            headerImage={
                <AdvancedImage
                    cldImg={cld.image("sapin-rouge_idzwwr")}
                    style={styles.headerImage}
                    resizeMode="cover"
                />
            }
        >
            <ThemedText type="modalTitle" style={styles.title}>
                Merci d'être resté·e jusqu'au bout 🎅
            </ThemedText>

            <View>
                <View style={styles.section}>
                    <ThemedText style={styles.text}>
                        J'espère de tout cœur que cette application aura réussi
                        à ajouter une touche de magie à votre mois de décembre
                        et à vous plonger dans l'ambiance de Noël ☃️
                    </ThemedText>
                    <ThemedText style={styles.text}>
                        Si vous avez apprécié mon application, rendez-vous
                        l'année prochaine pour de nouvelles surprises et encore
                        plus de magie ✨
                    </ThemedText>

                    <ThemedText style={styles.text}>
                        Mais avant ça, cela me toucherait énormément si vous
                        preniez le temps de laisser un avis sur le Play Store :
                    </ThemedText>
                    <RateButton style={styles.button}>J'y vais !</RateButton>

                    <ThemedText style={styles.text}>
                        Et maintenant, place aux cadeaux ! 🎁
                    </ThemedText>
                </View>

                <View style={styles.section}>
                    <ThemedText type="sectionSubtitle">
                        🎨 Une carte de vœux
                    </ThemedText>
                    <ThemedText type="sectionText">
                        Une aquarelle réalisée par une amie pour souhaiter une
                        bonne année à vos proches.
                    </ThemedText>
                    <View style={styles.imageContainer}>
                        <ExternalLink
                            href={
                                "https://res.cloudinary.com/deauthz29/image/upload/v1732811466/carte-decoupe_b35vjd.jpg"
                            }
                            style={{ marginRight: 10, marginBottom: 15 }}
                        >
                            <View style={styles.thumbnail}>
                                <AdvancedImage
                                    cldImg={cld.image("carte-zoom_jyxjm3")}
                                    resizeMode="cover"
                                    style={styles.thumbnail}
                                />
                            </View>
                        </ExternalLink>

                        <ThemedText
                            type="sectionText"
                            style={styles.explanations}
                        >
                            Cliquez sur l'image pour la télécharger puis
                            l'imprimer au format A4 !
                        </ThemedText>
                    </View>
                </View>

                <View style={styles.section}>
                    <ThemedText type="sectionSubtitle">✒️ Un poème</ThemedText>
                    <ThemedText type="sectionText">
                        Un joli texte écrit par mon copain, à retranscrire sur
                        une carte de vœux pour souhaiter la bonne année ?
                    </ThemedText>
                    <Poem />
                </View>

                <View style={styles.section}>
                    <ThemedText type="sectionSubtitle">
                        🖼️ Six fonds d'écran
                    </ThemedText>
                    <ThemedText type="sectionText">
                        Ces dessins ont été créés par une amie pour pouvoir
                        profiter encore un peu de l'ambiance de Noël.
                    </ThemedText>
                    <ThemedText type="sectionText" style={styles.explanations}>
                        Cliquez sur une image pour l'afficher en grand puis
                        faites une capture d'écran et redimensionnez si
                        nécessaire !
                    </ThemedText>
                    <Wallpapers />
                </View>

                <View style={styles.section}>
                    <ThemedText type="sectionSubtitle">
                        📺 Le bingo des téléfilms de Noël
                    </ThemedText>
                    <ThemedText type="sectionText">
                        Vous avez aimé joué au bingo des téléfilms de Noël ?
                        Voici une version à imprimer !
                    </ThemedText>
                    <View style={styles.imageContainer}>
                        <ExternalLink
                            href={
                                "https://res.cloudinary.com/deauthz29/image/upload/v1732540131/bingo_blanc_rvflsz.png"
                            }
                            style={styles.image}
                        >
                            <View style={styles.thumbnail}>
                                <AdvancedImage
                                    cldImg={cld.image("bingo_blanc_rvflsz")}
                                    resizeMode="cover"
                                    style={styles.thumbnail}
                                />
                            </View>
                        </ExternalLink>
                        <ThemedText
                            type="sectionText"
                            style={styles.explanations}
                        >
                            Cliquez sur l'image pour la télécharger puis
                            l'imprimer au format A5 !
                        </ThemedText>
                    </View>
                </View>
            </View>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        height: "100%",
        width: "100%",
    },
    title: {
        fontSize: 26,
        color: Colors.blue,
        letterSpacing: 2,
    },
    text: {
        color: Colors.darkBlue,
        paddingVertical: 5,
        textAlign: "left",
    },
    section: {
        marginBottom: 20,
    },
    button: { marginTop: 10, marginBottom: 20, alignSelf: "center" },
    imageContainer: { flexDirection: "row", marginVertical: 10 },
    image: { marginRight: 10 },
    thumbnail: {
        width: 150,
        height: 210,
        borderRadius: 5,
        marginBottom: 15,
    },
    explanations: {
        fontSize: 14,
        marginTop: 5,
        fontFamily: "PoppinsItalic",
        flex: 1,
    },
});
